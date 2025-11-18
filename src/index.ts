import express from "express";
import type { Express, Response, Request } from "express";
import { PORT } from "./secrets.ts";
import rootRouter from "./routes/index.ts";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middleware/errors.ts";
import { SignUpSchema } from "./schema/users.ts";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(errorMiddleware);

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
