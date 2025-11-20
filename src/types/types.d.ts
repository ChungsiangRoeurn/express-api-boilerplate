import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User; // optional because user may not exist if auth fails
    }
  }
}
