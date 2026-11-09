/**
 * Prisma Client Singleton (Prisma v7 — Driver Adapter Pattern)
 *
 * Prisma v7 requires a driver adapter instead of the built-in engine.
 * We use @prisma/adapter-pg with the `pg` package for PostgreSQL.
 *
 * In Next.js development mode, hot module replacement can cause
 * the PrismaClient to be instantiated multiple times. This singleton
 * pattern prevents exhausting the database connection pool.
 */

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Build the adapter once using the DATABASE_URL from environment variables
function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set.");
  }

  const adapter = new PrismaPg({ connectionString });

  return new PrismaClient({ adapter });
}

// Extend the global object to hold the Prisma instance across hot reloads
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Persist the client in development to avoid multiple instances on hot reload
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
