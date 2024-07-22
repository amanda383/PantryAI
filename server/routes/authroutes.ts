import express from "express";
import { signUp } from "../controllers/user.controller";
import { signIn } from "../controllers/user.controller";

const router = express.Router();

router.post("/signup", signUp);
// Define other routes like signin, verify, forgot-password, reset-password, etc.
router.post("/signin", signIn);

export default router;
