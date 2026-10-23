import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';

test('starter test runner is configured', () => {
  assert.equal(1 + 1, 2);
});

test('GET /api/health returns 200 with service status', async () => {
  const server = app.listen(0);
  const port = server.address().port;
  const url = `http://localhost:${port}/api/health`;

  try {
    const res = await fetch(url);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.ok, true);
    assert.equal(body.service, 'ethaum-api');
    assert.equal(body.status, 'healthy');
    assert.ok(body.timestamp);
  } finally {
    server.close();
  }
});

test('GET /api/health/ready returns readiness status reflecting database state', async () => {
  const server = app.listen(0);
  const port = server.address().port;
  const url = `http://localhost:${port}/api/health/ready`;

  try {
    const res = await fetch(url);
    const body = await res.json();
    assert.equal(body.service, 'ethaum-api');
    assert.ok(body.timestamp);

    if (res.status === 200) {
      assert.equal(body.ok, true);
      assert.equal(body.status, 'ready');
      assert.equal(body.database, 'connected');
    } else {
      assert.equal(res.status, 503);
      assert.equal(body.ok, false);
      assert.equal(body.status, 'not_ready');
      assert.equal(body.database, 'disconnected');
    }
  } finally {
    server.close();
  }
});
