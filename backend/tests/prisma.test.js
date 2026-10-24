import test from 'node:test';
import assert from 'node:assert/strict';
import prisma, { checkDatabaseReadiness, disconnectDatabase } from '../src/lib/prisma.js';

test('prisma client module exports singleton and helpers', () => {
  assert.ok(prisma, 'PrismaClient singleton should be defined');
  assert.equal(typeof checkDatabaseReadiness, 'function');
  assert.equal(typeof disconnectDatabase, 'function');
});

test('checkDatabaseReadiness executes without throwing uncaught exceptions', async () => {
  const result = await checkDatabaseReadiness();
  assert.equal(typeof result.ok, 'boolean');
  if (result.ok) {
    assert.equal(result.ok, true);
  } else {
    assert.ok(typeof result.error === 'string');
  }
});
