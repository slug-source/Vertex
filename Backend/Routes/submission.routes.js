import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js"
import {getSubmissions} from "../Controllers/submission.controller.js"

const router = Router();

router.get('/', auth(['user']), getSubmissions);

export default router;