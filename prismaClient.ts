import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "./lib/generated/prisma";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const dbClient =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = dbClient;
