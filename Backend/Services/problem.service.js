import Problem from "../Models/problem.model.js";

const projectionByRole = {
    user: "-hiddencases -author",
    creator: ""
};

export async function getProblemById(problemid, user) {

    const problem = await Problem.findById(problemid).select(projectionByRole[user.role])
    console.log("dfhj")
    if (!problem) {
        throw new Error("Problem doesn't exist");
    }

    if (user.role === "creator" && !(problem.author === user.id)) {
        throw new Error("This problem is owned by you.");
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

export async function createProblem(problem) {

    const result = await Problem.create(problem);

    if (!result) {
        throw new Error("DB Error");
    }

    return "Problem added successfully"; //return id
}