(function initShatterLogic(root, factory) {
    const api = factory();
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }
    root.ShatterLogic = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createShatterLogic() {
    'use strict';

    const BRICK_SCORE_BY_HP = [0, 10, 25, 50, 80, 115, 155, 200, 250];
    const COMBO_LABELS = [
        [3, 'COMBO!'],
        [5, 'GREAT!'],
        [10, 'AMAZING!'],
        [20, 'RAMPAGE!'],
        [35, 'RELENTLESS!'],
        [60, 'DOMINATING!'],
        [100, 'DEVASTATING!'],
        [170, 'CATASTROPHIC!'],
        [280, 'WORLDBREAKER!'],
        [450, 'SINGULARITY!'],
        [700, 'PARADOX!'],
        [1100, 'COSMIC!'],
        [1700, 'UNFATHOMABLE!'],
        [2600, 'BEYOND LIMIT!'],
    ];

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

    function cloneRows(rows) {
        return (rows || []).map(row => row.slice());
    }

    function getComboLabel(combo) {
        let label = '';
        for (const [threshold, text] of COMBO_LABELS) {
            if (combo >= threshold) label = text;
        }
        return label;
    }

    function getStageDensityPasses(stageIndex) {
        if (stageIndex <= 0) return 0;
        if (stageIndex <= 2) return 1;
        if (stageIndex <= 4) return 2;
        if (stageIndex <= 6) return 3;
        if (stageIndex <= 9) return 4;
        return Math.min(5 + Math.floor((stageIndex - 10) / 4), 6);
    }

    function averagePositive(values) {
        const positives = values.filter(value => value > 0);
        if (positives.length === 0) return 1;
        const sum = positives.reduce((acc, value) => acc + value, 0);
        return Math.max(1, Math.round(sum / positives.length));
    }

    function densifyStageRows(rows, stageIndex) {
        const passes = getStageDensityPasses(stageIndex);
        if (passes <= 0) return cloneRows(rows);

        let current = cloneRows(rows);
        const height = current.length;
        const width = current[0]?.length ?? 0;

        for (let pass = 0; pass < passes; pass++) {
            const next = cloneRows(current);

            for (let r = 0; r < height; r++) {
                for (let c = 0; c < width; c++) {
                    if (current[r][c] > 0) continue;

                    const left = current[r]?.[c - 1] ?? 0;
                    const right = current[r]?.[c + 1] ?? 0;
                    const up = current[r - 1]?.[c] ?? 0;
                    const down = current[r + 1]?.[c] ?? 0;
                    const diagonals = [
                        current[r - 1]?.[c - 1] ?? 0,
                        current[r - 1]?.[c + 1] ?? 0,
                        current[r + 1]?.[c - 1] ?? 0,
                        current[r + 1]?.[c + 1] ?? 0,
                    ];
                    const orthCount = [left, right, up, down].filter(value => value > 0).length;
                    const diagonalCount = diagonals.filter(value => value > 0).length;

                    let shouldFill = (left > 0 && right > 0) || (up > 0 && down > 0);
                    if (!shouldFill && passes >= 2) shouldFill = orthCount >= 3;
                    if (!shouldFill && passes >= 3) shouldFill = orthCount >= 2 && diagonalCount >= 2;
                    if (!shouldFill && passes >= 4) shouldFill = diagonalCount >= 3;
                    if (!shouldFill) continue;

                    next[r][c] = averagePositive([left, right, up, down, ...diagonals]);
                }
            }

            current = next;
        }

        return current;
    }

    function getBrickLayoutMetrics({ width, cols, offsetLeft, pad }) {
        const playfieldWidth = width - offsetLeft * 2;
        return {
            playfieldWidth,
            brickWidth: (playfieldWidth - pad * (cols - 1)) / cols,
        };
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

    function createBrickImpactBurst(brick, color) {
        return {
            x: brick.x + brick.w / 2,
            y: brick.y + brick.h / 2,
            baseRadius: Math.max(brick.w, brick.h) * 0.6,
            life: 1,
            decay: 0.14,
            color,
        };
    }

    function advanceImpactBursts(bursts) {
        const next = [];
        for (const burst of bursts || []) {
            const life = burst.life - burst.decay;
            if (life <= 0) continue;
            next.push({ ...burst, life });
        }
        return next;
    }

    function collectActiveBrickFlashes(bricks, { brickStyle, brickFlashFrames }) {
        const flashes = [];
        const radius = brickStyle === 'wireframe' ? 2 : 4;

        for (const brick of bricks || []) {
            if (!brick.alive || brick.flashTimer <= 0) continue;
            flashes.push({
                x: brick.x + brick.w / 2,
                y: brick.y + brick.h / 2,
                width: brick.w,
                height: brick.h,
                alpha: 0.18 + (brick.flashTimer / brickFlashFrames) * 0.5,
                radius,
            });
        }

        return flashes;
    }

    function collectActiveItemGlows(items) {
        const glows = [];
        for (const item of items || []) {
            glows.push({
                x: item.x,
                y: item.y,
                radius: 15 + item.glow * 5,
                alpha: 0.16 + item.glow * 0.22,
                color: item.color,
            });
        }
        return glows;
    }

    function resolveComboPulse({ comboDisplay, comboCount, theme, width, height }) {
        if (!comboDisplay?.label || (comboDisplay.alpha ?? 0) <= 0.05) return null;

        return {
            x: width / 2,
            y: height / 2 - 70,
            alpha: comboDisplay.alpha,
            scale: comboDisplay.scale,
            color: comboCount >= 20 ? '#ff0055' : comboCount >= 10 ? '#ff6600' : comboCount >= 5 ? theme.text3 : theme.ball,
            text: `${comboDisplay.value}x ${comboDisplay.label}`,
        };
    }

    function collectActiveBulletGlows(bullets, { bulletHeight }) {
        const glows = [];
        for (const bullet of bullets || []) {
            glows.push({
                x: bullet.x,
                y: bullet.y - bulletHeight / 2,
                radius: bulletHeight / 2 + 4,
                alpha: 0.24,
                color: '#ffe04d',
            });
        }
        return glows;
    }

    function resolvePaddleAura({ paddle, paddleY, paddleHeight, theme, effects }) {
        if (!paddle) return null;
        return {
            x: paddle.x,
            y: paddleY + paddleHeight / 2,
            width: paddle.w + 36,
            height: paddleHeight + 16,
            alpha: (effects?.widePaddle ?? 0) > 0 ? 0.34 : 0.24,
            color: (effects?.widePaddle ?? 0) > 0 ? theme.text3 : theme.paddle,
        };
    }

    function collectActiveBrickBodies(bricks) {
        const bodies = [];
        for (const brick of bricks || []) {
            if (!brick.alive) continue;
            bodies.push({
                x: brick.x,
                y: brick.y,
                width: brick.w,
                height: brick.h,
                row: brick.row,
                hp: brick.hp,
                maxHp: brick.maxHp,
                lightAlpha: 0.1 + Math.min(brick.maxHp, 4) * 0.02,
                lightScale: 1.3 + Math.min(brick.maxHp, 4) * 0.06,
            });
        }
        return bodies;
    }

    function collectActiveBallBodies(balls, { ballRadius, megaScale, themeColors, effects }) {
        const isMega = (effects?.megaBall ?? 0) > 0;
        const isFire = !isMega && (effects?.fireBall ?? 0) > 0;
        const radius = isMega ? ballRadius * megaScale : ballRadius;
        const color = isMega ? themeColors.megaBall : isFire ? themeColors.fireBall : themeColors.ball;
        const glowAlpha = 0;
        const coreScale = isMega ? 1.7 : 2.25;
        const coreAlpha = isMega ? 0.82 : 0.96;

        return (balls || []).map(ball => ({
            x: ball.x,
            y: ball.y,
            radius,
            color,
            glowAlpha,
            coreScale,
            coreAlpha,
        }));
    }

    function resolveThreeEffectBridge({ rendererReady, theme, effects, balls, particles, impactBursts }) {
        return {
            useThreeEffects: Boolean(rendererReady),
            particleStyle: theme?.particleStyle ?? 'spark',
            trailStyle: theme?.trailStyle ?? 'plasma',
            effectFlags: {
                fireBall: (effects?.fireBall ?? 0) > 0,
                megaBall: (effects?.megaBall ?? 0) > 0,
            },
            themeColors: {
                ballGlow: theme?.ballGlow ?? '#ffffff',
                fireBall: theme?.fireBall ?? '#ff6600',
                megaBall: theme?.megaBall ?? '#ffd700',
            },
            balls: rendererReady ? balls : [],
            particles: rendererReady ? particles : [],
            impactBursts: rendererReady ? impactBursts : [],
        };
    }

    function resolveThreeGameplayBridge({ rendererReady, brickBodies, ballBodies }) {
        return {
            useThreeGameplay: Boolean(rendererReady),
            brickBodies: rendererReady ? brickBodies : [],
            ballBodies: rendererReady ? ballBodies : [],
        };
    }

    function resolveThreeOverlayBridge({
        rendererReady,
        bricks,
        items,
        bullets,
        paddle,
        flashAlpha,
        brickStyle,
        brickFlashFrames,
        comboDisplay,
        comboCount,
        theme,
        width,
        height,
        paddleY,
        paddleHeight,
        bulletHeight,
        effects,
    }) {
        return {
            useThreeOverlay: Boolean(rendererReady),
            overlayFlashAlpha: rendererReady ? flashAlpha : 0,
            brickFlashes: rendererReady
                ? collectActiveBrickFlashes(bricks, { brickStyle, brickFlashFrames })
                : [],
            itemGlows: rendererReady ? collectActiveItemGlows(items) : [],
            comboPulse: rendererReady ? resolveComboPulse({ comboDisplay, comboCount, theme, width, height }) : null,
            bulletGlows: rendererReady ? collectActiveBulletGlows(bullets, { bulletHeight }) : [],
            paddleAura: rendererReady ? resolvePaddleAura({ paddle, paddleY, paddleHeight, theme, effects }) : null,
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
        advanceImpactBursts,
        collectActiveBulletGlows,
        collectActiveBallBodies,
        collectActiveBrickFlashes,
        collectActiveItemGlows,
        collectActiveBrickBodies,
        countLevelBricks,
        createBrickImpactBurst,
        densifyStageRows,
        getBrickLayoutMetrics,
        getComboLabel,
        getBrickRowRange,
        getBrickScore,
        loadRankingStore,
        pickMultiBallSource,
        resolveComboPulse,
        resolvePaddleAura,
        resolveThreeEffectBridge,
        resolveThreeGameplayBridge,
        resolveThreeOverlayBridge,
        resolveFrameOutcome,
        saveRankingStore,
    };
});
