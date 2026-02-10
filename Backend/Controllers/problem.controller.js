import * as service from '../Services/problem.service.js';

//user
export async function runProblem(req, res, next){

    try {
        const token = await service.runProblem(req.body.code, req.body.input);
        return res.status(200).json({
            success: true,
            token
        });
    }
    catch (error) {
        next(error);
    }
}

//user and creator
export async function getProblemById(req, res, next){

    try {
        const { id } = req.params;
        const result = await service.getProblemById(id, req.user);
        return res.status(200).json({
            success: true,
            result
        });
    }
    catch (error) {
        console.log(error)
        next(error);
    }
}
export async function getProblems(req, res, next){

    try {
        const result = await service.getProblems(req.user);
        return res.status(200).json({
            success: true,
            result
        });
    }
    catch (error) {
        console.log(error)
        next(error);
    }
}

//creator

export async function createProblem(req, res, next){

    try {
        let problem = {title,problemstatement,constraints,author,visiblecases,hiddencases}
        const result = await service.createProblem(problem);
        return res.status(200).json({
            success: true,
            result
        });
    }
    catch (error) {
        next(error);
    }
}
export async function deleteProblem(req, res, next){

   try {
        const result = await service.getProblemById(req.body.problemid, req.user);
        return res.status(200).json({
            success: true,
            result
        });
    }
    catch (error) {
        next(error);
    }
}

