import Problem from "../Models/problem.model.js";
import { jsExecute, pyExecute, cppExecute, extractErrorLine, normalize } from "../utils/Compiler.js";
import { generateFile, generateInputFile, deleteFile } from "../utils/GenerateFile.js";
import { verdict } from "../utils/Verdict.js";

const projectionByRole = {
    user: "-hiddencases -author",
    creator: ""
};

const lang = {
    python: {
        extension: "py",
        execute: pyExecute,
    },
    javascript: {
        extension: "js",
        execute: jsExecute,
    },
    cpp: {
        extension: "cpp",
        execute: cppExecute,
    },
};


export async function getProblemById(problemid, user) {

    const problem = await Problem.findById(problemid).select(projectionByRole[user.role])
    if (!problem) {
        throw new Error("Problem doesn't exist");
    }
    if ((user.role === "creator") && !(problem.author.toString() === user.id)) {
        throw new Error("This problem isn't owned by you.");
    }

    return problem;
}

export async function getProblems(user) {
    if (user.role === "creator") {
        const result = await Problem.find({ author: user.id }).select("title")
        if (result.length === 0) {
            throw new Error("Nothing to show here");
        }
        return result;
    }
    else {
        const result = await Problem.find({}).select("title")
        console.log(result)
        if (result.length === 0) {
            throw new Error("No problems are added yet.");
        }
        return result;
    }
}

export async function deleteProblem(problemid, user) {

    const result = await Problem.findOneAndDelete({ _id: problemid, author: user.id });

    if (!result) {
        throw new Error("Problem doesn't exist");
    }

    return "Problem deleted successfully";
}

export async function createProblem(title,problemstatement,constraints,author,visiblecases,hiddencases) {

    const result = await Problem.create({title,problemstatement,constraints,author,visiblecases,hiddencases});

    if (!result) {
        throw new Error("DB Error");
    }

    return "Problem added successfully"; 
}

export async function runProblem(code, input, language) {

    if (!code) {
        const error = new Error("Code unavailable");
        error.statusCode = 404;
        throw error;
    }

    const config = lang[language];

    if (!config) {
        const error = new Error("Unsupported language");
        error.statusCode = 400;
        throw error;
    }
    const filePath = await generateFile(code, config.extension);
    const inputFilePath = await generateInputFile(input, filePath);

    try {
        const res = normalize(await config.execute(filePath, inputFilePath));
        return res;
    }
    catch (err) {
        const raw = err.stderr || err.message || err.toString();
        const clean = extractErrorLine(raw);
        return clean;
    }
    finally {
        deleteFile(filePath);
        deleteFile(inputFilePath);
    }
}

export async function submitProblem(code, id, language) {

    if (!code) {
        const error = new Error("Code unavailable");
        error.statusCode = 404;
        throw error;
    }

    const config = lang[language];

    if (!config) {
        const error = new Error("Unsupported language");
        error.statusCode = 400;
        throw error;
    }

    const filePath = await generateFile(code, config.extension);
    const problem = await Problem.findById(id)
    let inputFilePath;
    const allTestCases = [...problem.visiblecases, ...problem.hiddencases];
    const allcases = allTestCases.length;
    let passedcases = 0;
    for (const tc of allTestCases) {
        inputFilePath = await generateInputFile(tc.input, filePath);
        try {
            const res = await config.execute(filePath, inputFilePath);
            if (await verdict(res, tc.output) === false) {
                deleteFile(inputFilePath);
                deleteFile(filePath);
                return {
                    "verdict": "Wrong Answer",
                    "passed": passedcases,
                    "total": allcases
                };
            }
            passedcases += 1;
        }
        catch (err) {
            const raw = err.stderr || err.message || err.toString();
            const clean = extractErrorLine(raw);
            deleteFile(inputFilePath);
            deleteFile(filePath);
            return {
                "verdict": "Failed",
                "passed": passedcases,
                "error": clean
            };
        }
    }
    deleteFile(inputFilePath);
    deleteFile(filePath);

    return {
        "verdict": "Accepted",
        "passed": passedcases,
        "total": allcases
    };
}
