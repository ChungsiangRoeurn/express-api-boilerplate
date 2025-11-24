import { Router } from "express";
import { ErrorHandle } from "../error-handler.ts";
import authMiddleware from "../middleware/auth.ts";
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/users.ts";

const usersRoutes: Router = Router();

usersRoutes.post("/address", [authMiddleware], ErrorHandle(addAddress))
usersRoutes.delete("/address/:id", [authMiddleware], ErrorHandle(deleteAddress))
usersRoutes.get("/address", [authMiddleware], ErrorHandle(listAddress))
usersRoutes.put("/", [authMiddleware], ErrorHandle(updateUser))

export default usersRoutes;