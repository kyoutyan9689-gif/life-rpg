const assert = require('node:assert/strict');
const {fresh, expForLevel, levelInfo, titleFor, record, unlocked} = require('./app.js');

assert.equal(expForLevel(1), 100);
assert.equal(expForLevel(2), 125);
assert.deepEqual(levelInfo(99), {level:1,current:99,needed:100});
assert.deepEqual(levelInfo(100), {level:2,current:0,needed:125});
assert.equal(levelInfo(375).level, 4);
assert.equal(titleFor(10), '習慣の使い手');

let data = fresh();
const gym = data.actions.find(x => x.id === 'gym');
let result = record(data, gym, '2026-08-28T10:00:00Z');
assert.equal(result.data.exp, 20);
assert.equal(result.data.stats.health, 1);
assert.equal(result.data.logs.length, 1);
assert.ok(result.data.achievements.includes('first'));
assert.deepEqual(result.newAchievements, ['first']);

data = fresh();
for (let i=0; i<10; i++) data = record(data, gym, `2026-08-${String(i+1).padStart(2,'0')}T10:00:00Z`).data;
assert.ok(unlocked(data).includes('gym10'));
console.log('All Life Quest logic tests passed.');
