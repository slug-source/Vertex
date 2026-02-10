import { Router } from "express";
import { login, signup } from "../Controllers/user.controller.js"
import { validateLogin, validateSignup } from "../middlewares/validation.middleware.js";
import { auth } from "../middlewares/auth.middleware.js"

const router = Router();

router.post('/login', validateLogin, login);
router.post('/signup', validateSignup, signup);

export default router;
