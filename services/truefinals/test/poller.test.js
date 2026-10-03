const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const { EventEmitter } = require('node:events');

function harness() {
  let now = 1000000;
  let status = () => 200;
  const requests = [];
  const snapshots = [];
  let api;
  const https = { get(options, callback) {
    requests.push({ time: now, path: options.path });
    snapshots.push(api.getStory(['a', 'b', 'c', 'd']));
    queueMicrotask(() => {
      const res = new EventEmitter();
      res.statusCode = status(options.path);
      res.headers = { 'retry-after': '30' };
      callback(res);
      const payload = options.path.endsWith('/games') ? [] : { title: 'Test', players: [] };
      res.emit('data', JSON.stringify(payload));
      res.emit('end');
    });
    const req = new EventEmitter();
    req.setTimeout = () => {};
    return req;
  } };
  const context = {
    require: () => https, process: { env: {} }, module: { exports: {} }, URL,
    Date: { now: () => now, parse: Date.parse }, console: { log() {}, error() {} },
    setTimeout: (fn, delay) => { now += delay; queueMicrotask(fn); },
  };
  vm.runInNewContext(fs.readFileSync('poller.js', 'utf8'), context);
  api = context.module.exports;
  return { api, requests, snapshots, advance: ms => { now += ms; },
    setStatus: fn => { status = fn; } };
}

test('four divisions share a queue, publish individually, and refresh on a ten-second cadence', async () => {
  const h = harness();
  const ids = ['a', 'b', 'c', 'd'];
  const [first, concurrent] = await Promise.all([h.api.poll(ids), h.api.poll(ids)]);
  assert.equal(first, concurrent);
  assert.equal(first.tournaments.length, 4);
  assert.equal(h.requests.length, 8);
  assert.ok(h.snapshots.some(s => s.tournaments.length > 0 && s.tournaments.length < 4));
  assert.equal(h.api.getStory(['unknown']).tournaments.length, 0);
  await h.api.poll(ids);
  assert.equal(h.requests.length, 12);
  await h.api.poll(ids);
  assert.equal(h.requests.length, 16);
  for (const id of ids) {
    const games = h.requests.filter(r => r.path.endsWith(`/${id}/games`));
    assert.equal(games[2].time - games[1].time, 10000);
  }
  h.advance(600001);
  await h.api.poll(ids);
  assert.equal(h.requests.length, 24); // periodic player refresh shares queue
  for (let i = 1; i < h.requests.length; i++) {
    assert.ok(h.requests[i].time - h.requests[i - 1].time >= 2500);
  }
});

test('a fast completed batch stays cached until ten seconds from its start', async () => {
  const h = harness();
  await h.api.poll(['a']); // startup takes 2.5 seconds
  h.advance(7499);
  await h.api.poll(['a']);
  assert.equal(h.requests.length, 2);
  h.advance(1);
  await h.api.poll(['a']);
  assert.equal(h.requests.length, 3);
});

test('a failed division retains its story while successful divisions publish fresh data', async () => {
  const h = harness();
  await h.api.poll(['a', 'b']);
  const old = h.api.getStory(['a', 'b']);
  h.advance(10000);
  h.setStatus(path => path.endsWith('/b/games') ? 503 : 200);
  await h.api.poll(['a', 'b']);
  const fresh = h.api.getStory(['a', 'b']);
  assert.ok(fresh.tournaments[0].updatedAt > old.tournaments[0].updatedAt);
  assert.equal(fresh.tournaments[1], old.tournaments[1]);
});

test('HTTP 429 Retry-After delays subsequent requests across all divisions', async () => {
  const h = harness();
  let rejected = false;
  h.setStatus(() => { if (!rejected) { rejected = true; return 429; } return 200; });
  await h.api.poll(['a', 'b']);
  assert.ok(h.requests[1].time - h.requests[0].time >= 30000);
  assert.equal(h.api.getStory(['b']).tournaments.length, 1);
});

test('browser inline scripts parse', () => {
  for (const file of ['overlay', 'matchbar', 'matchlog']) {
    const html = fs.readFileSync(`public/${file}.html`, 'utf8');
    for (const [, script] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
      new vm.Script(script, { filename: file });
    }
  }
});
