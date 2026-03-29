(function initShatterLogic(root, factory) {
    const api = factory();
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }
    root.ShatterLogic = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createShatterLogic() {
    'use strict';

    const BRICK_SCORE_BY_HP = [0, 10, 25, 50, 80, 115, 155, 200, 250];

    function countLevelBricks(rows) {
        let count = 0;
        for (const row of rows) {
            for (const cell of row) {
                if (cell > 0) count++;
            }
        }
        return count;
    }

    function getBrickScore(maxHp) {
        return BRICK_SCORE_BY_HP[maxHp] ?? BRICK_SCORE_BY_HP[BRICK_SCORE_BY_HP.length - 1];
    }

    function getBrickRowRange({ y, radius, brickOffsetTop, brickHeight, brickPad, rowCount }) {
        if (rowCount <= 0) return { start: 0, end: -1 };

        const stride = brickHeight + brickPad;
        const start = Math.max(0, Math.min(
            rowCount - 1,
            Math.floor((y - radius - brickOffsetTop) / stride),
        ));
        const end = Math.max(0, Math.min(
            rowCount - 1,
            Math.floor((y + radius - brickOffsetTop) / stride),
        ));

        return { start, end };
    }

    function loadRankingStore(storage, key) {
        if (!storage || typeof storage.getItem !== 'function') {
            return { ranking: [], error: 'unavailable' };
        }

        try {
            const raw = storage.getItem(key);
            if (!raw) return { ranking: [], error: null };

            const ranking = JSON.parse(raw);
            if (!Array.isArray(ranking)) {
                return { ranking: [], error: 'invalid_data' };
            }

            return { ranking, error: null };
        } catch {
            return { ranking: [], error: 'unavailable' };
        }
    }

    function pickMultiBallSource(balls, fallback, random = Math.random) {
        if (Array.isArray(balls) && balls.length > 0) {
            const index = Math.min(
                balls.length - 1,
                Math.floor(random() * balls.length),
            );
            const source = balls[index];
            return { x: source.x, y: source.y };
        }

        return { x: fallback.x, y: fallback.y };
    }

    function resolveFrameOutcome({ allBricksCleared, ballsRemaining, lives }) {
        if (allBricksCleared) {
            return { state: 'STAGE_CLEAR', lives, respawn: false, clearItems: true };
        }

        if (ballsRemaining > 0) {
            return { state: 'PLAYING', lives, respawn: false, clearItems: false };
        }

        const nextLives = lives - 1;
        return {
            state: nextLives <= 0 ? 'GAME_OVER' : 'RESPAWN',
            lives: nextLives,
            respawn: nextLives > 0,
            clearItems: false,
        };
    }

    function saveRankingStore(storage, key, ranking) {
        if (!storage || typeof storage.setItem !== 'function') {
            return { ok: false, error: 'unavailable' };
        }

        try {
            storage.setItem(key, JSON.stringify(ranking));
            return { ok: true, error: null };
        } catch {
            return { ok: false, error: 'unavailable' };
        }
    }

    return {
        countLevelBricks,
        getBrickRowRange,
        getBrickScore,
        loadRankingStore,
        pickMultiBallSource,
        resolveFrameOutcome,
        saveRankingStore,
    };
});
