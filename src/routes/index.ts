import { Router } from "express";
import authRoutes from "./auth.ts";
import productRoutes from "./products.ts";
import usersRoutes from "./users.ts";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productRoutes);
rootRouter.use("/users", usersRoutes);

export default rootRouter;
