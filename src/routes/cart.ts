import { Router } from "express";
import authMiddleware from "../middleware/auth.ts";
import { ErrorHandle } from "../error-handler.ts";
import {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
  updateItemQuantity,
} from "../controllers/cart.ts";

const cartRoutes: Router = Router();

cartRoutes.post("/", [authMiddleware], ErrorHandle(addItemToCart));
cartRoutes.get("/", [authMiddleware], ErrorHandle(getCartItems));
cartRoutes.delete("/:id", [authMiddleware], ErrorHandle(removeItemFromCart));
cartRoutes.put("/:id", [authMiddleware], ErrorHandle(updateItemQuantity));

export default cartRoutes;
