import dotenv from "dotenv";
dotenv.config();

import { defineConfig, env } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrate: {
    url: process.env.DATABASE_URL!,
  },

  datasource: {
    url: env("DATABASE_URL"),
  },
} as any);
