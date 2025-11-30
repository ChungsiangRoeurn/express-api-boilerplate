import { Router } from "express";
import authMiddleware from "../middleware/auth.ts";
import { ErrorHandle } from "../error-handler.ts";
import {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
  updateItemQuantity,
} from "../controllers/cart.ts";

const ordersRoute: Router = Router();

ordersRoute.post("/", [authMiddleware], ErrorHandle(addItemToCart));
ordersRoute.get("/", [authMiddleware], ErrorHandle(getCartItems));
ordersRoute.put("/:id/cancel", [authMiddleware], ErrorHandle(removeItemFromCart));
ordersRoute.get("/:id", [authMiddleware], ErrorHandle(updateItemQuantity));

export default ordersRoute;
