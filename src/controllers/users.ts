import type { Request, Response } from "express";
import { AddressSchema, UpdateUserSchema } from "../schema/users.ts";
import { prismaClient } from "../index.ts";
import { NotFoundException } from "../exceptions/not-found.ts";
import { ErrorCode } from "../exceptions/root.ts";
import type { Address } from "@prisma/client";
import { BadRequestsException } from "../exceptions/bad-requests.ts";

export const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);

  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user?.id,
    },
  });
  res.json(address);
};

export const deleteAddress = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const rawId = req.params.id;

  // Runtime validation
  if (!rawId) {
    return res.status(400).json({ error: "Missing address id" });
  }

  const id = Number(rawId);
  if (!Number.isInteger(id) || Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid address id" });
  }

  try {
    await prismaClient.address.delete({
      where: { id },
    });
    return res.status(204).end();
  } catch (error) {
    throw new NotFoundException(
      "Address not found!",
      ErrorCode.HEADER_NOT_FOUND
    );
  }
};

export const listAddress = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const rawId = req.params.id;

  // runtime validation
  if (!rawId) {
    return res.status(400).json({ error: "Missing user id" });
  }

  const userId = Number.parseInt(rawId, 10);
  if (!Number.isInteger(userId)) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  const addresses = await prismaClient.address.findMany({
    where: {
      userId, // now a number
    },
  });
  res.json(addresses);
};

export const updateUser = async (req: Request, res: Response) => {
  const validatorData = UpdateUserSchema.parse(req.body);

  let shippingAddress: Address;
  let billingAddress: Address;

  if (validatorData.defaultShippingAddress) {
    try {
      shippingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatorData.defaultShippingAddress,
        },
      });
      if (shippingAddress.userId != req.user.id) {
        throw new BadRequestsException(
          "Address does not belong to user",
          ErrorCode.ADDRESS_DOES_NOT_BELONG
        );
      }
    } catch (error) {
      throw new NotFoundException(
        "Address not found!",
        ErrorCode.HEADER_NOT_FOUND
      );
    }
  }

  if (validatorData.defaultBillingAddress) {
    try {
      billingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatorData.defaultBillingAddress,
        },
      });
      if (billingAddress.userId != req.user.id) {
        throw new BadRequestsException(
          "Address does not belong to user!",
          ErrorCode.ADDRESS_DOES_NOT_BELONG
        );
      }
    } catch (error) {
      throw new NotFoundException(
        "Address not found!",
        ErrorCode.HEADER_NOT_FOUND
      );
    }
  }

  const updateUser = await prismaClient.user.update({
    where: { id: req.user.id },
    data: validatorData,
  });

  res.json(updateUser);
};
