
import { PrismaClient } from "@prisma/client";

// Global variable for the Prisma Client to prevent creating a new instance on every request
const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // optional logging for queries
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
