import * as service from '../Services/submission.service.js';

export async function createSubmission(req, res, next){
    try {
        const {code, language} = req.body;
        const {id} = req.params;
        const result = req.result;
        const uid = req.user.id
        await service.createSubmission(code, language, result.result,id,uid);
        return res.status(200).json(req.result);
    }
    catch (error) {
        next(error);
    }
}

export async function getSubmissions(req, res, next){
    try {
        const role = req.user.role;
        const result = await service.getSubmissions(req.user);
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