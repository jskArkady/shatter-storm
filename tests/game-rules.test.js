const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');

const {
    advanceImpactBursts,
    advanceImpactSlices,
    collectActiveBallBodies,
    collectActiveBrickBodies,
    collectActiveBulletGlows,
    collectActiveItemGlows,
    collectActiveBrickFlashes,
    countLevelBricks,
    createBrickImpactBurst,
    createImpactSlice,
    densifyStageRows,
    getBrickLayoutMetrics,
    isBrickDepthMeshEnabled,
    getComboLabel,
    getBrickRowRange,
    getBrickScore,
    getRankingLayout,
    getStageBulletCapacity,
    getThemeHitProfile,
    loadRankingStore,
    pickMultiBallSource,
    resolvePaddleAura,
    resolveComboPulse,
    resolveShakeLayers,
    resolveThreeEffectBridge,
    resolveThreeGameplayBridge,
    resolveThreeOverlayBridge,
    resolveFrameOutcome,
    saveRankingStore,
    trimRankingEntries,
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

test('getStageBulletCapacity adds 10 bullets every 10 stages', () => {
    assert.equal(getStageBulletCapacity(0, 10), 10);
    assert.equal(getStageBulletCapacity(8, 10), 10);
    assert.equal(getStageBulletCapacity(9, 10), 20);
    assert.equal(getStageBulletCapacity(19, 10), 30);
});

test('getBrickLayoutMetrics packs bricks edge-to-edge when padding is removed', () => {
    assert.deepEqual(
        getBrickLayoutMetrics({ width: 1600, cols: 38, offsetLeft: 16, pad: 0 }),
        { playfieldWidth: 1568, brickWidth: 41.26315789473684 },
    );
});

test('densifyStageRows leaves the opening stage unchanged before density passes begin', () => {
    const rows = [
        [1, 0, 1],
        [0, 0, 0],
        [1, 0, 1],
    ];
    assert.deepEqual(densifyStageRows(rows, 0), rows);
});

test('densifyStageRows already thickens early stages once the first density pass starts', () => {
    assert.deepEqual(
        densifyStageRows([[1, 0, 1]], 1),
        [[1, 1, 1]],
    );
});

test('densifyStageRows thickens mid-stage layouts by filling supported horizontal gaps', () => {
    assert.deepEqual(
        densifyStageRows([[1, 0, 1]], 4),
        [[1, 1, 1]],
    );
});

test('densifyStageRows aggressively packs late-stage layouts across multiple passes', () => {
    assert.deepEqual(
        densifyStageRows([
            [1, 0, 1],
            [0, 0, 0],
            [1, 0, 1],
        ], 8),
        [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ],
    );
});

test('getComboLabel scales through realistic late-game combo bands', () => {
    assert.equal(getComboLabel(2), '');
    assert.equal(getComboLabel(3), 'COMBO!');
    assert.equal(getComboLabel(10), 'AMAZING!');
    assert.equal(getComboLabel(35), 'RELENTLESS!');
    assert.equal(getComboLabel(100), 'DEVASTATING!');
    assert.equal(getComboLabel(450), 'SINGULARITY!');
    assert.equal(getComboLabel(2600), 'BEYOND LIMIT!');
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

test('trimRankingEntries keeps only the top 10 scores in descending order', () => {
    const ranking = Array.from({ length: 12 }, (_, index) => ({
        name: `P${index}`,
        score: 1200 - index * 50,
        level: index + 1,
        date: '04.23 10:00',
    })).reverse();

    assert.equal(trimRankingEntries(ranking, 10).length, 10);
    assert.deepEqual(
        trimRankingEntries(ranking, 10).map(entry => entry.score),
        [1200, 1150, 1100, 1050, 1000, 950, 900, 850, 800, 750],
    );
});

test('getRankingLayout expands a top-10 table to use the lower screen space more evenly', () => {
    assert.deepEqual(
        getRankingLayout(10),
        {
            titleY: 54,
            titleSize: 40,
            startY: 118,
            rowHeight: 90,
            headerFont: 'bold 18px sans-serif',
            rankFont: '24px sans-serif',
            bodyFont: 'bold 22px sans-serif',
            metaFont: 'bold 14px sans-serif',
            emptyFont: 'bold 22px sans-serif',
            footerFontSize: 18,
            headerLabelOffset: -16,
            dividerOffset: 12,
            firstRowOffset: 46,
            footerY: 1160,
            noticeY: 1132,
        },
    );
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

test('pickMultiBallSource chooses a random existing ball position', () => {
    const balls = [
        { x: 100, y: 200 },
        { x: 300, y: 400 },
        { x: 500, y: 600 },
    ];

    assert.deepEqual(
        pickMultiBallSource(balls, { x: 800, y: 900 }, () => 0.5),
        { x: 300, y: 400 },
    );
});

test('countLevelBricks precomputes intro brick totals from level rows', () => {
    assert.equal(countLevelBricks([
        [1, 0, 2, 0],
        [0, 3, 0, 4],
        [0, 0, 0, 0],
    ]), 4);
});

test('createBrickImpactBurst centers the burst on the brick and preserves the source color', () => {
    assert.deepEqual(
        createBrickImpactBurst({ x: 120, y: 58, w: 44, h: 16 }, '#78ffd6'),
        {
            x: 142,
            y: 66,
            baseRadius: 26.4,
            life: 1,
            decay: 0.14,
            color: '#78ffd6',
        },
    );
});

test('advanceImpactBursts decays living bursts and drops expired ones', () => {
    assert.deepEqual(
        advanceImpactBursts([
            { x: 1, y: 2, baseRadius: 20, life: 1, decay: 0.2, color: '#fff' },
            { x: 3, y: 4, baseRadius: 18, life: 0.08, decay: 0.1, color: '#0ff' },
        ]),
        [
            { x: 1, y: 2, baseRadius: 20, life: 0.8, decay: 0.2, color: '#fff' },
        ],
    );
});

test('getThemeHitProfile exposes stronger cinematic feedback for the monolith theme', () => {
    assert.deepEqual(
        getThemeHitProfile('monolith'),
        {
            hitParticles: 6,
            breakParticles: 20,
            kick: 12,
            depthPulse: 0.2,
            sliceLength: 1.8,
            sliceThickness: 0.9,
            sliceDecay: 0.19,
        },
    );
});

test('createImpactSlice derives an oriented slash payload from theme hit tuning', () => {
    assert.deepEqual(
        createImpactSlice(
            { x: 20, y: 40, w: 44, h: 16 },
            { color: '#9dffbf', nx: 0, ny: -1, destroyed: true, themeKey: 'diorama' },
        ),
        {
            x: 42,
            y: 48,
            length: 86.13,
            thickness: 4.42,
            angle: 0,
            life: 1,
            decay: 0.17,
            color: '#9dffbf',
        },
    );
});

test('advanceImpactSlices decays slices and drops expired ones', () => {
    assert.deepEqual(
        advanceImpactSlices([
            { x: 1, y: 2, length: 30, thickness: 5, angle: 0, life: 1, decay: 0.2, color: '#fff' },
            { x: 3, y: 4, length: 18, thickness: 3, angle: 1, life: 0.08, decay: 0.1, color: '#0ff' },
        ]),
        [
            { x: 1, y: 2, length: 30, thickness: 5, angle: 0, life: 0.8, decay: 0.2, color: '#fff' },
        ],
    );
});

test('collectActiveBrickFlashes maps living flashing bricks to overlay quads', () => {
    assert.deepEqual(
        collectActiveBrickFlashes(
            [
                { x: 20, y: 40, w: 44, h: 16, alive: true, flashTimer: 6 },
                { x: 80, y: 40, w: 44, h: 16, alive: false, flashTimer: 6 },
                { x: 140, y: 40, w: 44, h: 16, alive: true, flashTimer: 0 },
            ],
            { brickStyle: 'wireframe', brickFlashFrames: 6 },
        ),
        [
            {
                x: 42,
                y: 48,
                width: 44,
                height: 16,
                alpha: 0.6799999999999999,
                radius: 2,
            },
        ],
    );
});

test('collectActiveItemGlows maps falling items to overlay halos', () => {
    assert.deepEqual(
        collectActiveItemGlows([
            { x: 120, y: 210, glow: 0.5, color: '#78ffd6' },
            { x: 240, y: 260, glow: 0, color: '#ffcc00' },
        ]),
        [
            { x: 120, y: 210, radius: 17.5, alpha: 0.27, color: '#78ffd6' },
            { x: 240, y: 260, radius: 15, alpha: 0.16, color: '#ffcc00' },
        ],
    );
});

test('resolveComboPulse builds a themed combo overlay pulse when the combo banner is active', () => {
    assert.deepEqual(
        resolveComboPulse({
            comboDisplay: { value: 12, scale: 1.4, alpha: 0.8, label: 'AMAZING!' },
            comboCount: 12,
            theme: { ball: '#00eeff', text3: '#ffcc00' },
            width: 800,
            height: 600,
        }),
        {
            x: 400,
            y: 230,
            alpha: 0.8,
            scale: 1.4,
            color: '#ff6600',
            text: '12x AMAZING!',
        },
    );
});

test('resolveComboPulse returns null when the combo banner is inactive', () => {
    assert.equal(
        resolveComboPulse({
            comboDisplay: { value: 0, scale: 1, alpha: 0.04, label: '' },
            comboCount: 0,
            theme: { ball: '#00eeff', text3: '#ffcc00' },
            width: 800,
            height: 600,
        }),
        null,
    );
});

test('collectActiveBulletGlows maps bullets to overlay halos centered on their beam cores', () => {
    assert.deepEqual(
        collectActiveBulletGlows([
            { x: 120, y: 300 },
            { x: 240, y: 220 },
        ], { bulletHeight: 14 }),
        [
            { x: 120, y: 293, radius: 11, alpha: 0.24, color: '#ffe04d' },
            { x: 240, y: 213, radius: 11, alpha: 0.24, color: '#ffe04d' },
        ],
    );
});

test('resolvePaddleAura builds an overlay aura payload from paddle state and active effects', () => {
    assert.deepEqual(
        resolvePaddleAura({
            paddle: { x: 400, w: 170 },
            paddleY: 560,
            paddleHeight: 14,
            theme: { paddle: '#00eeff', text3: '#ffcc00' },
            effects: { widePaddle: 5000 },
        }),
        {
            x: 400,
            y: 567,
            width: 206,
            height: 30,
            alpha: 0.34,
            color: '#ffcc00',
        },
    );
});

test('resolveShakeLayers clamps heavy shake and keeps 2D labels aligned with Three gameplay bricks', () => {
    const layers = resolveShakeLayers({ x: 30, y: -20, useThreeGameplay: true });

    assert.equal(layers.worldX, 6);
    assert.equal(layers.worldY, -5);
    assert.equal(layers.gameplayX, layers.worldX);
    assert.equal(layers.gameplayY, layers.worldY);
    assert.equal(layers.backgroundX, 3.6);
    assert.equal(layers.backgroundY, -3);
    assert.equal(layers.overlayX, 6.6);
    assert.equal(layers.overlayY, -5.5);
});

test('collectActiveBrickBodies keeps only alive bricks for the gameplay renderer', () => {
    assert.deepEqual(
        collectActiveBrickBodies([
            { x: 20, y: 40, w: 44, h: 16, row: 0, hp: 2, maxHp: 2, alive: true },
            { x: 80, y: 40, w: 44, h: 16, row: 0, hp: 0, maxHp: 1, alive: false },
            { x: 140, y: 58, w: 44, h: 16, row: 1, hp: 3, maxHp: 3, alive: true },
        ]),
        [
            { x: 20, y: 40, width: 44, height: 16, row: 0, hp: 2, maxHp: 2, lightAlpha: 0.14, lightScale: 1.42 },
            { x: 140, y: 58, width: 44, height: 16, row: 1, hp: 3, maxHp: 3, lightAlpha: 0.16, lightScale: 1.48 },
        ],
    );
});

test('isBrickDepthMeshEnabled disables the duplicate depth slab for the three newest themes only', () => {
    assert.equal(isBrickDepthMeshEnabled?.('diorama'), false);
    assert.equal(isBrickDepthMeshEnabled?.('biomech'), false);
    assert.equal(isBrickDepthMeshEnabled?.('monolith'), false);
    assert.equal(isBrickDepthMeshEnabled?.('neon'), true);
});

test('collectActiveBallBodies keeps gameplay balls unlit while preserving effect-aware color and radius', () => {
    const balls = [{ x: 200, y: 300 }, { x: 400, y: 500 }];
    assert.deepEqual(
        collectActiveBallBodies(balls, {
            ballRadius: 7,
            megaScale: 3,
            themeColors: { ball: '#00eeff', fireBall: '#ff6600', megaBall: '#ffd700' },
            effects: { fireBall: 2000, megaBall: 0 },
        }),
        [
            { x: 200, y: 300, radius: 7, color: '#ff6600', glowAlpha: 0, coreScale: 2.25, coreAlpha: 0.96 },
            { x: 400, y: 500, radius: 7, color: '#ff6600', glowAlpha: 0, coreScale: 2.25, coreAlpha: 0.96 },
        ],
    );
});

test('collectActiveBallBodies reduces core lighting when mega ball is active', () => {
    assert.deepEqual(
        collectActiveBallBodies([{ x: 280, y: 360 }], {
            ballRadius: 7,
            megaScale: 3,
            themeColors: { ball: '#00eeff', fireBall: '#ff6600', megaBall: '#ffd700' },
            effects: { fireBall: 0, megaBall: 4000 },
        }),
        [
            { x: 280, y: 360, radius: 21, color: '#ffd700', glowAlpha: 0, coreScale: 1.45, coreAlpha: 0.68 },
        ],
    );
});

test('resolveThreeEffectBridge enables Three.js effects with live trail and particle sources', () => {
    const balls = [{ x: 10, y: 20, trail: [{ x: 8, y: 18 }, { x: 10, y: 20 }] }];
    const particles = [{ x: 30, y: 40, life: 0.8, size: 4, color: '#ff0' }];
    const impactBursts = [{ x: 50, y: 60, baseRadius: 22, life: 0.7, decay: 0.14, color: '#fff' }];

    const bridge = resolveThreeEffectBridge({
        rendererReady: true,
        theme: {
            particleStyle: 'shard',
            trailStyle: 'arc',
            ballGlow: '#5ea1ff',
            fireBall: '#ffe457',
            megaBall: '#ffffff',
        },
        effects: { fireBall: 0, megaBall: 1200 },
        balls,
        particles,
        impactBursts,
    });

    assert.equal(bridge.useThreeEffects, true);
    assert.equal(bridge.particleStyle, 'shard');
    assert.equal(bridge.trailStyle, 'arc');
    assert.equal(bridge.effectFlags.fireBall, false);
    assert.equal(bridge.effectFlags.megaBall, true);
    assert.equal(bridge.themeColors.ballGlow, '#5ea1ff');
    assert.strictEqual(bridge.balls, balls);
    assert.strictEqual(bridge.particles, particles);
    assert.strictEqual(bridge.impactBursts, impactBursts);
});

test('resolveThreeEffectBridge keeps 2D fallback active when the renderer is unavailable', () => {
    const bridge = resolveThreeEffectBridge({
        rendererReady: false,
        theme: {
            particleStyle: 'spark',
            trailStyle: 'plasma',
            ballGlow: '#00eeff',
            fireBall: '#ff6600',
            megaBall: '#ffd700',
        },
        effects: { fireBall: 800, megaBall: 0 },
        balls: [{ x: 1, y: 2, trail: [{ x: 1, y: 2 }] }],
        particles: [{ x: 3, y: 4, life: 1, size: 2, color: '#fff' }],
        impactBursts: [{ x: 9, y: 10, baseRadius: 22, life: 1, decay: 0.14, color: '#fff' }],
    });

    assert.equal(bridge.useThreeEffects, false);
    assert.deepEqual(bridge.balls, []);
    assert.deepEqual(bridge.particles, []);
    assert.deepEqual(bridge.impactBursts, []);
    assert.equal(bridge.effectFlags.fireBall, true);
    assert.equal(bridge.effectFlags.megaBall, false);
});

test('resolveThreeGameplayBridge exposes live brick bodies when the gameplay renderer is ready', () => {
    const brickBodies = [{ x: 20, y: 40, width: 44, height: 16, row: 0, hp: 2, maxHp: 2, lightAlpha: 0.14, lightScale: 1.42 }];
    const ballBodies = [{ x: 200, y: 300, radius: 7, color: '#00eeff', glowAlpha: 0, coreScale: 2.25, coreAlpha: 0.96 }];
    const bridge = resolveThreeGameplayBridge({
        rendererReady: true,
        brickBodies,
        ballBodies,
    });

    assert.equal(bridge.useThreeGameplay, true);
    assert.strictEqual(bridge.brickBodies, brickBodies);
    assert.strictEqual(bridge.ballBodies, ballBodies);
});

test('resolveThreeGameplayBridge falls back to 2D brick rendering when the gameplay renderer is unavailable', () => {
    const bridge = resolveThreeGameplayBridge({
        rendererReady: false,
        brickBodies: [{ x: 20, y: 40, width: 44, height: 16, row: 0, hp: 2, maxHp: 2, lightAlpha: 0.14, lightScale: 1.42 }],
        ballBodies: [{ x: 200, y: 300, radius: 7, color: '#00eeff', glowAlpha: 0, coreScale: 2.25, coreAlpha: 0.96 }],
    });

    assert.equal(bridge.useThreeGameplay, false);
    assert.deepEqual(bridge.brickBodies, []);
    assert.deepEqual(bridge.ballBodies, []);
});

test('resolveThreeOverlayBridge exposes brick flashes and screen flash when the overlay renderer is ready', () => {
    const overlay = resolveThreeOverlayBridge({
        rendererReady: true,
        bricks: [{ x: 20, y: 40, w: 44, h: 16, alive: true, flashTimer: 3 }],
        items: [{ x: 120, y: 210, glow: 0.5, color: '#78ffd6' }],
        bullets: [{ x: 640, y: 500 }],
        paddle: { x: 400, w: 170 },
        flashAlpha: 0.25,
        brickStyle: 'glass',
        brickFlashFrames: 6,
        comboDisplay: { value: 12, scale: 1.4, alpha: 0.8, label: 'AMAZING!' },
        comboCount: 12,
        theme: { ball: '#00eeff', text3: '#ffcc00' },
        width: 800,
        height: 600,
        paddleY: 560,
        paddleHeight: 14,
        bulletHeight: 14,
        effects: { widePaddle: 5000 },
    });

    assert.equal(overlay.useThreeOverlay, true);
    assert.equal(overlay.overlayFlashAlpha, 0.25);
    assert.deepEqual(overlay.brickFlashes, [
        {
            x: 42,
            y: 48,
            width: 44,
            height: 16,
            alpha: 0.43,
            radius: 4,
        },
    ]);
    assert.deepEqual(overlay.itemGlows, [
        { x: 120, y: 210, radius: 17.5, alpha: 0.27, color: '#78ffd6' },
    ]);
    assert.deepEqual(overlay.comboPulse, {
        x: 400,
        y: 230,
        alpha: 0.8,
        scale: 1.4,
        color: '#ff6600',
        text: '12x AMAZING!',
    });
    assert.deepEqual(overlay.bulletGlows, [
        { x: 640, y: 493, radius: 11, alpha: 0.24, color: '#ffe04d' },
    ]);
    assert.deepEqual(overlay.paddleAura, {
        x: 400,
        y: 567,
        width: 206,
        height: 30,
        alpha: 0.34,
        color: '#ffcc00',
    });
});

test('resolveThreeOverlayBridge falls back to 2D overlays when the WebGL overlay renderer is unavailable', () => {
    const overlay = resolveThreeOverlayBridge({
        rendererReady: false,
        bricks: [{ x: 20, y: 40, w: 44, h: 16, alive: true, flashTimer: 6 }],
        items: [{ x: 120, y: 210, glow: 0.5, color: '#78ffd6' }],
        bullets: [{ x: 640, y: 500 }],
        paddle: { x: 400, w: 170 },
        flashAlpha: 0.25,
        brickStyle: 'glass',
        brickFlashFrames: 6,
        comboDisplay: { value: 5, scale: 1.2, alpha: 0.7, label: 'GREAT!' },
        comboCount: 5,
        theme: { ball: '#00eeff', text3: '#ffcc00' },
        width: 800,
        height: 600,
        paddleY: 560,
        paddleHeight: 14,
        bulletHeight: 14,
        effects: { widePaddle: 5000 },
    });

    assert.equal(overlay.useThreeOverlay, false);
    assert.equal(overlay.overlayFlashAlpha, 0);
    assert.deepEqual(overlay.brickFlashes, []);
    assert.deepEqual(overlay.itemGlows, []);
    assert.equal(overlay.comboPulse, null);
    assert.deepEqual(overlay.bulletGlows, []);
    assert.equal(overlay.paddleAura, null);
});

test('game.js no longer keeps removed theme background and overlay branches', () => {
    const gameSource = readFileSync(require.resolve('../game.js'), 'utf8');

    assert.equal(gameSource.includes("case 'radarSweep':"), false);
    assert.equal(gameSource.includes("case 'causticBands':"), false);
    assert.equal(gameSource.includes("case 'vignette':"), false);
    assert.equal(gameSource.includes("case 'mist':"), false);
});
