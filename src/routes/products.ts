import { Router } from "express";
import { ErrorHandle } from "../error-handler.ts";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../controllers/products.ts";
import authMiddleware from "../middleware/auth.ts";
import adminMiddleware from "../middleware/admin.ts";

const productRoutes: Router = Router();

// -----------------------------------------------------
// ADMIN ROUTES (Protect these!)
// -----------------------------------------------------

// 1. Create: Auth + Admin
productRoutes.post("/", [authMiddleware, adminMiddleware], ErrorHandle(createProduct));

// 2. Update: Auth + Admin
productRoutes.put("/:id", [authMiddleware, adminMiddleware], ErrorHandle(updateProduct));

// 3. Delete: Auth + Admin (Fixed: was [admin, admin])
productRoutes.delete("/:id", [authMiddleware, adminMiddleware],ErrorHandle(deleteProduct));

// -----------------------------------------------------
// PUBLIC ROUTES (Let customers see products)
// -----------------------------------------------------

// 4. List: No middleware (Public) OR authMiddleware (if you want user info)
productRoutes.get("/", ErrorHandle(listProducts));

// 5. Get One: Public
productRoutes.get("/:id", ErrorHandle(getProductById));

export default productRoutes;
