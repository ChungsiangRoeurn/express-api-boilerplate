import express from "express";
import type { Express, Response, Request } from "express";
import { PORT } from "./secrets.ts";
import rootRouter from "./routes/index.ts";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middleware/errors.ts";
import path from "path";

const app: Express = express();

app.use(express.json());

// Serve static files
app.use(express.static(path.join(process.cwd(), "public")));

// This will automatically serve public/index.html for "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(errorMiddleware);

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
