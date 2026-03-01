import * as service from '../Services/problem.service.js';
import {aiCodeReview} from '../utils/CodeReview.js';

//user
export async function runProblem(req, res, next){
    try {
        const {code, input, language} = req.body;
        const result = await service.runProblem(code, input, language);
        return res.status(200).json({
            success: true,
            result
        });
    }
    catch (error) {
        next(error);
    }
}

export async function submitProblem(req, res, next){
    try {
        const {code, language} = req.body;
        const { id } = req.params;
        const result = await service.submitProblem(code, id, language);
        req.result = {success: true, result};
        next();
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
        const role = req.user.role;
        const result = await service.getProblems(req.user);
        return res.status(200).json({
            success: true,
            result,
            role
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
        const {title,problemstatement,constraints,visiblecases,hiddencases} = req.body
        const result = await service.createProblem(title,problemstatement,constraints,req.user.id,visiblecases,hiddencases);
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
        const {id} = req.params;
        const result = await service.deleteProblem(id, req.user);
        console.log(result)
        return res.status(200).json({
            success: true,
            result
        });
    }
    catch (error) {
        next(error);
    }
}

export async function codeReview(req, res, next){
    try {
        const {code, input} = req.body;
        const result = await aiCodeReview(code, input);
        return res.status(200).json({
            success: true,
            result
        });
    }
    catch (error) {
        next(error);
    }
}
