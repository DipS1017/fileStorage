
import { PrismaClient } from "@prisma/client";

// Global variable for the Prisma Client to prevent creating a new instance on every request
const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // optional logging for queries
  });
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to MongoDB')
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error)
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
