import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js"
import { getProblems, getProblemById, createProblem, deleteProblem } from "../Controllers/problem.controller.js";

const router = Router();

//router.post('/:id/run', auth(['user']), runProblem);


router.post('/', auth(['creator']), createProblem);
router.delete('/:id', auth(['creator']), deleteProblem);

router.get('/', auth(['user', 'creator']), getProblems);
router.get('/:id', auth(['user', 'creator']), getProblemById);

export default router;