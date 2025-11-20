import { Router } from "express";
import { login, me, signup } from "../controllers/auth.ts";
import { ErrorHandle } from "../error-handler.ts";
import authMiddleware from "../middleware/auth.ts";

const authRoutes: Router = Router();

authRoutes.post("/signup", ErrorHandle(signup));
authRoutes.post("/login", ErrorHandle(login));
authRoutes.get("/me", [authMiddleware], ErrorHandle(me));

export default authRoutes;
