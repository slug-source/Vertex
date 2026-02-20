import Submission from "../Models/submission.model.js";
export async function createSubmission(code, language, result, pid, uid) {
    const res = await Submission.create({
        userId: uid,
        problemId: pid,
        verdict: result.verdict,
        testCasesPassed: result.passed,
        code,
        language
    });
    if (!res) {
        throw new Error("DB Error");
    }
}

export async function getSubmissions(user) {
        const result = await Submission.find({ userId: user.id }).select("problemId verdict testCasesPassed")
        if (result.length === 0) {
            throw new Error("No submissions yet.");
        }
        return result;
}