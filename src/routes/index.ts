import { Router } from "express";
import authRoutes from "./auth.ts";
import productRoutes from "./products.ts";
import usersRoutes from "./users.ts";
import cartRoutes from "./cart.ts";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productRoutes);
rootRouter.use("/users", usersRoutes);
rootRouter.use("/carts", cartRoutes);

export default rootRouter;
