import crypto from 'node:crypto';
import prisma from '../lib/prisma.js';

let activeClient = prisma;

function formatRecord(record) {
  if (!record) return null;
  return {
    id: record.id,
    procedure: record.procedure,
    country: record.country,
    timeline: record.timeline,
    createdAt: record.createdAt instanceof Date ? record.createdAt.toISOString() : record.createdAt,
  };
}

export const intakeRepository = {
  /**
   * Set custom Prisma client (e.g. For testing or transactions).
   * @param {object} client
   */
  setClient(client) {
    activeClient = client;
  },

  /**
   * Reset client back to the singleton PrismaClient.
   */
  resetClient() {
    activeClient = prisma;
  },

  /**
   * Create a new intake inquiry record in PostgreSQL.
   */
  create: async ({ id, procedure, country, timeline }) => {
    const recordId = id || `intake_${crypto.randomUUID()}`;
    const record = await activeClient.intakePreview.create({
      data: {
        id: recordId,
        procedure,
        country,
        timeline,
      },
    });
    return formatRecord(record);
  },

  /**
   * Find intake record by ID.
   */
  findById: async (id) => {
    const record = await activeClient.intakePreview.findUnique({
      where: { id },
    });
    return formatRecord(record);
  },

  /**
   * List all intake records ordered by creation date descending.
   */
  list: async () => {
    const records = await activeClient.intakePreview.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return records.map(formatRecord);
  },

  /**
   * Delete all intake records (useful for test isolation).
   */
  clear: async () => {
    await activeClient.intakePreview.deleteMany({});
  },
};

/**
 * Creates an in-memory client conforming to the Prisma intakePreview interface.
 * Preserves unit testability without requiring a live PostgreSQL connection.
 */
export function createMockPrismaClient() {
  const store = new Map();
  return {
    intakePreview: {
      create: async ({ data }) => {
        const id = data.id || `intake_${crypto.randomUUID()}`;
        const record = {
          id,
          procedure: data.procedure,
          country: data.country,
          timeline: data.timeline,
          createdAt: new Date(),
        };
        store.set(id, record);
        return { ...record };
      },
      findUnique: async ({ where }) => {
        const found = store.get(where.id);
        return found ? { ...found } : null;
      },
      findMany: async () => {
        return Array.from(store.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },
      deleteMany: async () => {
        const count = store.size;
        store.clear();
        return { count };
      },
    },
  };
}

export default intakeRepository;
