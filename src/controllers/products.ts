import type { Request, Response } from "express";
import { prismaClient } from "../index.ts";
import { NotFoundException } from "../exceptions/not-found.ts";
import { ErrorCode } from "../exceptions/root.ts";

interface ProductParams {
  id: string;
}
// Create Products
export const createProduct = async (req: Request, res: Response) => {
  const products = await prismaClient.products.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });
  res.json(products);
};

// Update Products
export const updateProduct = async (
  req: Request<ProductParams>,
  res: Response
) => {
  try {
    const product = req.body;
    if (product.tags) {
      product.tags = product.tags.join(",");
    }

    const updateProduct = await prismaClient.products.update({
      where: {
        id: +req.params.id,
      },
      data: product,
    });
    res.json(updateProduct);
  } catch (error) {
    throw new NotFoundException("Product not found.", ErrorCode.USER_NOT_FOUND);
  }
};

// List All Products
export const listProducts = async (req: Request, res: Response) => {
  const count = await prismaClient.products.count();

  const products = await prismaClient.products.findMany({
    skip: Number(req.query.skip || "0"),
    take: 5,
  });

  res.json({
    count,
    data: products,
  });
};
// GetProductsById Products
export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const rawId = req.params.id;
    // runtime validation for $id$
    if (!rawId) {
      return res.status(400).json({ error: "Missing product id" });
    }
    const id = Number(rawId);
    if (!Number.isFinite(id) || Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const product = await prismaClient.products.findFirstOrThrow({
      where: { id },
    });
    res.json(product);
  } catch (error) {
    throw new NotFoundException("Product not found.", ErrorCode.USER_NOT_FOUND);
  }
};

// Delete Products
export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const deleteProduct = await prismaClient.products.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json({
      message: "Product deleted succesfully!",
      product: deleteProduct,
    });
  } catch (error) {
    throw new NotFoundException("Product not found!", ErrorCode.USER_NOT_FOUND);
  }
};
