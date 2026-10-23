import test, { beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';
import intakeRepository, { createMockPrismaClient } from '../src/repositories/intake.repository.js';
import intakeService from '../src/services/intake.service.js';

let mockClient;

beforeEach(() => {
  mockClient = createMockPrismaClient();
  intakeRepository.setClient(mockClient);
});

after(() => {
  intakeRepository.resetClient();
});

test('intakeService validates required fields', async () => {
  await assert.rejects(
    async () => {
      await intakeService.createIntakePreview({
        procedure: '',
        country: '',
        timeline: '',
      });
    },
    (err) => {
      assert.equal(err.status, 400);
      assert.equal(err.code, 'VALIDATION_ERROR');
      assert.ok(err.details.procedure);
      assert.ok(err.details.country);
      assert.ok(err.details.timeline);
      return true;
    }
  );
});

test('intakeService rejects oversized values', async () => {
  await assert.rejects(
    async () => {
      await intakeService.createIntakePreview({
        procedure: 'A'.repeat(150),
        country: 'United States',
        timeline: 'Within 1 month',
      });
    },
    (err) => {
      assert.equal(err.status, 400);
      assert.ok(err.details.procedure.includes('too long'));
      return true;
    }
  );
});

test('intakeService trims and sanitizes strings and stores in repository', async () => {
  await intakeRepository.clear();
  const result = await intakeService.createIntakePreview({
    procedure: '  <script>alert(1)</script>Total Hip Replacement   ',
    country: '  United Kingdom  ',
    timeline: '  Within 1-2 months  ',
  });

  assert.ok(result.id.startsWith('intake_'));
  assert.equal(result.procedure, 'scriptalert(1)/scriptTotal Hip Replacement');
  assert.equal(result.country, 'United Kingdom');
  assert.equal(result.timeline, 'Within 1-2 months');

  const stored = await intakeRepository.findById(result.id);
  assert.equal(stored.id, result.id);
  assert.equal(stored.procedure, result.procedure);
});

test('POST /api/intake-preview returns 201 with created id', async () => {
  const server = app.listen(0);
  const address = server.address();
  const port = address.port;
  const url = `http://localhost:${port}/api/intake-preview`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'http://localhost:5174',
      },
      body: JSON.stringify({
        procedure: 'Cardiac Valve Repair',
        country: 'United States',
        timeline: 'Within 1-2 months',
      }),
    });

    assert.equal(res.status, 201);
    const body = await res.json();
    assert.equal(body.ok, true);
    assert.ok(body.id.startsWith('intake_'));
    assert.equal(body.preview.procedure, 'Cardiac Valve Repair');
  } finally {
    server.close();
  }
});

test('POST /api/intake-preview returns 400 with actionable error messages when invalid', async () => {
  const server = app.listen(0);
  const address = server.address();
  const port = address.port;
  const url = `http://localhost:${port}/api/intake-preview`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'http://localhost:5174',
      },
      body: JSON.stringify({
        procedure: '',
        country: '',
        timeline: '',
      }),
    });

    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.error, 'VALIDATION_ERROR');
    assert.ok(body.details.procedure);
    assert.ok(body.details.country);
    assert.ok(body.details.timeline);
  } finally {
    server.close();
  }
});
