import * as service from '../Services/user.service.js'

export async function login(req, res, next) {
    const { email, password } = req.validatedData;
    try {
        const token = await service.login(email, password);
        return res.status(200).json({
            success: true,
            token
        });
    }
    catch (error) {
        console.log(error)
        next(error);
    }
}

export async function signup(req, res, next) {
    const { name, email, password, role } = req.validatedData;
    try {
        const token = await service.signup(name, email, password, role);
        return res.status(200).json({
            success: true,
            token
        });
    }
    catch (error) {
        console.log(error)
        next(error);
    }
}