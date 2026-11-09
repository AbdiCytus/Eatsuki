/**
 * Prisma Client Singleton (Prisma v7 — Driver Adapter Pattern)
 *
 * Prisma v7 requires a driver adapter instead of the built-in engine.
 * We use @prisma/adapter-pg with the `pg` package for PostgreSQL.
 *
 * Uses a Proxy-based lazy initialization pattern so the client is only
 * instantiated on the first query (runtime), not at module import time
 * (build time). This prevents build failures when DATABASE_URL is absent
 * during the Next.js static analysis / build phase.
 */

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Extend the global object to hold the Prisma instance across hot reloads
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Returns the cached PrismaClient or creates a new one on first call.
 * Deferred to runtime so DATABASE_URL is available.
 */
function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const connectionString = process.env.DATABASE_URL ?? "";
  const adapter = new PrismaPg({ connectionString });
  const client = new PrismaClient({ adapter });

  // Cache in development to survive hot-module replacement
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

/**
 * Proxy that lazily initializes PrismaClient on first property access.
 * Safe to import at build time — no connection is established until
 * an actual query is made.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return (getPrismaClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export default prisma;
