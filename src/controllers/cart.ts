import type { Request, Response } from "express";
import { CreateCartSchema, UpdateQuantitySchema } from "../schema/cart.ts";
import { NotFoundException } from "../exceptions/not-found.ts";
import { ErrorCode } from "../exceptions/root.ts";
import { prismaClient } from "../index.ts";
import type { Products } from "@prisma/client";

export const addItemToCart = async (req: Request, res: Response) => {
  const validatedData = CreateCartSchema.parse(req.body);
  let product: Products;

  try {
    product = await prismaClient.products.findFirstOrThrow({
      where: {
        id: validatedData.productId,
      },
    });
  } catch (error) {
    throw new NotFoundException(
      "Products not found!",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }

  const cart = await prismaClient.cartItems.create({
    data: {
      userId: req.user.id,
      productId: product.id,
      quantity: validatedData.quantity,
    },
  });
  res.json(cart);
};

export const removeItemFromCart = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  // Check if user is deleting its own cart item

  await prismaClient.cartItems.delete({
    where: {
      id: +req.params.id,
    },
  });
  res.json({ success: true });
};

export const updateItemQuantity = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  // Check if user is updating its own cart item
  const validatedData = UpdateQuantitySchema.parse(req.body);

  const updatedCart = await prismaClient.cartItems.update({
    where: {
      id: +req.params.id,
    },
    data: {
      quantity: validatedData.quantity,
    },
  });
  res.json(updatedCart);
};

export const getCartItems = async (req: Request, res: Response) => {
  const cart = await prismaClient.cartItems.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      product: true,
    },
  });
  res.json(cart);
};
