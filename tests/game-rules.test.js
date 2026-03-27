const test = require('node:test');
const assert = require('node:assert/strict');

const {
    getBrickRowRange,
    getBrickScore,
    loadRankingStore,
    resolveFrameOutcome,
    saveRankingStore,
} = require('../game-rules.js');

test('stage clear takes priority over simultaneous ball loss without consuming a life', () => {
    assert.deepEqual(
        resolveFrameOutcome({ allBricksCleared: true, ballsRemaining: 0, lives: 1 }),
        { state: 'STAGE_CLEAR', lives: 1, respawn: false, clearItems: true },
    );
});

test('game over still triggers when balls are gone and bricks remain', () => {
    assert.deepEqual(
        resolveFrameOutcome({ allBricksCleared: false, ballsRemaining: 0, lives: 1 }),
        { state: 'GAME_OVER', lives: 0, respawn: false, clearItems: false },
    );
});

test('stage clear transitions clear lingering items instead of freezing them onscreen', () => {
    assert.equal(
        resolveFrameOutcome({ allBricksCleared: true, ballsRemaining: 2, lives: 2 }).clearItems,
        true,
    );
});

test('brick score scales upward for endless-stage hp values', () => {
    assert.equal(getBrickScore(1), 10);
    assert.equal(getBrickScore(2), 25);
    assert.equal(getBrickScore(3), 50);
    assert.equal(getBrickScore(4), 80);
    assert.equal(getBrickScore(8), 250);
});

test('loadRankingStore reports invalid ranking data instead of failing silently', () => {
    const storage = {
        getItem() {
            return '{"broken":true}';
        },
    };

    assert.deepEqual(loadRankingStore(storage, 'ranking'), {
        ranking: [],
        error: 'invalid_data',
    });
});

test('saveRankingStore reports storage failures instead of swallowing them', () => {
    const storage = {
        setItem() {
            throw new Error('blocked');
        },
    };

    assert.deepEqual(saveRankingStore(storage, 'ranking', [{ score: 10 }]), {
        ok: false,
        error: 'unavailable',
    });
});

test('getBrickRowRange limits ball collision checks to overlapping brick rows', () => {
    assert.deepEqual(
        getBrickRowRange({
            y: 58 + 2 * 18 + 8,
            radius: 7,
            brickOffsetTop: 58,
            brickHeight: 16,
            brickPad: 2,
            rowCount: 39,
        }),
        { start: 2, end: 2 },
    );
});

test('getBrickRowRange expands to adjacent rows when the ball spans a row boundary', () => {
    assert.deepEqual(
        getBrickRowRange({
            y: 58 + 18 - 2,
            radius: 7,
            brickOffsetTop: 58,
            brickHeight: 16,
            brickPad: 2,
            rowCount: 39,
        }),
        { start: 0, end: 1 },
    );
});
