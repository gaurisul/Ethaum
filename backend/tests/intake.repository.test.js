import test, { beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import intakeRepository, { createMockPrismaClient } from '../src/repositories/intake.repository.js';

let mockClient;

beforeEach(() => {
  mockClient = createMockPrismaClient();
  intakeRepository.setClient(mockClient);
});

after(() => {
  intakeRepository.resetClient();
});

test('intakeRepository.create generates unique id and formats record', async () => {
  const item = await intakeRepository.create({
    procedure: 'Dental Implants',
    country: 'Canada',
    timeline: 'Within 3 months',
  });

  assert.ok(item.id.startsWith('intake_'));
  assert.equal(item.procedure, 'Dental Implants');
  assert.equal(item.country, 'Canada');
  assert.equal(item.timeline, 'Within 3 months');
  assert.ok(typeof item.createdAt === 'string');
});

test('intakeRepository.findById returns record or null', async () => {
  const created = await intakeRepository.create({
    procedure: 'Knee Arthroscopy',
    country: 'Australia',
    timeline: 'Immediate',
  });

  const found = await intakeRepository.findById(created.id);
  assert.ok(found);
  assert.equal(found.id, created.id);
  assert.equal(found.procedure, 'Knee Arthroscopy');

  const nonExistent = await intakeRepository.findById('non_existent_id');
  assert.equal(nonExistent, null);
});

test('intakeRepository.list returns records and clear empties the store', async () => {
  await intakeRepository.create({
    procedure: 'Procedure 1',
    country: 'Country 1',
    timeline: 'Timeline 1',
  });
  await intakeRepository.create({
    procedure: 'Procedure 2',
    country: 'Country 2',
    timeline: 'Timeline 2',
  });

  const listBefore = await intakeRepository.list();
  assert.equal(listBefore.length, 2);

  await intakeRepository.clear();
  const listAfter = await intakeRepository.list();
  assert.equal(listAfter.length, 0);
});

test('intakeRepository invokes client interface with expected parameters', async () => {
  let capturedData = null;
  const customSpyClient = {
    intakePreview: {
      create: async ({ data }) => {
        capturedData = data;
        return {
          id: data.id,
          procedure: data.procedure,
          country: data.country,
          timeline: data.timeline,
          createdAt: new Date('2026-01-01T00:00:00.000Z'),
        };
      },
    },
  };

  intakeRepository.setClient(customSpyClient);
  const result = await intakeRepository.create({
    procedure: 'Custom Cardiac Review',
    country: 'Germany',
    timeline: 'Within 1 month',
  });

  assert.ok(capturedData);
  assert.equal(capturedData.procedure, 'Custom Cardiac Review');
  assert.equal(capturedData.country, 'Germany');
  assert.equal(result.createdAt, '2026-01-01T00:00:00.000Z');
});
