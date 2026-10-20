import crypto from 'node:crypto';

// In-memory storage behind repository interface to allow later Prisma/Postgres replacement
const intakeStore = new Map();

export const intakeRepository = {
  create: async ({ procedure, country, timeline }) => {
    const id = `intake_${crypto.randomUUID()}`;
    const record = {
      id,
      procedure,
      country,
      timeline,
      createdAt: new Date().toISOString(),
    };
    intakeStore.set(id, record);
    return record;
  },

  findById: async (id) => {
    return intakeStore.get(id) || null;
  },

  list: async () => {
    return Array.from(intakeStore.values());
  },

  clear: async () => {
    intakeStore.clear();
  },
};

export default intakeRepository;
