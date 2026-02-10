import AppError from "../utils/AppError.js";

export const validateLogin = (req, res, next) => {
    let { email, password } = req.body || {};

    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!email || !password || !emailRegex(email)) {
        return next(new AppError("Invalid Credentials", 400));
    }
    req.validatedData = { email, password };
    next();
}

export const validateSignup = (req, res, next) => {
    console.log(req.body)
    let { name, email, password, role } = req.body || {};

    name = name?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();
    role = role || "user";

    console.log(email,password,name, role)
    if (!email || !password || !name || !role || !emailRegex(email)) {
        return next(new AppError("Invalid Credentials", 400));
    }
    req.validatedData = { name, email, password, role };
    next();
}

const emailRegex = (str) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(str)
}