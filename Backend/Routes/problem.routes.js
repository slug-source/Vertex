import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js"
import { getProblems, getProblemById, createProblem, deleteProblem, runProblem,submitProblem, codeReview} from "../Controllers/problem.controller.js";
import { createSubmission } from "../Controllers/submission.controller.js";

const router = Router();

router.post('/run', auth(['user']), runProblem);
router.post('/:id/submit', auth(['user']), submitProblem, createSubmission);
router.post('/review', auth(['user']), codeReview);


router.post('/', auth(['creator']), createProblem);
router.delete('/:id', auth(['creator']), deleteProblem);

router.get('/', auth(['user', 'creator']), getProblems);
router.get('/:id', auth(['user', 'creator']), getProblemById);

export default router;