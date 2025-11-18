import type { NextFunction, Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { prismaClient } from "../index.ts";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.ts";
import { BadRequestsException } from "../exceptions/bad-requests.ts";
import { ErrorCode } from "../exceptions/root.ts";
import { UnprocessableEntity } from "../exceptions/validation.ts";
import { SignUpSchema } from "../schema/users.ts";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    SignUpSchema.parse(req.body);
    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
      // return res.status(400).json({ message: "User already created!" });
      next(
        new BadRequestsException(
          "User Already Exists!",
          ErrorCode.USER_ALREADY_EXISTS
        )
      );
    }

    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 18),
      },
    });
    res.json(user);
  } catch (error: any) {
    next(
      new UnprocessableEntity(
        error?.issues,
        "Unprocessable entity",
        ErrorCode.UNPROCESSABLE_ENTITY
      )
    );
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "User does not exist!" });
  }

  if (!compareSync(password, user.password)) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ user, token });
};
