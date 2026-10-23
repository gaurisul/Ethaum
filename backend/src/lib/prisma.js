import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Checks the database connectivity using a lightweight query.
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
export async function checkDatabaseReadiness() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

/**
 * Disconnects Prisma client cleanly during application shutdown.
 */
export async function disconnectDatabase() {
  await prisma.$disconnect();
}

export default prisma;
