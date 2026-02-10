import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

export const auth = (allowedRoles = []) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return next(new AppError("Authentication required", 401));
            }

            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
                return next(new AppError("Access denied", 403));
            }

            next();
        } catch (error) {
            return next(new AppError("Invalid or expired token", 401));
        }
    };
};
