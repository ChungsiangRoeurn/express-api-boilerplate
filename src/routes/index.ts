import { Router } from "express";
import authRoutes from "./auth.ts";
import productRoutes from "./products.ts";
import usersRoutes from "./users.ts";
import cartRoutes from "./cart.ts";
import ordersRoute from "./orders.ts";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productRoutes);
rootRouter.use("/users", usersRoutes);
rootRouter.use("/carts", cartRoutes);
rootRouter.use("/orders", ordersRoute);

export default rootRouter;
