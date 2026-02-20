import bcrypt from "bcrypt";
import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js"
const secret = process.env.JWT_SECRET;

export async function login(email, password) {

    const user = await User.findOne({ email })

    if (!user) {
        const error = new Error("User does not exist");
        error.statusCode = 404;
        throw error;

    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    },
        secret,
        { expiresIn: "7d" }
    );
    return {token, role: user.role};
}


export async function signup(name, email, password, role) {
    const user = await User.findOne({ email })
    if (user) {
        throw new AppError("User already exists",400);
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        email,
        name,
        password: hash,
        role
    });
    const token = jwt.sign({
        id: newUser._id.toString(),
        email: newUser.email,
        role: newUser.role
    },
        secret,
        { expiresIn: "5m" }
    );
    return {token, role: user.role};

}