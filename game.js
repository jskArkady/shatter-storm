(() => {
'use strict';

// ═══════════════════════════════════════════════════════════════
// THEMES
// ═══════════════════════════════════════════════════════════════
function createTheme(config) {
    return {
        name: '',
        menuBadge: '',
        menuHint: '',
        backgroundMode: 'laserGrid',
        overlayMode: 'scanline',
        brickStyle: 'glass',
        trailStyle: 'plasma',
        particleStyle: 'spark',
        hudStyle: 'wire',
        bg1: '#000000',
        bg2: '#111111',
        grid: 'rgba(255,255,255,0.08)',
        ball: '#ffffff',
        ballGlow: '#ffffff',
        paddle: '#ffffff',
        paddleDark: '#666666',
        brickHue: r => (r * 32) % 360,
        brickSat: 80,
        brickLight: 52,
        starCol: [255, 255, 255],
        text1: '#ffffff',
        text2: '#bbbbbb',
        text3: '#888888',
        accent: '#ffffff',
        fireBall: '#ff6600',
        megaBall: '#ffd700',
        itemColors: {
            MULTI_BALL: '#ff0055',
            WIDE_PADDLE: '#ffcc00',
            FIRE_BALL: '#ff6600',
            MEGA_BALL: '#ffd700',
        },
        itemIcons: {
            MULTI_BALL: '◉',
            WIDE_PADDLE: '↔',
            FIRE_BALL: '✦',
            MEGA_BALL: '🌟',
        },
        ...config,
    };
}

const THEME_ORDER = ['neon', 'forge', 'shrine', 'storm', 'auroraPop', 'prismLagoon', 'diorama', 'biomech', 'monolith'];

const THEMES = {
    neon: createTheme({
        name: 'NEON',
        menuBadge: 'Original',
        menuHint: 'Laser grid / prism glass',
        backgroundMode: 'laserGrid',
        overlayMode: 'scanline',
        brickStyle: 'glass',
        trailStyle: 'plasma',
        particleStyle: 'spark',
        hudStyle: 'wire',
        bg1: '#07071e', bg2: '#140a30',
        grid: 'rgba(60,40,120,0.12)',
        ball: '#00eeff', ballGlow: '#00eeff',
        paddle: '#00eeff', paddleDark: 'hsl(195,90%,30%)',
        brickHue: r => (r * 32 + 340) % 360, brickSat: 85, brickLight: 52,
        starCol: [200, 220, 255],
        text1: '#00eeff', text2: '#ff0055', text3: '#ffcc00',
        accent: '#00eeff',
        fireBall: '#ff6600', megaBall: '#ffd700',
        itemColors: {
            MULTI_BALL: '#ff0055', WIDE_PADDLE: '#ffcc00',
            FIRE_BALL: '#ff3300', MEGA_BALL: '#ffd700',
        },
        itemIcons: {
            MULTI_BALL: '◉', WIDE_PADDLE: '↔',
            FIRE_BALL: '✦', MEGA_BALL: '⬢',
        },
    }),
    forge: createTheme({
        name: 'FORGE',
        menuBadge: 'Furnace',
        menuHint: 'Heat haze / forged steel',
        backgroundMode: 'heatHaze',
        overlayMode: 'ash',
        brickStyle: 'forgedMetal',
        trailStyle: 'ember',
        particleStyle: 'ember',
        hudStyle: 'kiln',
        bg1: '#140c08', bg2: '#34160d',
        grid: 'rgba(255,120,40,0.05)',
        ball: '#ffc56a', ballGlow: '#ff8b3d',
        paddle: '#ff9c52', paddleDark: '#7b3417',
        brickHue: r => [18, 24, 30, 36, 12, 42][r % 6], brickSat: 76, brickLight: 48,
        starCol: [255, 170, 100],
        text1: '#ffe1b0', text2: '#ff9c52', text3: '#ffcf6b',
        accent: '#ff8b3d', fireBall: '#ffd84d', megaBall: '#fff4d8',
        itemColors: {
            MULTI_BALL: '#ff9c52', WIDE_PADDLE: '#ffcf6b',
            FIRE_BALL: '#ffd84d', MEGA_BALL: '#fff4d8',
        },
        itemIcons: {
            MULTI_BALL: '▤', WIDE_PADDLE: '⟷',
            FIRE_BALL: '✸', MEGA_BALL: '◆',
        },
    }),
    shrine: createTheme({
        name: 'SHRINE BLOOM',
        menuBadge: 'Ritual',
        menuHint: 'Paper wash / falling petals',
        backgroundMode: 'paperWash',
        overlayMode: 'petalFall',
        brickStyle: 'lacquerTile',
        trailStyle: 'inkRibbon',
        particleStyle: 'petal',
        hudStyle: 'seal',
        bg1: '#16111f', bg2: '#2d1830',
        grid: 'rgba(255,220,230,0.05)',
        ball: '#ffd8e5', ballGlow: '#ff8fa8',
        paddle: '#ffb3c7', paddleDark: '#7c3355',
        brickHue: r => [332, 340, 348, 320, 12, 300][r % 6], brickSat: 52, brickLight: 60,
        starCol: [255, 215, 225],
        text1: '#fff1f6', text2: '#ffb3c7', text3: '#f2d0ff',
        accent: '#ff8fa8', fireBall: '#ff7360', megaBall: '#fff8fb',
        itemColors: {
            MULTI_BALL: '#ffb3c7', WIDE_PADDLE: '#f2d0ff',
            FIRE_BALL: '#ff7360', MEGA_BALL: '#fff8fb',
        },
        itemIcons: {
            MULTI_BALL: '○', WIDE_PADDLE: '⥮',
            FIRE_BALL: '✿', MEGA_BALL: '❖',
        },
    }),
    storm: createTheme({
        name: 'STORM CIRCUIT',
        menuBadge: 'Overclock',
        menuHint: 'Rain field / lightning arc',
        backgroundMode: 'rainField',
        overlayMode: 'lightningFlash',
        brickStyle: 'chargedPanel',
        trailStyle: 'arc',
        particleStyle: 'shard',
        hudStyle: 'overclock',
        bg1: '#050a16', bg2: '#0d1832',
        grid: 'rgba(80,140,255,0.08)',
        ball: '#b7d7ff', ballGlow: '#5ea1ff',
        paddle: '#6bb3ff', paddleDark: '#17396c',
        brickHue: r => [210, 220, 228, 236, 200, 246][r % 6], brickSat: 78, brickLight: 55,
        starCol: [150, 190, 255],
        text1: '#eaf2ff', text2: '#6bb3ff', text3: '#d8ff5f',
        accent: '#5ea1ff', fireBall: '#ffe457', megaBall: '#ffffff',
        itemColors: {
            MULTI_BALL: '#6bb3ff', WIDE_PADDLE: '#d8ff5f',
            FIRE_BALL: '#ffe457', MEGA_BALL: '#ffffff',
        },
        itemIcons: {
            MULTI_BALL: '◈', WIDE_PADDLE: '⇄',
            FIRE_BALL: '⚡', MEGA_BALL: '⬢',
        },
    }),
    auroraPop: createTheme({
        name: 'AURORA POP',
        menuBadge: 'Pastel',
        menuHint: 'Balloon drift / candy glass',
        backgroundMode: 'balloonParade',
        overlayMode: 'confettiDrift',
        brickStyle: 'wetGlass',
        trailStyle: 'ribbonArc',
        particleStyle: 'confetti',
        hudStyle: 'seal',
        bg1: '#355d9a', bg2: '#f6b3bf',
        grid: 'rgba(255,255,255,0.09)',
        ball: '#fff9f2', ballGlow: '#ffe571',
        paddle: '#ffe6ae', paddleDark: '#b87f59',
        brickHue: r => [338, 24, 52, 190, 214, 284][r % 6], brickSat: 78, brickLight: 64,
        starCol: [255, 244, 224],
        text1: '#fffaf5', text2: '#ffd7ec', text3: '#92f2ff',
        accent: '#ffec75', fireBall: '#ff9254', megaBall: '#fffbe4',
        itemColors: {
            MULTI_BALL: '#ff92b2', WIDE_PADDLE: '#92f2ff',
            FIRE_BALL: '#ff9254', MEGA_BALL: '#fffbe4',
        },
        itemIcons: {
            MULTI_BALL: '◌', WIDE_PADDLE: '↹',
            FIRE_BALL: '✦', MEGA_BALL: '✧',
        },
    }),
    prismLagoon: createTheme({
        name: 'PRISM LAGOON',
        menuBadge: 'Airy',
        menuHint: 'Sunlit ripples / prism bloom',
        backgroundMode: 'prismLagoon',
        overlayMode: 'sunGlint',
        brickStyle: 'glass',
        trailStyle: 'plasma',
        particleStyle: 'spark',
        hudStyle: 'wire',
        bg1: '#235d7c', bg2: '#78e1d6',
        grid: 'rgba(255,255,255,0.08)',
        ball: '#ffffff', ballGlow: '#8ef3ff',
        paddle: '#c8fff5', paddleDark: '#2f7782',
        brickHue: r => [174, 192, 210, 272, 48, 332][r % 6], brickSat: 72, brickLight: 62,
        starCol: [214, 255, 246],
        text1: '#f7fffe', text2: '#a5f2ff', text3: '#ffe88f',
        accent: '#8ef3ff', fireBall: '#ff9b6a', megaBall: '#fffef1',
        itemColors: {
            MULTI_BALL: '#a5f2ff', WIDE_PADDLE: '#ffe88f',
            FIRE_BALL: '#ff9b6a', MEGA_BALL: '#fffef1',
        },
        itemIcons: {
            MULTI_BALL: '◍', WIDE_PADDLE: '⇄',
            FIRE_BALL: '✶', MEGA_BALL: '◇',
        },
    }),
    diorama: createTheme({
        name: 'MINIATURE CITY',
        menuBadge: 'Tabletop',
        menuHint: 'Tilted set / toy plastics',
        backgroundMode: 'dioramaShelf',
        overlayMode: 'toyDust',
        brickStyle: 'toyBlock',
        trailStyle: 'ribbonArc',
        particleStyle: 'confetti',
        hudStyle: 'seal',
        bg1: '#0f1a22', bg2: '#24394a',
        grid: 'rgba(255,243,214,0.08)',
        ball: '#fff1c2', ballGlow: '#ffcf66',
        paddle: '#ffd890', paddleDark: '#9a6d32',
        brickHue: r => [18, 34, 52, 188, 208, 330][r % 6], brickSat: 78, brickLight: 62,
        starCol: [255, 233, 184],
        text1: '#fff5d9', text2: '#ffcf7b', text3: '#8fe6ff',
        accent: '#ffcf66', fireBall: '#ff8b42', megaBall: '#fff7dd',
        itemColors: {
            MULTI_BALL: '#ff8d67', WIDE_PADDLE: '#8fe6ff',
            FIRE_BALL: '#ff8b42', MEGA_BALL: '#fff7dd',
        },
        itemIcons: {
            MULTI_BALL: '◎', WIDE_PADDLE: '↹',
            FIRE_BALL: '✸', MEGA_BALL: '▣',
        },
    }),
    biomech: createTheme({
        name: 'BIOMECH HIVE',
        menuBadge: 'Organic',
        menuHint: 'Membrane pulse / wet tissue',
        backgroundMode: 'bioPulse',
        overlayMode: 'sporeVeil',
        brickStyle: 'bioShell',
        trailStyle: 'tendon',
        particleStyle: 'spore',
        hudStyle: 'sonar',
        bg1: '#060d0b', bg2: '#19352e',
        grid: 'rgba(128,255,206,0.06)',
        ball: '#d2fff0', ballGlow: '#6cffba',
        paddle: '#83ffc8', paddleDark: '#1e5d48',
        brickHue: r => [134, 146, 158, 170, 182, 194][r % 6], brickSat: 46, brickLight: 48,
        starCol: [146, 255, 200],
        text1: '#e7fff5', text2: '#83ffc8', text3: '#b4ffd8',
        accent: '#6cffba', fireBall: '#ff8b6c', megaBall: '#f3fff9',
        itemColors: {
            MULTI_BALL: '#83ffc8', WIDE_PADDLE: '#b4ffd8',
            FIRE_BALL: '#ff8b6c', MEGA_BALL: '#f3fff9',
        },
        itemIcons: {
            MULTI_BALL: '◍', WIDE_PADDLE: '⇄',
            FIRE_BALL: '✶', MEGA_BALL: '⬡',
        },
    }),
    monolith: createTheme({
        name: 'BRUTAL MONOLITH',
        menuBadge: 'Massive',
        menuHint: 'Stone slabs / void dust',
        backgroundMode: 'monolithVault',
        overlayMode: 'slabShadow',
        brickStyle: 'monolithSlab',
        trailStyle: 'slabEcho',
        particleStyle: 'dustShard',
        hudStyle: 'ops',
        bg1: '#090909', bg2: '#1f2327',
        grid: 'rgba(255,255,255,0.04)',
        ball: '#f4f1e6', ballGlow: '#b9b2a3',
        paddle: '#d9d1c2', paddleDark: '#5a544c',
        brickHue: r => [22, 28, 34, 40, 18, 46][r % 6], brickSat: 14, brickLight: 40,
        starCol: [226, 221, 208],
        text1: '#f2eee6', text2: '#d9d1c2', text3: '#b9b2a3',
        accent: '#d9d1c2', fireBall: '#ffab6b', megaBall: '#fffaf0',
        itemColors: {
            MULTI_BALL: '#d9d1c2', WIDE_PADDLE: '#b9b2a3',
            FIRE_BALL: '#ffab6b', MEGA_BALL: '#fffaf0',
        },
        itemIcons: {
            MULTI_BALL: '◫', WIDE_PADDLE: '⟷',
            FIRE_BALL: '✦', MEGA_BALL: '⬒',
        },
    }),
};

let currentThemeKey = 'neon';
let theme = THEMES.neon;

function setTheme(key) {
    currentThemeKey = THEMES[key] ? key : 'neon';
    theme = THEMES[currentThemeKey];
    document.documentElement.style.setProperty('--theme-bg1', theme.bg1);
    document.documentElement.style.setProperty('--theme-bg2', theme.bg2);
    if (bricks.length > 0) {
        rebuildBrickLayer();
        if (state === 'STAGE_INTRO') stageIntroBrickSnapshot = buildStageIntroSnapshot();
    }
}

// ═══════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════
const W = 1600, H = 1200;
const PADDLE_BASE_W = 160, PADDLE_H = 15, PADDLE_Y = H - 55;
const BALL_R = 7, BALL_BASE_SPEED = 5;
const ShatterLogic = globalThis.ShatterLogic;

if (!ShatterLogic) throw new Error('ShatterLogic failed to load');

const {
    advanceImpactBursts,
    advanceImpactSlices,
    collectActiveBallBodies,
    collectActiveBrickBodies,
    countLevelBricks,
    createBrickImpactBurst,
    createImpactSlice,
    densifyStageRows,
    getBrickLayoutMetrics,
    getComboLabel,
    getBrickRowRange,
    getBrickScore,
    getRankingLayout,
    getStageBulletCapacity,
    getThemeHitProfile,
    loadRankingStore,
    pickMultiBallSource,
    resolveShakeLayers,
    resolveThreeOverlayBridge,
    resolveThreeEffectBridge,
    resolveThreeGameplayBridge,
    resolveFrameOutcome,
    saveRankingStore,
    trimRankingEntries,
} = ShatterLogic;
const BRICK_COLS = 38, BRICK_PAD = 0;
const BRICK_OFFSET_TOP = 58, BRICK_OFFSET_LEFT = 16;
const { brickWidth: BRICK_W } = getBrickLayoutMetrics({
    width: W,
    cols: BRICK_COLS,
    offsetLeft: BRICK_OFFSET_LEFT,
    pad: BRICK_PAD,
});
const BRICK_H = 16;
const ITEM_SIZE = 24, ITEM_FALL_SPEED = 5.6;
const MAX_BALLS = 300, START_LIVES = 3;
const COMBO_WINDOW_MS = 1800;
const MULTI_BALL_COUNT = 15;
const EFFECT_DURATION_MS = 10000;
const MEGA_BALL_DURATION_MS = 8000;
const BRICK_FLASH_FRAMES = 6;
const RANKING_KEY = 'shatterStorm_v7';
const MAX_RANKING = 10;
const MAX_PARTICLES = 500;
const MAX_IMPACT_BURSTS = 96;
const MAX_IMPACT_SLICES = 120;
const MEGA_BALL_SCALE = 3;
const BULLETS_PER_STAGE = 10;
const BULLET_SPEED = 14;
const BULLET_W = 4, BULLET_H = 14;

const NEON = ['#ff0055','#ff6600','#ffcc00','#00ff88','#00ccff','#8855ff','#ff33cc'];

// ═══════════════════════════════════════════════════════════════
// ITEM DEFINITIONS
// ═══════════════════════════════════════════════════════════════
const ITEM_TYPES = [
    { id: 'MULTI_BALL',  label: '●●●',  name: 'MULTI BALL', weight: 6 },
    { id: 'WIDE_PADDLE', label: '◄ ►',  name: 'WIDE',       weight: 5 },
    { id: 'FIRE_BALL',   label: '🔥',    name: 'FIRE',       weight: 5 },
    { id: 'MEGA_BALL',   label: '🌟',    name: 'MEGA',       weight: 3 },
];
const ITEM_HELP = {
    MULTI_BALL: { title: 'MULTI BALL', duration: 'Instant', description: 'Spawns 15 extra balls.' },
    WIDE_PADDLE: { title: 'WIDE PADDLE', duration: '10 sec', description: 'Expands the paddle width.' },
    FIRE_BALL: { title: 'FIRE BALL', duration: '10 sec', description: 'Pierces bricks on impact.' },
    MEGA_BALL: { title: 'MEGA BALL', duration: '8 sec', description: 'Turns the ball giant.' },
};
const TOTAL_ITEM_WEIGHT = ITEM_TYPES.reduce((s, i) => s + i.weight, 0);
const ITEM_DROP_CHANCE = 0.45;

// ═══════════════════════════════════════════════════════════════
// CANVAS SETUP
// ═══════════════════════════════════════════════════════════════
const sceneCanvas = document.getElementById('scene3d');
const sceneGameplayCanvas = document.getElementById('scene3d-gameplay');
const canvas = document.getElementById('game');
const sceneOverlayCanvas = document.getElementById('scene3d-overlay');
const ctx = canvas.getContext('2d');
canvas.width = W;
canvas.height = H;
const threeRenderer = globalThis.ShatterThreeBackgroundRenderer
    ? new globalThis.ShatterThreeBackgroundRenderer({ canvas: sceneCanvas, width: W, height: H })
    : null;
const threeGameplayRenderer = globalThis.ShatterThreeGameplayRenderer
    ? new globalThis.ShatterThreeGameplayRenderer({ canvas: sceneGameplayCanvas, width: W, height: H })
    : null;
const threeOverlayRenderer = globalThis.ShatterThreeOverlayRenderer
    ? new globalThis.ShatterThreeOverlayRenderer({ canvas: sceneOverlayCanvas, width: W, height: H })
    : null;
const renderFlags = { useThreeEffects: false, useThreeGameplay: false, useThreeOverlay: false };
let isUiCursorVisible = null;

function setUiCursorVisible(isVisible) {
    if (isUiCursorVisible === isVisible) return;
    isUiCursorVisible = isVisible;
    document.body.classList.toggle('is-ui-cursor', isVisible);
}

// ═══════════════════════════════════════════════════════════════
// UTILITY
// ═══════════════════════════════════════════════════════════════
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => Math.random() * (b - a) + a;
const randInt = (a, b) => Math.floor(rand(a, b + 1));
const hsl = (h, s, l) => `hsl(${h},${s}%,${l}%)`;
const dist = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

// ═══════════════════════════════════════════════════════════════
// SOUND ENGINE
// ═══════════════════════════════════════════════════════════════
let audioCtx = null;
function ensureAudio() {
    if (!audioCtx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}

function playSound(type) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const mkOsc = (freq, dur, wave = 'sine', vol = 0.12) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = wave; osc.connect(gain); gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(vol, now);
        return { osc, gain };
    };
    switch (type) {
        case 'paddle': {
            const { osc, gain } = mkOsc(440, 0.08, 'sine', 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now); osc.stop(now + 0.08); break;
        }
        case 'brick': {
            const { osc, gain } = mkOsc(250 + Math.random() * 300, 0.1, 'square', 0.08);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.start(now); osc.stop(now + 0.1); break;
        }
        case 'item': {
            const { osc, gain } = mkOsc(350, 0.25, 'sine', 0.13);
            osc.frequency.exponentialRampToValueAtTime(900, now + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc.start(now); osc.stop(now + 0.25); break;
        }
        case 'multiBall': {
            [0, 3, 7, 12].forEach((note, i) => {
                const o = audioCtx.createOscillator(); const g = audioCtx.createGain();
                o.type = 'sine'; o.connect(g); g.connect(audioCtx.destination);
                const t = now + i * 0.05;
                o.frequency.setValueAtTime(440 * Math.pow(2, note / 12), t);
                g.gain.setValueAtTime(0.13, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
                o.start(t); o.stop(t + 0.18);
            }); break;
        }
        case 'bullet': {
            const { osc, gain } = mkOsc(800, 0.06, 'square', 0.07);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
            osc.start(now); osc.stop(now + 0.06); break;
        }
        case 'bomb': {
            const { osc, gain } = mkOsc(80, 0.45, 'sine', 0.22);
            osc.frequency.exponentialRampToValueAtTime(25, now + 0.45);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
            osc.start(now); osc.stop(now + 0.45);
            const { osc: o2, gain: g2 } = mkOsc(200, 0.3, 'sawtooth', 0.12);
            o2.frequency.exponentialRampToValueAtTime(40, now + 0.3);
            g2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            o2.start(now); o2.stop(now + 0.3); break;
        }
        case 'lightning': {
            const { osc, gain } = mkOsc(2000, 0.18, 'sawtooth', 0.1);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
            osc.start(now); osc.stop(now + 0.18); break;
        }
        case 'megaBall': {
            [0, 5, 12].forEach((note, i) => {
                const o = audioCtx.createOscillator(); const g = audioCtx.createGain();
                o.type = 'sine'; o.connect(g); g.connect(audioCtx.destination);
                const t = now + i * 0.08;
                o.frequency.setValueAtTime(220 * Math.pow(2, note / 12), t);
                g.gain.setValueAtTime(0.16, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
                o.start(t); o.stop(t + 0.25);
            }); break;
        }
        case 'wall': {
            const { osc, gain } = mkOsc(200, 0.04, 'sine', 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.start(now); osc.stop(now + 0.04); break;
        }
        case 'die': {
            const { osc, gain } = mkOsc(400, 0.4, 'sawtooth', 0.13);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.4);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.start(now); osc.stop(now + 0.4); break;
        }
        case 'levelClear': {
            [0, 4, 7, 12, 16].forEach((note, i) => {
                const o = audioCtx.createOscillator(); const g = audioCtx.createGain();
                o.type = 'triangle'; o.connect(g); g.connect(audioCtx.destination);
                const t = now + i * 0.1;
                o.frequency.setValueAtTime(523 * Math.pow(2, note / 12), t);
                g.gain.setValueAtTime(0.16, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
                o.start(t); o.stop(t + 0.35);
            }); break;
        }
        case 'gameOver': {
            const { osc, gain } = mkOsc(500, 0.6, 'sawtooth', 0.16);
            osc.frequency.exponentialRampToValueAtTime(60, now + 0.6);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
            osc.start(now); osc.stop(now + 0.6); break;
        }
    }
}

// ═══════════════════════════════════════════════════════════════
// PARTICLE SYSTEM
// ═══════════════════════════════════════════════════════════════
let particles = [];
let impactBursts = [];
let impactSlices = [];
function spawnParticles(x, y, color, count = 15) {
    const canAdd = MAX_PARTICLES - particles.length;
    if (canAdd <= 0) return;
    const n = Math.min(count, canAdd);
    for (let i = 0; i < n; i++) {
        particles.push({
            x, y,
            vx: rand(-6, 6), vy: rand(-7, 3),
            life: 1, decay: rand(0.013, 0.035),
            color, size: rand(2, 6),
        });
    }
}
function spawnCelebration(count = 120) {
    const canAdd = MAX_PARTICLES - particles.length;
    if (canAdd <= 0) return;
    const n = Math.min(count, canAdd);
    for (let i = 0; i < n; i++) {
        particles.push({
            x: rand(0, W), y: rand(-120, H * 0.3),
            vx: rand(-3, 3), vy: rand(1, 5),
            life: 1, decay: rand(0.004, 0.012),
            color: NEON[randInt(0, NEON.length - 1)],
            size: rand(3, 8),
        });
    }
}
function spawnExplosion(x, y, color, count = 40) {
    const canAdd = MAX_PARTICLES - particles.length;
    if (canAdd <= 0) return;
    const n = Math.min(count, canAdd);
    for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2;
        const speed = rand(3, 10);
        particles.push({
            x, y,
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            life: 1, decay: rand(0.01, 0.025),
            color, size: rand(3, 7),
        });
    }
}
function updateParticles() {
    let i = 0;
    while (i < particles.length) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.12; p.life -= p.decay;
        if (p.life <= 0) {
            // swap-and-pop: O(1) removal, order doesn't matter for particles
            particles[i] = particles[particles.length - 1];
            particles.pop();
        } else {
            i++;
        }
    }
}

function emitBrickImpact(br) {
    if (impactBursts.length >= MAX_IMPACT_BURSTS) impactBursts.shift();
    impactBursts.push(createBrickImpactBurst(br, brickColor(br)));
}

function emitImpactSlice(br, options) {
    if (impactSlices.length >= MAX_IMPACT_SLICES) impactSlices.shift();
    impactSlices.push(createImpactSlice(br, options));
}

function applyBrickHitFeedback(br, { nx = 0, ny = -1, destroyed = false } = {}) {
    const color = brickColor(br);
    const profile = getThemeHitProfile(currentThemeKey);
    const centerX = br.x + br.w / 2;
    const centerY = br.y + br.h / 2;
    const particleCount = destroyed ? profile.breakParticles : profile.hitParticles;
    const kick = profile.kick * (destroyed ? 1 : 0.7);
    const pulse = profile.depthPulse * (destroyed ? 1 : 0.75);

    emitBrickImpact(br);
    emitImpactSlice(br, { color, nx, ny, destroyed, themeKey: currentThemeKey });
    spawnParticles(centerX, centerY, color, particleCount);

    depthPulse = Math.max(depthPulse, pulse);
    shake.intensity = Math.max(shake.intensity, kick * 0.22);
    shake.kickX += nx * kick * 0.38;
    shake.kickY += ny * kick * 0.3;
}

function renderParticles() {
    if (renderFlags.useThreeEffects) return;
    switch (theme.particleStyle) {
        case 'chip':
            for (const p of particles) {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 6;
                ctx.fillRect(p.x - p.size * 0.7, p.y - p.size * 0.22, p.size * 1.4, p.size * 0.44);
            }
            break;
        case 'bubble':
            ctx.lineWidth = 1.1;
            for (const p of particles) {
                ctx.globalAlpha = p.life;
                ctx.strokeStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
                ctx.stroke();
            }
            break;
        case 'ember':
            for (const p of particles) {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        case 'petal':
            for (const p of particles) {
                ctx.save();
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 6;
                ctx.translate(p.x, p.y);
                ctx.rotate(frameCount * 0.04 + p.x * 0.01);
                ctx.beginPath();
                ctx.ellipse(0, 0, p.size * 0.6, p.size * 0.28, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            break;
        case 'shard':
            for (const p of particles) {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y - p.size * 0.6);
                ctx.lineTo(p.x + p.size * 0.55, p.y);
                ctx.lineTo(p.x, p.y + p.size * 0.6);
                ctx.lineTo(p.x - p.size * 0.55, p.y);
                ctx.closePath();
                ctx.fill();
            }
            break;
        case 'confetti':
            for (const p of particles) {
                ctx.save();
                ctx.globalAlpha = p.life;
                ctx.translate(p.x, p.y);
                ctx.rotate(frameCount * 0.08 + p.x * 0.01);
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 8;
                ctx.fillRect(-p.size * 0.55, -p.size * 0.18, p.size * 1.1, p.size * 0.36);
                ctx.restore();
            }
            break;
        case 'spore':
            for (const p of particles) {
                ctx.globalAlpha = p.life * 0.8;
                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 0.8);
                grd.addColorStop(0, 'rgba(255,255,255,0.95)');
                grd.addColorStop(0.4, p.color);
                grd.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        case 'dustShard':
            ctx.lineCap = 'round';
            for (const p of particles) {
                ctx.globalAlpha = p.life * 0.75;
                ctx.strokeStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 4;
                ctx.lineWidth = Math.max(1, p.size * 0.18);
                ctx.beginPath();
                ctx.moveTo(p.x - p.size * 0.5, p.y + p.size * 0.2);
                ctx.lineTo(p.x + p.size * 0.6, p.y - p.size * 0.2);
                ctx.stroke();
            }
            break;
        default:
            for (const p of particles) {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 6;
                ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
            }
            break;
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
}

// ═══════════════════════════════════════════════════════════════
// FLOATING TEXT SYSTEM
// ═══════════════════════════════════════════════════════════════
let floatingTexts = [];
function addFloatingText(x, y, text, color) {
    floatingTexts.push({ x, y, text, color, life: 1, vy: -1.8, scale: 1.6 });
}
function updateFloatingTexts() {
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
        const ft = floatingTexts[i];
        ft.y += ft.vy; ft.life -= 0.018;
        ft.scale = lerp(ft.scale, 1, 0.08);
        if (ft.life <= 0) floatingTexts.splice(i, 1);
    }
}
function renderFloatingTexts() {
    for (const ft of floatingTexts) {
        ctx.save();
        ctx.globalAlpha = ft.life;
        ctx.fillStyle = ft.color;
        ctx.font = `bold ${Math.floor(14 * ft.scale)}px sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.shadowColor = ft.color; ctx.shadowBlur = 8;
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
    }
}

// ═══════════════════════════════════════════════════════════════
// BACKGROUND
// ═══════════════════════════════════════════════════════════════
const stars = Array.from({ length: 80 }, () => ({
    x: rand(0, W), y: rand(0, H),
    r: rand(0.5, 1.8), speed: rand(0.1, 0.5), brightness: rand(0.15, 0.55),
}));

function updateStars() {
    for (const s of stars) {
        switch (theme.backgroundMode) {
            case 'rainField':
                s.x -= s.speed * 6;
                s.y += s.speed * 9;
                if (s.y > H + 20 || s.x < -20) {
                    s.x = rand(W * 0.2, W + 40);
                    s.y = rand(-H * 0.2, -20);
                }
                break;
            case 'paperWash':
                s.y += s.speed * 0.55;
                s.x += Math.sin((frameCount + s.y) * 0.012) * 0.4;
                if (s.y > H + 30) {
                    s.x = rand(0, W);
                    s.y = rand(-60, -10);
                }
                break;
            case 'heatHaze':
                s.y -= s.speed * 0.9;
                s.x += Math.sin((frameCount + s.y) * 0.01) * 0.25;
                if (s.y < -10) {
                    s.y = H + 10;
                    s.x = rand(0, W);
                }
                break;
            case 'balloonParade':
                s.y -= s.speed * 0.42;
                s.x += Math.sin((frameCount + s.y) * 0.013) * 0.9;
                if (s.y < -30) {
                    s.y = H + 30;
                    s.x = rand(0, W);
                }
                break;
            case 'prismLagoon':
                s.y -= s.speed * 0.34;
                s.x += Math.sin((frameCount + s.y) * 0.018) * 0.45;
                if (s.y < -24) {
                    s.y = H + 24;
                    s.x = rand(0, W);
                }
                break;
            case 'dioramaShelf':
                s.x += Math.sin((frameCount + s.y) * 0.01) * 0.5;
                s.y += Math.cos((frameCount + s.x) * 0.007) * 0.28;
                if (s.x < -20 || s.x > W + 20 || s.y < -20 || s.y > H + 20) {
                    s.x = rand(0, W);
                    s.y = rand(0, H * 0.55);
                }
                break;
            case 'bioPulse':
                s.y -= s.speed * 0.5;
                s.x += Math.sin((frameCount + s.y) * 0.024) * 1.2;
                if (s.y < -24) {
                    s.y = H + 24;
                    s.x = rand(0, W);
                }
                break;
            case 'monolithVault':
                s.y += s.speed * 0.35;
                s.x += Math.sin((frameCount + s.y) * 0.01) * 0.18;
                if (s.y > H + 24) {
                    s.y = rand(-80, -20);
                    s.x = rand(0, W);
                }
                break;
            default:
                s.y -= s.speed;
                if (s.y < -10) {
                    s.y = H + 10;
                    s.x = rand(0, W);
                }
                break;
        }
    }
}

function renderBackgroundStars(sizeScale = 1, alphaScale = 1) {
    const sc = theme.starCol;
    for (const s of stars) {
        ctx.globalAlpha = s.brightness * alphaScale;
        ctx.fillStyle = `rgb(${sc[0]},${sc[1]},${sc[2]})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * sizeScale, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function renderLaserGrid() {
    ctx.strokeStyle = theme.grid;
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
    }
    renderBackgroundStars(1, 1);
}

function renderHeatHaze() {
    for (let i = 0; i < 6; i++) {
        const x = (i + 0.5) * (W / 6);
        const width = 160 + Math.sin(frameCount * 0.03 + i) * 24;
        const grd = ctx.createLinearGradient(x, H * 0.15, x, H);
        grd.addColorStop(0, 'rgba(255,180,80,0)');
        grd.addColorStop(1, 'rgba(255,140,40,0.12)');
        ctx.fillStyle = grd;
        ctx.fillRect(x - width / 2, H * 0.1, width, H * 0.9);
    }

    ctx.strokeStyle = theme.grid;
    ctx.lineWidth = 1;
    for (let y = 0; y < H; y += 56) {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 40) {
            const offset = Math.sin((frameCount * 0.035) + x * 0.01 + y * 0.04) * 4;
            if (x === 0) ctx.moveTo(x, y + offset);
            else ctx.lineTo(x, y + offset);
        }
        ctx.stroke();
    }

    renderBackgroundStars(1, 0.8);
}

function renderPaperWash() {
    const washes = [
        { x: W * 0.24, y: H * 0.22, r: 260, color: `rgba(${hexToRgb(theme.text2)},0.08)` },
        { x: W * 0.72, y: H * 0.30, r: 220, color: `rgba(${hexToRgb(theme.text3)},0.07)` },
        { x: W * 0.46, y: H * 0.72, r: 300, color: `rgba(${hexToRgb(theme.accent)},0.05)` },
    ];

    for (const wash of washes) {
        const grd = ctx.createRadialGradient(wash.x, wash.y, 0, wash.x, wash.y, wash.r);
        grd.addColorStop(0, wash.color);
        grd.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(wash.x, wash.y, wash.r, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.strokeStyle = theme.grid;
    ctx.lineWidth = 1;
    for (let x = 20; x < W; x += 28) {
        ctx.globalAlpha = 0.28;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + Math.sin(x * 0.02) * 8, H);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

function renderRainField() {
    ctx.strokeStyle = theme.grid;
    ctx.lineWidth = 1.2;
    for (const s of stars) {
        ctx.globalAlpha = 0.25 + s.brightness * 0.45;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + 12, s.y - 28);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    for (let x = 0; x < W; x += 120) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 40, H);
        ctx.stroke();
    }
}

function renderBalloonParade() {
    const sun = ctx.createRadialGradient(W * 0.78, H * 0.18, 0, W * 0.78, H * 0.18, 240);
    sun.addColorStop(0, 'rgba(255,248,205,0.2)');
    sun.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sun;
    ctx.beginPath();
    ctx.arc(W * 0.78, H * 0.18, 240, 0, Math.PI * 2);
    ctx.fill();

    const balloons = [
        { x: W * 0.16, y: H * 0.26, r: 72, color: theme.text2 },
        { x: W * 0.34, y: H * 0.18, r: 56, color: theme.text3 },
        { x: W * 0.56, y: H * 0.28, r: 64, color: theme.accent },
    ];
    for (const balloon of balloons) {
        const grd = ctx.createRadialGradient(balloon.x - 12, balloon.y - 16, 0, balloon.x, balloon.y, balloon.r);
        grd.addColorStop(0, `rgba(${hexToRgb(balloon.color)},0.26)`);
        grd.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(balloon.x, balloon.y, balloon.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(${hexToRgb(balloon.color)},0.24)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(balloon.x, balloon.y + balloon.r * 0.78);
        ctx.quadraticCurveTo(balloon.x - 18, balloon.y + balloon.r + 44, balloon.x + 12, balloon.y + balloon.r + 120);
        ctx.stroke();
    }

    ctx.strokeStyle = `rgba(${hexToRgb(theme.text1)},0.18)`;
    ctx.lineWidth = 4;
    for (let y = H * 0.14; y < H * 0.46; y += 74) {
        ctx.beginPath();
        for (let x = -40; x <= W + 40; x += 28) {
            const offset = Math.sin(frameCount * 0.04 + x * 0.01 + y * 0.03) * 12;
            if (x <= -40) ctx.moveTo(x, y + offset);
            else ctx.lineTo(x, y + offset);
        }
        ctx.stroke();
    }

    renderBackgroundStars(1, 0.6);
}

function renderPrismLagoon() {
    const lagoon = ctx.createLinearGradient(0, H * 0.3, 0, H);
    lagoon.addColorStop(0, 'rgba(255,255,255,0)');
    lagoon.addColorStop(1, 'rgba(255,255,255,0.1)');
    ctx.fillStyle = lagoon;
    ctx.fillRect(0, H * 0.3, W, H * 0.7);

    for (let y = H * 0.14; y < H * 0.72; y += 74) {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 30) {
            const offset = Math.sin(frameCount * 0.035 + x * 0.012 + y * 0.025) * 14;
            if (x === 0) ctx.moveTo(x, y + offset);
            else ctx.lineTo(x, y + offset);
        }
        ctx.strokeStyle = `rgba(${hexToRgb(theme.accent)},0.12)`;
        ctx.lineWidth = 14;
        ctx.stroke();
    }

    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    [0.14, 0.36, 0.58, 0.82].forEach((ratio, index) => {
        const prismW = 44 + index * 12;
        const prismH = 180 + (index % 2) * 46;
        const x = W * ratio - prismW / 2;
        const y = H * 0.12 + (index % 3) * 22;
        ctx.save();
        ctx.translate(x + prismW / 2, y + prismH / 2);
        ctx.rotate(index % 2 === 0 ? -0.12 : 0.12);
        ctx.fillRect(-prismW / 2, -prismH / 2, prismW, prismH);
        ctx.restore();
    });

    renderBackgroundStars(1.15, 0.58);
}

function renderDioramaShelf() {
    const shelf = ctx.createLinearGradient(0, H * 0.42, 0, H);
    shelf.addColorStop(0, 'rgba(255,220,160,0)');
    shelf.addColorStop(1, 'rgba(255,212,138,0.12)');
    ctx.fillStyle = shelf;
    ctx.fillRect(0, H * 0.42, W, H * 0.58);

    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath();
    ctx.moveTo(W * 0.15, H * 0.24);
    ctx.lineTo(W * 0.85, H * 0.18);
    ctx.lineTo(W * 0.92, H * 0.74);
    ctx.lineTo(W * 0.08, H * 0.78);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,244,220,0.16)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
        const inset = i * 22;
        ctx.beginPath();
        ctx.moveTo(W * 0.18 + inset, H * 0.28 + inset * 0.35);
        ctx.lineTo(W * 0.82 - inset, H * 0.23 + inset * 0.28);
        ctx.lineTo(W * 0.88 - inset * 0.85, H * 0.68 - inset * 0.1);
        ctx.lineTo(W * 0.12 + inset * 0.85, H * 0.73 - inset * 0.06);
        ctx.closePath();
        ctx.stroke();
    }

    renderBackgroundStars(0.9, 0.6);
}

function renderBioPulse() {
    for (let i = 0; i < 4; i++) {
        const cx = W * (0.2 + i * 0.22);
        const cy = H * (0.22 + (i % 2) * 0.16);
        const radius = 120 + Math.sin(frameCount * 0.03 + i) * 18;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grd.addColorStop(0, `rgba(${hexToRgb(theme.accent)},0.12)`);
        grd.addColorStop(0.55, `rgba(${hexToRgb(theme.text3)},0.06)`);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.strokeStyle = `rgba(${hexToRgb(theme.accent)},0.16)`;
    ctx.lineWidth = 2.4;
    for (let y = 80; y < H; y += 110) {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 24) {
            const offset = Math.sin(frameCount * 0.05 + x * 0.018 + y * 0.014) * 14;
            if (x === 0) ctx.moveTo(x, y + offset);
            else ctx.lineTo(x, y + offset);
        }
        ctx.stroke();
    }

    renderBackgroundStars(1.1, 0.7);
}

function renderMonolithVault() {
    const floor = ctx.createLinearGradient(0, H * 0.46, 0, H);
    floor.addColorStop(0, 'rgba(255,255,255,0)');
    floor.addColorStop(1, 'rgba(255,255,255,0.08)');
    ctx.fillStyle = floor;
    ctx.fillRect(0, H * 0.46, W, H * 0.54);

    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    [0.16, 0.38, 0.62, 0.82].forEach((xRatio, index) => {
        const slabW = 70 + index * 24;
        const slabH = 300 + index * 36;
        const x = W * xRatio - slabW / 2;
        const y = H * 0.14 + (index % 2) * 26;
        ctx.fillRect(x, y, slabW, slabH);
        ctx.fillStyle = 'rgba(255,255,255,0.07)';
        ctx.fillRect(x, y, slabW, 10);
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
    });

    ctx.strokeStyle = theme.grid;
    ctx.lineWidth = 1.2;
    for (let i = 0; i <= 11; i++) {
        const x = i / 11;
        ctx.beginPath();
        ctx.moveTo(W * x, H);
        ctx.lineTo(W * 0.5 + (x - 0.5) * 180, H * 0.5);
        ctx.stroke();
    }

    renderBackgroundStars(0.85, 0.5);
}

function renderThemeOverlay() {
    switch (theme.overlayMode) {
        case 'scanline':
            ctx.strokeStyle = 'rgba(255,255,255,0.04)';
            ctx.lineWidth = 1;
            for (let y = 0; y < H; y += 4) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(W, y);
                ctx.stroke();
            }
            break;
        case 'ash':
            ctx.fillStyle = 'rgba(255,210,170,0.1)';
            for (let i = 0; i < stars.length; i += 2) {
                const s = stars[i];
                ctx.globalAlpha = s.brightness * 0.35;
                ctx.fillRect(s.x, s.y, 2, 2);
            }
            ctx.globalAlpha = 1;
            break;
        case 'petalFall':
            for (let i = 0; i < stars.length; i += 2) {
                const s = stars[i];
                const rot = Math.sin(frameCount * 0.04 + s.x * 0.02);
                ctx.save();
                ctx.translate(s.x, s.y);
                ctx.rotate(rot);
                ctx.fillStyle = `rgba(${hexToRgb(theme.accent)},0.28)`;
                ctx.beginPath();
                ctx.ellipse(0, 0, 5, 2.6, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            break;
        case 'lightningFlash': {
            const flash = Math.max(0, Math.sin(frameCount * 0.11) - 0.94) * 2.4;
            if (flash > 0.01) {
                ctx.fillStyle = `rgba(200,220,255,${flash * 0.22})`;
                ctx.fillRect(0, 0, W, H);
                ctx.strokeStyle = `rgba(255,255,255,${flash * 0.55})`;
                ctx.lineWidth = 2;
                [W * 0.18, W * 0.76].forEach(originX => {
                    ctx.beginPath();
                    ctx.moveTo(originX, 0);
                    for (let y = 0; y < H * 0.45; y += 36) {
                        const x = originX + Math.sin(frameCount * 0.2 + y * 0.04) * 18;
                        ctx.lineTo(x, y + 36);
                    }
                    ctx.stroke();
                });
            }
            break;
        }
        case 'confettiDrift':
            for (let i = 0; i < stars.length; i += 2) {
                const s = stars[i];
                const colors = [theme.text2, theme.text3, theme.accent];
                ctx.save();
                ctx.translate(s.x, s.y);
                ctx.rotate(frameCount * 0.02 + i);
                ctx.fillStyle = `rgba(${hexToRgb(colors[i % colors.length])},0.34)`;
                ctx.fillRect(-3.2, -1.1, 6.4, 2.2);
                ctx.restore();
            }
            break;
        case 'sunGlint':
            for (let i = 0; i < 4; i++) {
                const x = (frameCount * 3 + i * 280) % (W + 220) - 110;
                const grd = ctx.createLinearGradient(x, 0, x + 140, H);
                grd.addColorStop(0, 'rgba(255,255,255,0)');
                grd.addColorStop(0.5, `rgba(${hexToRgb(theme.text1)},0.08)`);
                grd.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = grd;
                ctx.fillRect(x - 40, 0, 160, H);
            }
            break;
        case 'toyDust':
            ctx.fillStyle = `rgba(${hexToRgb(theme.text1)},0.08)`;
            for (let i = 0; i < stars.length; i += 2) {
                const s = stars[i];
                ctx.save();
                ctx.translate(s.x, s.y);
                ctx.rotate(frameCount * 0.01 + i);
                ctx.fillRect(-2, -0.5, 4, 1);
                ctx.fillRect(-0.5, -2, 1, 4);
                ctx.restore();
            }
            break;
        case 'sporeVeil':
            for (let i = 0; i < stars.length; i += 2) {
                const s = stars[i];
                const radius = 4 + (i % 3) * 2;
                ctx.globalAlpha = 0.06 + s.brightness * 0.12;
                ctx.fillStyle = `rgba(${hexToRgb(theme.accent)},0.8)`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            break;
        case 'slabShadow':
            ctx.fillStyle = 'rgba(0,0,0,0.22)';
            ctx.beginPath();
            ctx.moveTo(0, H * 0.52);
            ctx.lineTo(W * 0.34, H * 0.44);
            ctx.lineTo(W, H * 0.58);
            ctx.lineTo(W, H);
            ctx.lineTo(0, H);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.08)';
            for (let y = 0; y < H; y += 48) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(W, y + 20);
                ctx.stroke();
            }
            break;
    }
}

function renderBackground() {
    const grd = ctx.createLinearGradient(0, 0, 0, H);
    grd.addColorStop(0, theme.bg1);
    grd.addColorStop(1, theme.bg2);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    switch (theme.backgroundMode) {
        case 'laserGrid':
            renderLaserGrid();
            break;
        case 'heatHaze':
            renderHeatHaze();
            break;
        case 'paperWash':
            renderPaperWash();
            break;
        case 'rainField':
            renderRainField();
            break;
        case 'balloonParade':
            renderBalloonParade();
            break;
        case 'prismLagoon':
            renderPrismLagoon();
            break;
        case 'dioramaShelf':
            renderDioramaShelf();
            break;
        case 'bioPulse':
            renderBioPulse();
            break;
        case 'monolithVault':
            renderMonolithVault();
            break;
    }
    renderThemeOverlay();
}

// ═══════════════════════════════════════════════════════════════
// LEVEL DEFINITIONS  (38 columns)
// ═══════════════════════════════════════════════════════════════
// Helper to repeat a pattern across 38 cols
function R38(pattern) {
    const out = [];
    for (let i = 0; i < 38; i++) out.push(pattern[i % pattern.length]);
    return out;
}
function S38(n) { return Array(38).fill(n); }  // solid row
function Z38()  { return Array(38).fill(0); }  // empty row

const LEVELS = [
    // 1: Welcome Wall — 20×38 = 760 bricks, all 1HP
    { speed: 1, rows: [
        S38(1), S38(1), S38(1), S38(1), S38(1),
        S38(1), S38(1), S38(1), S38(1), S38(1),
        S38(1), S38(1), S38(1), S38(1), S38(1),
        S38(1), S38(1), S38(1), S38(1), S38(1),
    ]},
    // 2: Pyramid — wide triangle, 28 rows
    { speed: 1.05, rows: (() => {
        const rows = [];
        for (let step = 1; step <= 28; step++) {
            const w = Math.min(2 + (step - 1) * 2, 38);
            const pad = Math.floor((38 - w) / 2);
            const row = Array(38).fill(0);
            for (let c = pad; c < pad + w && c < 38; c++) row[c] = step > 20 ? 2 : 1;
            rows.push(row);
        }
        return rows;
    })()},
    // 3: Mega Wall — 30×38 = 1140 bricks
    { speed: 1.1, rows: [
        S38(1), S38(1), S38(1), S38(1), S38(1),
        S38(1), S38(1), S38(1), S38(1), S38(1),
        S38(1), S38(1), S38(1), S38(1), S38(1),
        S38(1), S38(1), S38(1), S38(1), S38(1),
        S38(1), S38(1), S38(1), S38(1), S38(1),
        S38(1), S38(1), S38(1), S38(1), S38(1),
    ]},
    // 4: Diamond 2HP core — 30 rows
    { speed: 1.15, rows: (() => {
        const rows = [];
        const cx = 19;
        for (let r = 0; r < 30; r++) {
            const row = Array(38).fill(0);
            const half = r <= 15 ? Math.min(r * 2, 18) : Math.min((29 - r) * 2, 18);
            for (let c = cx - half; c <= cx + half; c++) {
                if (c >= 0 && c < 38) {
                    row[c] = Math.abs(c - cx) <= half - 4 && r >= 5 && r <= 24 ? 2 : 1;
                }
            }
            rows.push(row);
        }
        return rows;
    })()},
    // 5: Stripe Frenzy — 36 rows
    { speed: 1.12, rows: [
        S38(1), Z38(), S38(2), Z38(), S38(1), Z38(),
        S38(1), Z38(), S38(2), Z38(), S38(1), Z38(),
        S38(2), Z38(), S38(1), Z38(), S38(2), Z38(),
        S38(1), Z38(), S38(2), Z38(), S38(1), Z38(),
        S38(2), Z38(), S38(1), Z38(), S38(2), Z38(),
        S38(1), Z38(), S38(2), Z38(), S38(1), Z38(),
    ]},
    // 6: Checkerboard 2HP — 34 rows
    { speed: 1.2, rows: (() => {
        const rows = [];
        for (let r = 0; r < 34; r++) {
            rows.push(Array.from({length: 38}, (_, c) => ((r + c) % 2 === 0) ? 2 : 0));
        }
        return rows;
    })()},
    // 7: Invader — tall 38-col alien, 28 rows
    { speed: 1.25, rows: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
        S38(1),
        S38(1),
        S38(2),
        S38(1),
        S38(2),
        S38(1),
        [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
        [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
        [0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
        S38(1), S38(2), S38(1),
        S38(2), S38(1), S38(2),
        S38(1), S38(2),
    ]},
    // 8: Heart — centered 38-col, 32 rows
    { speed: 1.3, rows: (() => {
        const rows = [];
        const cx = 19;
        const halfWidths = [0,0,5,7,9,10,11,12,13,14,15,16,16,17,17,17,16,16,15,14,13,12,11,10,8,6,5,4,3,2,1,0];
        const humpSep = 8;
        for (let r = 0; r < 32; r++) {
            const row = Array(38).fill(0);
            const hw = halfWidths[r];
            if (hw === 0) { rows.push(row); continue; }
            if (r < 7) {
                const lc = cx - humpSep, rc = cx + humpSep;
                for (let c = lc - hw; c <= lc + hw; c++) if (c >= 0 && c < 38) row[c] = 3;
                for (let c = rc - hw; c <= rc + hw; c++) if (c >= 0 && c < 38) row[c] = 3;
            } else {
                for (let c = cx - hw; c <= cx + hw; c++) if (c >= 0 && c < 38) row[c] = r < 16 ? 3 : 2;
            }
            rows.push(row);
        }
        return rows;
    })()},
    // 9: Fortress — nested rings, 39 rows
    { speed: 1.38, rows: [
        S38(3),
        [3,...Array(36).fill(0),3],
        [3,0,...Array(34).fill(2),0,3],
        [3,0,2,...Array(32).fill(0),2,0,3],
        [3,0,2,0,...Array(30).fill(1),0,2,0,3],
        [3,0,2,0,1,...Array(28).fill(0),1,0,2,0,3],
        [3,0,2,0,1,0,...Array(26).fill(3),0,1,0,2,0,3],
        [3,0,2,0,1,0,3,...Array(24).fill(0),3,0,1,0,2,0,3],
        [3,0,2,0,1,0,3,...Array(24).fill(0),3,0,1,0,2,0,3],
        [3,0,2,0,1,0,...Array(26).fill(3),0,1,0,2,0,3],
        [3,0,2,0,1,...Array(28).fill(0),1,0,2,0,3],
        [3,0,2,0,...Array(30).fill(1),0,2,0,3],
        [3,0,2,...Array(32).fill(0),2,0,3],
        [3,0,...Array(34).fill(2),0,3],
        [3,...Array(36).fill(0),3],
        S38(3),
        Z38(),
        S38(1), S38(2), S38(3), S38(2), S38(1),
        Z38(),
        S38(2), S38(3), S38(2),
        S38(3),
        Z38(),
        S38(1), S38(2), S38(3), S38(2), S38(1),
        Z38(),
        S38(3), S38(2), S38(3), S38(2),
        S38(3),
    ]},
    // 10: ULTIMATE WALL — 38×38 = max density
    { speed: 1.45, rows: [
        R38([2,1]), R38([1,2]),
        R38([3,1]), R38([1,3]),
        S38(2), S38(1), S38(3), S38(1), S38(2),
        R38([1,2,3]), R38([3,2,1]), R38([2,3,1]),
        S38(1), S38(2), S38(3), S38(2), S38(1),
        R38([3,1]), R38([1,3]),
        S38(2), S38(1), S38(3),
        R38([2,1]), R38([1,2]),
        S38(3), S38(2), S38(3),
        R38([3,1,2]), R38([2,3,1]),
        S38(1), S38(3),
        R38([2,3]), R38([3,2]),
        S38(2), S38(1), S38(3), S38(2),
        S38(3), S38(1),
    ]},
];

function brickColor(br) {
    const hue = theme.brickHue(br.row);
    const lightness = theme.brickLight - 10 + (br.hp / br.maxHp) * 18;
    return hsl(hue, theme.brickSat, lightness);
}

// ═══════════════════════════════════════════════════════════════
// RANKING SYSTEM
// ═══════════════════════════════════════════════════════════════
let rankingStorageNotice = '';

function setRankingStorageNotice(error) {
    if (error === 'invalid_data') rankingStorageNotice = 'Ranking data was reset.';
    else if (error === 'unavailable') rankingStorageNotice = 'Ranking storage is unavailable in this browser.';
    else rankingStorageNotice = '';
}

function loadRanking() {
    const { ranking, error } = loadRankingStore(globalThis.localStorage, RANKING_KEY);
    setRankingStorageNotice(error);
    return ranking;
}
function saveRanking(ranking) {
    const { error } = saveRankingStore(globalThis.localStorage, RANKING_KEY, ranking);
    setRankingStorageNotice(error);
}
function addRankingEntry(name, sc, lvl) {
    const ranking = loadRanking();
    ranking.push({ name, score: sc, level: lvl, date: new Date().toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) });
    const nextRanking = trimRankingEntries(ranking, MAX_RANKING);
    saveRanking(nextRanking); return nextRanking;
}
function isHighScore(sc) {
    const r = loadRanking();
    return r.length < MAX_RANKING || sc > (r[r.length - 1]?.score ?? 0);
}

// ═══════════════════════════════════════════════════════════════
// GAME STATE
// ═══════════════════════════════════════════════════════════════
let state = 'MENU';
let score = 0, lives = 0, level = 0;
let combo = 0, lastHitTime = 0, maxCombo = 0;
let balls = [], bricks = [], items = [], bullets = [];
let brickRows = [];
let stageIntroBrickCount = 0;
let stageIntroBrickSnapshot = null;
let brickLayerCanvas = null;
let brickLayerCtx = null;
let bulletsLeft = BULLETS_PER_STAGE;
let paddle = { x: W / 2, w: PADDLE_BASE_W, targetW: PADDLE_BASE_W };
let mouseX = W / 2, mouseY = H / 2;
let shake = { x: 0, y: 0, intensity: 0, kickX: 0, kickY: 0 };
let effects = { widePaddle: 0, fireBall: 0, slowBall: 0, megaBall: 0 };
let stageTimer = 0;
let nameInput = '';
let frameCount = 0;
let comboDisplay = { value: 0, scale: 1, alpha: 0, label: '' };
let depthPulse = 0;

// ═══════════════════════════════════════════════════════════════
// BALL MANAGEMENT
// ═══════════════════════════════════════════════════════════════
function getLevelDef(idx) {
    const raw = idx < LEVELS.length ? LEVELS[idx] : generateEndlessLevel(idx);
    return { speed: raw.speed, rows: densifyStageRows(raw.rows, idx) };
}

function getLevelSpeed(idx) {
    if (idx < LEVELS.length) return LEVELS[idx].speed;
    return LEVELS[LEVELS.length - 1].speed + (idx - 10) * 0.03;
}

function currentBallSpeed() {
    let speed = BALL_BASE_SPEED * getLevelSpeed(level);
    if (effects.slowBall > 0) speed *= 0.5;
    return speed;
}

function createBall(x, y, angle, speed) {
    return {
        x: x ?? W / 2,
        y: y ?? PADDLE_Y - BALL_R - 2,
        vx: Math.sin(angle ?? rand(-0.3, 0.3)) * (speed ?? currentBallSpeed()),
        vy: -Math.cos(angle ?? rand(-0.3, 0.3)) * (speed ?? currentBallSpeed()),
        r: BALL_R,
        trail: [],
    };
}

function spawnInitialBall() {
    balls = [createBall()];
}

// ═══════════════════════════════════════════════════════════════
// LEVEL LOADING
// ═══════════════════════════════════════════════════════════════
function generateEndlessLevel(stageIdx) {
    const base = LEVELS[LEVELS.length - 1];
    const maxHp = Math.min(3 + Math.floor((stageIdx - 10) / 3), 8);
    const rows = base.rows.map(row => row.map(v => v > 0 ? randInt(1, maxHp) : 0));
    return { speed: base.speed + (stageIdx - 10) * 0.03, rows };
}

function createStageLayerCanvas() {
    const layer = document.createElement('canvas');
    layer.width = W;
    layer.height = H;
    return layer;
}

function ensureBrickLayerCanvas() {
    if (brickLayerCanvas && brickLayerCtx) return;
    brickLayerCanvas = createStageLayerCanvas();
    brickLayerCtx = brickLayerCanvas.getContext('2d');
}

function rebuildBrickLayer() {
    if (threeGameplayRenderer && threeGameplayRenderer.isReady()) return;
    ensureBrickLayerCanvas();
    brickLayerCtx.clearRect(0, 0, W, H);
    for (const br of bricks) {
        if (!br.alive) continue;
        renderBrickBody(brickLayerCtx, br);
    }
}

function syncBrickLayerBrick(br) {
    if (!br) return;
    if (threeGameplayRenderer && threeGameplayRenderer.isReady()) return;
    rebuildBrickLayer();
}

function buildStageIntroSnapshot() {
    if (threeGameplayRenderer && threeGameplayRenderer.isReady()) return null;
    const layer = createStageLayerCanvas();
    const layerCtx = layer.getContext('2d');
    if (brickLayerCanvas) layerCtx.drawImage(brickLayerCanvas, 0, 0);
    else renderBricks(layerCtx);
    return layer;
}

function loadLevel(idx) {
    const def = getLevelDef(idx);
    bricks = [];
    brickRows = Array.from({ length: def.rows.length }, () => []);
    stageIntroBrickCount = countLevelBricks(def.rows);
    for (let r = 0; r < def.rows.length; r++) {
        for (let c = 0; c < def.rows[r].length; c++) {
            const hp = def.rows[r][c];
            if (hp <= 0) continue;
            const brick = {
                x: BRICK_OFFSET_LEFT + c * (BRICK_W + BRICK_PAD),
                y: BRICK_OFFSET_TOP + r * (BRICK_H + BRICK_PAD),
                w: BRICK_W, h: BRICK_H,
                hp, maxHp: hp, row: r,
                alive: true, flashTimer: 0,
            };
            bricks.push(brick);
            brickRows[r].push(brick);
        }
    }
    items = [];
    bullets = [];
    impactBursts = [];
    impactSlices = [];
    bulletsLeft = getStageBulletCapacity(idx, BULLETS_PER_STAGE);
    effects = { widePaddle: 0, fireBall: 0, slowBall: 0, megaBall: 0 };
    paddle.w = PADDLE_BASE_W;
    paddle.targetW = PADDLE_BASE_W;
    paddle.x = W / 2;
    combo = 0;
    depthPulse = 0;
    shake = { x: 0, y: 0, intensity: 0, kickX: 0, kickY: 0 };
    spawnInitialBall();
    rebuildBrickLayer();
    stageIntroBrickSnapshot = buildStageIntroSnapshot();
}

// ═══════════════════════════════════════════════════════════════
// INPUT HANDLING
// ═══════════════════════════════════════════════════════════════
canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) * (W / rect.width);
    mouseY = (e.clientY - rect.top) * (H / rect.height);
});

canvas.addEventListener('click', (e) => {
    ensureAudio();
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) * (W / rect.width);
    mouseY = (e.clientY - rect.top) * (H / rect.height);

    if (state === 'MENU') {
        for (const btn of themeButtons) {
            if (hitTest(btn)) { setTheme(btn.key); return; }
        }
        if (startButton && hitTest(startButton)) { startGame(); return; }
        if (rankingButton && hitTest(rankingButton)) { state = 'RANKING'; return; }
    } else if (state === 'PAUSED') {
        if (pauseButtons.resume && hitTest(pauseButtons.resume)) { state = 'PLAYING'; }
        else if (pauseButtons.quit && hitTest(pauseButtons.quit)) { quitGame(); }
    } else if (state === 'PLAYING') {
        fireBullet();
    } else if (state === 'GAME_OVER') {
        proceedFromGameOver();
    } else if (state === 'RANKING') {
        state = 'MENU';
    }
});

function hitTest(btn) {
    return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
           mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

function proceedFromGameOver() {
    if (isHighScore(score)) { state = 'NAME_INPUT'; nameInput = ''; }
    else state = 'RANKING';
}

function quitGame() {
    playSound('gameOver');
    state = 'GAME_OVER';
}

document.addEventListener('keydown', e => {
    if (state === 'MENU') {
        if (e.key === 'Enter' || e.key === ' ') { ensureAudio(); startGame(); }
        return;
    }
    if (state === 'PLAYING') {
        if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') { state = 'PAUSED'; return; }
        if (e.key === 'q' || e.key === 'Q') { quitGame(); return; }
        if (e.key === ' ') { e.preventDefault(); fireBullet(); return; }
    }
    if (state === 'PAUSED') {
        if (e.key === 'Escape' || e.key === 'p' || e.key === 'P' || e.key === ' ') { state = 'PLAYING'; return; }
        if (e.key === 'q' || e.key === 'Q') { quitGame(); return; }
    }
    if (state === 'GAME_OVER') {
        if (e.key === 'Enter' || e.key === ' ') { proceedFromGameOver(); return; }
    }
    if (state === 'RANKING') {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') { state = 'MENU'; return; }
    }
    if (state === 'NAME_INPUT') {
        if (e.key === 'Enter' && nameInput.length > 0) {
            addRankingEntry(nameInput, score, level + 1);
            state = 'RANKING';
        } else if (e.key === 'Backspace') {
            nameInput = nameInput.slice(0, -1);
        } else if (e.key.length === 1 && nameInput.length < 10) {
            nameInput += e.key;
        }
    }
});

// ═══════════════════════════════════════════════════════════════
// COLLISION DETECTION
// ═══════════════════════════════════════════════════════════════
function ballRectCollision(ball, rect) {
    const cx = clamp(ball.x, rect.x, rect.x + rect.w);
    const cy = clamp(ball.y, rect.y, rect.y + rect.h);
    let dx = ball.x - cx, dy = ball.y - cy;
    const d = Math.sqrt(dx * dx + dy * dy);
    const effectiveR = ball.megaR || ball.r;
    if (d >= effectiveR) return null;
    if (d === 0) {
        const l = ball.x - rect.x, r2 = rect.x + rect.w - ball.x;
        const t = ball.y - rect.y, b = rect.y + rect.h - ball.y;
        const m = Math.min(l, r2, t, b);
        if (m === t) { dx = 0; dy = -1; } else if (m === b) { dx = 0; dy = 1; }
        else if (m === l) { dx = -1; dy = 0; } else { dx = 1; dy = 0; }
        return { nx: dx, ny: dy, overlap: effectiveR };
    }
    return { nx: dx / d, ny: dy / d, overlap: effectiveR - d };
}

function reflectBall(ball, nx, ny) {
    const dot = ball.vx * nx + ball.vy * ny;
    ball.vx -= 2 * dot * nx;
    ball.vy -= 2 * dot * ny;
}

// ═══════════════════════════════════════════════════════════════
// ITEM EFFECTS
// ═══════════════════════════════════════════════════════════════
function tryDropItem(x, y) {
    if (Math.random() > ITEM_DROP_CHANCE) return;
    let r = Math.random() * TOTAL_ITEM_WEIGHT, acc = 0;
    for (const type of ITEM_TYPES) {
        acc += type.weight;
        if (r < acc) {
            const color = theme.itemColors[type.id] || '#fff';
            items.push({ x, y, type, color, vy: ITEM_FALL_SPEED, glow: 0 });
            return;
        }
    }
}

function destroyBrick(br, scoreMultiplier = 1) {
    if (!br.alive) return;
    br.alive = false; br.hp = 0;
    const bx = br.x + br.w / 2, by = br.y + br.h / 2;
    syncBrickLayerBrick(br);
    applyBrickHitFeedback(br, { destroyed: true });
    const pts = Math.floor(getBrickScore(br.maxHp) * scoreMultiplier);
    score += pts;
    addFloatingText(bx, by, `+${pts}`, theme.text3);
    // Items can drop even from ability-triggered destructions
    tryDropItem(bx, by);
}

function fireBullet() {
    if (bulletsLeft <= 0) return;
    bulletsLeft--;
    playSound('bullet');
    // Two bullets from paddle edges for wider coverage
    bullets.push({ x: paddle.x - 12, y: PADDLE_Y - 2, vy: -BULLET_SPEED });
    bullets.push({ x: paddle.x + 12, y: PADDLE_Y - 2, vy: -BULLET_SPEED });
}

function applyItem(item) {
    playSound('item');
    switch (item.type.id) {
        case 'MULTI_BALL': {
            playSound('multiBall');
            shake.intensity = 6;
            const src = pickMultiBallSource(balls, { x: W / 2, y: H / 2 });
            const count = Math.min(MULTI_BALL_COUNT, MAX_BALLS - balls.length);
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 1.5 - Math.PI * 0.75;
                balls.push(createBall(src.x, src.y, angle));
            }
            break;
        }
        case 'WIDE_PADDLE':
            effects.widePaddle = EFFECT_DURATION_MS;
            paddle.targetW = Math.min(paddle.targetW * 1.5, W * 0.66);
            break;
        case 'FIRE_BALL':
            effects.fireBall = EFFECT_DURATION_MS;
            break;
        case 'MEGA_BALL':
            playSound('megaBall');
            effects.megaBall = MEGA_BALL_DURATION_MS;
            shake.intensity = 4;
            break;
    }
}

// ═══════════════════════════════════════════════════════════════
// GAME LOGIC
// ═══════════════════════════════════════════════════════════════
function startGame() {
    score = 0; lives = START_LIVES; level = 0;
    maxCombo = 0; combo = 0; particles = []; floatingTexts = [];
    impactBursts = [];
    impactSlices = [];
    depthPulse = 0;
    shake = { x: 0, y: 0, intensity: 0, kickX: 0, kickY: 0 };
    state = 'STAGE_INTRO'; stageTimer = 90;
    loadLevel(0);
}
function nextLevel() {
    level++;
    state = 'STAGE_INTRO'; stageTimer = 90;
    loadLevel(level);
}

const DT_MS = 1000 / 60;

function update() {
    frameCount++;
    updateStars();
    updateParticles();
    impactBursts = advanceImpactBursts(impactBursts);
    impactSlices = advanceImpactSlices(impactSlices);
    updateFloatingTexts();
    depthPulse *= 0.86;
    if (depthPulse < 0.002) depthPulse = 0;

    shake.kickX *= 0.7;
    shake.kickY *= 0.7;
    if (shake.intensity > 0.3) {
        shake.x = rand(-1, 1) * shake.intensity + shake.kickX;
        shake.y = rand(-1, 1) * shake.intensity + shake.kickY;
        shake.intensity *= 0.8;
    } else {
        shake.x = shake.kickX;
        shake.y = shake.kickY;
        shake.intensity = 0;
    }
    if (Math.abs(shake.x) < 0.05 && Math.abs(shake.y) < 0.05 && shake.intensity === 0) {
        shake.x = 0;
        shake.y = 0;
        shake.kickX = 0;
        shake.kickY = 0;
    }

    if (comboDisplay.alpha > 0) { comboDisplay.alpha *= 0.97; comboDisplay.scale = lerp(comboDisplay.scale, 1, 0.1); }

    if (state === 'STAGE_INTRO') { stageTimer--; if (stageTimer <= 0) state = 'PLAYING'; return; }
    if (state === 'STAGE_CLEAR') { stageTimer--; if (stageTimer <= 0) nextLevel(); return; }
    if (state !== 'PLAYING') return;

    // Effect timers
    for (const key of Object.keys(effects)) {
        if (effects[key] > 0) {
            effects[key] -= DT_MS;
            if (effects[key] <= 0) {
                effects[key] = 0;
                if (key === 'widePaddle') paddle.targetW = PADDLE_BASE_W;
            }
        }
    }

    // Paddle
    paddle.x = clamp(mouseX, paddle.w / 2, W - paddle.w / 2);
    paddle.w = lerp(paddle.w, paddle.targetW, 0.12);

    // Ball speed & mega size
    const speed = currentBallSpeed();
    const isMega = effects.megaBall > 0;
    const trailProfile = getTrailProfile(balls.length, isMega);

    for (let i = balls.length - 1; i >= 0; i--) {
        const b = balls[i];
        b.megaR = isMega ? BALL_R * MEGA_BALL_SCALE : 0;

        // Normalize speed
        const cur = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (cur > 0) { b.vx = (b.vx / cur) * speed; b.vy = (b.vy / cur) * speed; }

        // Prevent too-horizontal
        if (Math.abs(b.vy) < speed * 0.18) {
            b.vy = (b.vy >= 0 ? 1 : -1) * speed * 0.25;
            const s = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
            b.vx = (b.vx / s) * speed; b.vy = (b.vy / s) * speed;
        }

        // Trail
        b.trail.push({ x: b.x, y: b.y });
        if (b.trail.length > trailProfile.maxPoints) {
            b.trail.splice(0, b.trail.length - trailProfile.maxPoints);
        }

        b.x += b.vx; b.y += b.vy;
        const effectiveR = b.megaR || b.r;

        // Walls
        if (b.x - effectiveR < 0) { b.x = effectiveR; b.vx = Math.abs(b.vx); playSound('wall'); }
        if (b.x + effectiveR > W) { b.x = W - effectiveR; b.vx = -Math.abs(b.vx); playSound('wall'); }
        if (b.y - effectiveR < 0) { b.y = effectiveR; b.vy = Math.abs(b.vy); playSound('wall'); }

        // Paddle
        const pRect = { x: paddle.x - paddle.w / 2, y: PADDLE_Y, w: paddle.w, h: PADDLE_H };
        if (b.vy > 0) {
            const hit = ballRectCollision(b, pRect);
            if (hit) {
                const hitPos = (b.x - pRect.x) / paddle.w;
                const angle = (hitPos - 0.5) * Math.PI * 0.7;
                b.vx = Math.sin(angle) * speed;
                b.vy = -Math.cos(angle) * speed;
                b.y = PADDLE_Y - effectiveR;
                playSound('paddle');
            }
        }

        // Bricks
        const ballRows = getBrickRowRange({
            y: b.y,
            radius: effectiveR,
            brickOffsetTop: BRICK_OFFSET_TOP,
            brickHeight: BRICK_H,
            brickPad: BRICK_PAD,
            rowCount: brickRows.length,
        });

        for (let row = ballRows.start; row <= ballRows.end; row++) {
            for (const br of brickRows[row]) {
                if (!br.alive) continue;
                const hit = ballRectCollision(b, br);
                if (!hit) continue;

                const isFire = effects.fireBall > 0;
                if (!isFire) {
                    reflectBall(b, hit.nx, hit.ny);
                    b.x += hit.nx * hit.overlap;
                    b.y += hit.ny * hit.overlap;
                }

                br.hp--;
                br.flashTimer = BRICK_FLASH_FRAMES;
                playSound('brick');

                // Combo
                const now = performance.now();
                combo = (now - lastHitTime < COMBO_WINDOW_MS) ? combo + 1 : 1;
                lastHitTime = now;
                if (combo > maxCombo) maxCombo = combo;
                comboDisplay.value = combo;
                comboDisplay.scale = 1.8;
                comboDisplay.alpha = 1;
                comboDisplay.label = getComboLabel(combo);

                // Score
                const base = getBrickScore(br.maxHp);
                const comboMult = 1 + Math.min(combo, 30) * 0.3;
                const pts = Math.floor(base * comboMult);
                score += pts;
                addFloatingText(br.x + br.w / 2, br.y + br.h / 2, `+${pts}`, theme.text3);

                if (combo >= 5) shake.intensity = Math.max(shake.intensity, Math.min(combo * 0.25, 6));

                const destroyed = br.hp <= 0;
                applyBrickHitFeedback(br, { nx: hit.nx, ny: hit.ny, destroyed });

                if (destroyed) {
                    br.alive = false;
                    tryDropItem(br.x + br.w / 2, br.y + br.h / 2);
                }
                syncBrickLayerBrick(br);
                row = ballRows.end;
                break;
            }
        }

        // Lost
        if (b.y - effectiveR > H) balls.splice(i, 1);
    }

    // Items
    for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        it.y += it.vy;
        it.glow = (Math.sin(frameCount * 0.15) + 1) * 0.5;
        const dx = it.x - paddle.x, dy = it.y - PADDLE_Y;
        if (Math.abs(dx) < paddle.w / 2 + ITEM_SIZE / 2 && Math.abs(dy) < PADDLE_H + ITEM_SIZE / 2 && dy >= -ITEM_SIZE) {
            applyItem(it); items.splice(i, 1); continue;
        }
        if (it.y > H + ITEM_SIZE) items.splice(i, 1);
    }

    // Bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bl = bullets[i];
        bl.y += bl.vy;
        if (bl.y + BULLET_H < 0) { bullets.splice(i, 1); continue; }
        let hit = false;
        const bulletRows = getBrickRowRange({
            y: bl.y + BULLET_H / 2,
            radius: BULLET_H / 2,
            brickOffsetTop: BRICK_OFFSET_TOP,
            brickHeight: BRICK_H,
            brickPad: BRICK_PAD,
            rowCount: brickRows.length,
        });
        for (let row = bulletRows.start; row <= bulletRows.end; row++) {
            for (const br of brickRows[row]) {
                if (!br.alive) continue;
                if (bl.x > br.x - BULLET_W / 2 && bl.x < br.x + br.w + BULLET_W / 2 &&
                    bl.y > br.y && bl.y < br.y + br.h) {
                    br.hp--;
                    br.flashTimer = BRICK_FLASH_FRAMES;
                    playSound('brick');
                    const destroyed = br.hp <= 0;
                    applyBrickHitFeedback(br, { nx: 0, ny: -1, destroyed });
                    if (destroyed) {
                        const pts = getBrickScore(br.maxHp);
                        score += pts;
                        addFloatingText(br.x + br.w / 2, br.y + br.h / 2, `+${pts}`, theme.text3);
                        br.alive = false;
                        tryDropItem(br.x + br.w / 2, br.y + br.h / 2);
                    }
                    syncBrickLayerBrick(br);
                    hit = true;
                    row = bulletRows.end;
                    break;
                }
            }
        }
        if (hit) { bullets.splice(i, 1); }
    }

    const frameOutcome = resolveFrameOutcome({
        allBricksCleared: bricks.every(b => !b.alive),
        ballsRemaining: balls.length,
        lives,
    });

    if (frameOutcome.state === 'STAGE_CLEAR') {
        if (frameOutcome.clearItems) items = [];
        playSound('levelClear');
        spawnCelebration(140);
        state = 'STAGE_CLEAR'; stageTimer = 120;
        return;
    }

    if (frameOutcome.state === 'RESPAWN') {
        lives = frameOutcome.lives;
        combo = 0;
        playSound('die');
        spawnInitialBall();
    } else if (frameOutcome.state === 'GAME_OVER') {
        lives = frameOutcome.lives;
        combo = 0;
        playSound('gameOver');
        state = 'GAME_OVER';
        return;
    }

    for (const br of bricks) { if (br.flashTimer > 0) br.flashTimer--; }
}

// ═══════════════════════════════════════════════════════════════
// RENDERING
// ═══════════════════════════════════════════════════════════════
function getBrickFillStyle(targetCtx, br, color) {
    const hue = theme.brickHue(br.row);
    const grd = targetCtx.createLinearGradient(br.x, br.y, br.x, br.y + br.h);

    switch (theme.brickStyle) {
        case 'wireframe':
            grd.addColorStop(0, 'rgba(6,18,18,0.88)');
            grd.addColorStop(1, 'rgba(18,44,40,0.65)');
            break;
        case 'wetGlass':
            grd.addColorStop(0, 'rgba(255,255,255,0.35)');
            grd.addColorStop(0.22, color);
            grd.addColorStop(1, hsl(hue, theme.brickSat, theme.brickLight - 16));
            break;
        case 'forgedMetal':
            grd.addColorStop(0, hsl(hue, Math.min(theme.brickSat + 8, 100), theme.brickLight + 10));
            grd.addColorStop(0.45, color);
            grd.addColorStop(1, 'rgba(38,18,12,0.92)');
            break;
        case 'lacquerTile':
            grd.addColorStop(0, 'rgba(255,245,250,0.2)');
            grd.addColorStop(0.28, color);
            grd.addColorStop(1, hsl(hue, theme.brickSat, theme.brickLight - 12));
            break;
        case 'chargedPanel':
            grd.addColorStop(0, hsl(hue, theme.brickSat, theme.brickLight + 8));
            grd.addColorStop(0.5, color);
            grd.addColorStop(1, 'rgba(10,20,48,0.96)');
            break;
        case 'toyBlock':
            grd.addColorStop(0, 'rgba(255,255,255,0.35)');
            grd.addColorStop(0.18, hsl(hue, Math.min(theme.brickSat + 8, 100), theme.brickLight + 12));
            grd.addColorStop(1, hsl(hue, theme.brickSat, theme.brickLight - 8));
            break;
        case 'bioShell':
            grd.addColorStop(0, 'rgba(230,255,246,0.22)');
            grd.addColorStop(0.3, color);
            grd.addColorStop(1, hsl(hue, theme.brickSat, theme.brickLight - 18));
            break;
        case 'monolithSlab':
            grd.addColorStop(0, hsl(hue, theme.brickSat, theme.brickLight + 4));
            grd.addColorStop(0.55, color);
            grd.addColorStop(1, 'rgba(10,10,10,0.94)');
            break;
        default:
            grd.addColorStop(0, color);
            grd.addColorStop(1, hsl(hue, theme.brickSat, theme.brickLight - 18));
            break;
    }

    return grd;
}

function renderBrickDetails(targetCtx, br, color, r) {
    switch (theme.brickStyle) {
        case 'glass':
            targetCtx.strokeStyle = 'rgba(255,255,255,0.22)';
            targetCtx.lineWidth = 1;
            targetCtx.beginPath();
            targetCtx.moveTo(br.x + r + 2, br.y + 3);
            targetCtx.lineTo(br.x + br.w - r - 2, br.y + 3);
            targetCtx.stroke();
            break;
        case 'wireframe':
            targetCtx.strokeStyle = `rgba(${hexToRgb(theme.accent)},0.75)`;
            targetCtx.lineWidth = 1.1;
            targetCtx.beginPath();
            roundRect(targetCtx, br.x + 0.5, br.y + 0.5, br.w - 1, br.h - 1, 2);
            targetCtx.stroke();
            targetCtx.beginPath();
            targetCtx.moveTo(br.x + 5, br.y + br.h / 2);
            targetCtx.lineTo(br.x + br.w - 5, br.y + br.h / 2);
            targetCtx.stroke();
            break;
        case 'wetGlass':
            targetCtx.fillStyle = 'rgba(255,255,255,0.16)';
            targetCtx.fillRect(br.x + 4, br.y + 3, br.w * 0.18, br.h - 6);
            targetCtx.beginPath();
            targetCtx.arc(br.x + br.w - 7, br.y + 6, 2.2, 0, Math.PI * 2);
            targetCtx.fill();
            break;
        case 'forgedMetal':
            targetCtx.fillStyle = 'rgba(255,210,120,0.28)';
            targetCtx.fillRect(br.x + 2, br.y + 2, br.w - 4, 2);
            targetCtx.fillStyle = 'rgba(0,0,0,0.25)';
            targetCtx.fillRect(br.x + 2, br.y + br.h - 4, br.w - 4, 2);
            break;
        case 'lacquerTile':
            targetCtx.strokeStyle = 'rgba(255,244,248,0.42)';
            targetCtx.lineWidth = 1;
            targetCtx.beginPath();
            roundRect(targetCtx, br.x + 0.5, br.y + 0.5, br.w - 1, br.h - 1, 4);
            targetCtx.stroke();
            targetCtx.fillStyle = 'rgba(255,255,255,0.14)';
            targetCtx.fillRect(br.x + 3, br.y + 3, br.w * 0.45, 2);
            break;
        case 'chargedPanel':
            targetCtx.strokeStyle = `rgba(${hexToRgb(theme.accent)},0.42)`;
            targetCtx.lineWidth = 1;
            targetCtx.beginPath();
            roundRect(targetCtx, br.x + 0.5, br.y + 0.5, br.w - 1, br.h - 1, 4);
            targetCtx.stroke();
            targetCtx.beginPath();
            targetCtx.moveTo(br.x + 5, br.y + br.h - 4);
            targetCtx.lineTo(br.x + br.w - 6, br.y + 4);
            targetCtx.stroke();
            targetCtx.fillStyle = `rgba(${hexToRgb(theme.text3)},0.9)`;
            targetCtx.fillRect(br.x + br.w - 6, br.y + 4, 2, 2);
            break;
        case 'toyBlock':
            targetCtx.fillStyle = 'rgba(255,255,255,0.22)';
            targetCtx.fillRect(br.x + 4, br.y + 3, br.w - 8, 2);
            targetCtx.fillStyle = 'rgba(0,0,0,0.12)';
            targetCtx.fillRect(br.x + 5, br.y + br.h - 4, br.w - 10, 2);
            targetCtx.strokeStyle = 'rgba(255,255,255,0.3)';
            targetCtx.lineWidth = 1;
            targetCtx.beginPath();
            roundRect(targetCtx, br.x + 0.5, br.y + 0.5, br.w - 1, br.h - 1, 4);
            targetCtx.stroke();
            break;
        case 'bioShell':
            targetCtx.strokeStyle = 'rgba(220,255,240,0.22)';
            targetCtx.lineWidth = 1.2;
            targetCtx.beginPath();
            roundRect(targetCtx, br.x + 0.5, br.y + 0.5, br.w - 1, br.h - 1, 6);
            targetCtx.stroke();
            targetCtx.beginPath();
            targetCtx.moveTo(br.x + 4, br.y + br.h * 0.55);
            targetCtx.bezierCurveTo(br.x + br.w * 0.35, br.y + 1, br.x + br.w * 0.7, br.y + br.h - 1, br.x + br.w - 4, br.y + br.h * 0.35);
            targetCtx.stroke();
            break;
        case 'monolithSlab':
            targetCtx.fillStyle = 'rgba(255,255,255,0.12)';
            targetCtx.fillRect(br.x + 2, br.y + 2, br.w - 4, 2);
            targetCtx.fillStyle = 'rgba(0,0,0,0.3)';
            targetCtx.fillRect(br.x + 2, br.y + br.h - 4, br.w - 4, 2);
            targetCtx.strokeStyle = 'rgba(255,255,255,0.16)';
            targetCtx.lineWidth = 1;
            targetCtx.beginPath();
            roundRect(targetCtx, br.x + 0.5, br.y + 0.5, br.w - 1, br.h - 1, 3);
            targetCtx.stroke();
            break;
    }
}

function renderBrickBody(targetCtx, br) {
    const color = brickColor(br);
    const r = theme.brickStyle === 'wireframe' ? 2 : theme.brickStyle === 'bioShell' ? 6 : theme.brickStyle === 'monolithSlab' ? 3 : 4;
    targetCtx.shadowColor = color;
    targetCtx.shadowBlur = theme.brickStyle === 'wireframe' ? 6 : 10;
    targetCtx.fillStyle = getBrickFillStyle(targetCtx, br, color);
    targetCtx.beginPath();
    roundRect(targetCtx, br.x, br.y, br.w, br.h, r);
    targetCtx.fill();
    targetCtx.shadowBlur = 0;
    renderBrickDetails(targetCtx, br, color, r);
    renderBrickLabel(targetCtx, br);
}

function renderBrickLabel(targetCtx, br) {
    if (br.hp <= 1) return;
    targetCtx.fillStyle = 'rgba(255,255,255,0.9)';
    targetCtx.font = 'bold 11px sans-serif';
    targetCtx.textAlign = 'center';
    targetCtx.textBaseline = 'middle';
    targetCtx.fillText(br.hp, br.x + br.w / 2, br.y + br.h / 2);
}

function renderBrickLabels(targetCtx = ctx) {
    for (const br of bricks) {
        if (!br.alive) continue;
        renderBrickLabel(targetCtx, br);
    }
}

function renderBricks(targetCtx = ctx) {
    for (const br of bricks) {
        if (!br.alive) continue;
        renderBrickBody(targetCtx, br);
    }
}

function renderBrickFlashes(targetCtx = ctx) {
    if (targetCtx === ctx && renderFlags.useThreeOverlay) return;
    for (const br of bricks) {
        if (!br.alive || br.flashTimer <= 0) continue;
        const alpha = 0.18 + (br.flashTimer / BRICK_FLASH_FRAMES) * 0.5;
        const r = theme.brickStyle === 'wireframe' ? 2 : 4;
        targetCtx.globalAlpha = alpha;
        targetCtx.fillStyle = '#ffffff';
        targetCtx.shadowColor = '#ffffff';
        targetCtx.shadowBlur = 8;
        targetCtx.beginPath();
        roundRect(targetCtx, br.x, br.y, br.w, br.h, r);
        targetCtx.fill();
        targetCtx.shadowBlur = 0;
    }
    targetCtx.globalAlpha = 1;
}

function getTrailProfile(ballCount, isMega) {
    if (ballCount >= 120) {
        return { maxPoints: isMega ? 4 : 3, step: 2, minimal: true };
    }
    if (ballCount >= 60) {
        return { maxPoints: isMega ? 6 : 4, step: 2, minimal: false };
    }
    if (ballCount >= 30) {
        return { maxPoints: isMega ? 8 : 6, step: 1, minimal: false };
    }
    return { maxPoints: isMega ? 12 : 8, step: 1, minimal: false };
}

function renderMinimalTrail(ball, effectiveR, trailColor, step) {
    const lastIndex = ball.trail.length - 1;
    if (lastIndex <= 0) return;

    ctx.strokeStyle = trailColor;
    ctx.lineWidth = Math.max(1.5, effectiveR * 0.45);
    ctx.lineCap = 'round';
    ctx.globalAlpha = 0.22;
    ctx.beginPath();
    ctx.moveTo(ball.trail[0].x, ball.trail[0].y);
    for (let i = step; i <= lastIndex; i += step) ctx.lineTo(ball.trail[i].x, ball.trail[i].y);
    if (lastIndex % step !== 0) ctx.lineTo(ball.trail[lastIndex].x, ball.trail[lastIndex].y);
    ctx.stroke();
    ctx.globalAlpha = 1;
}

function renderBallTrail(ball, effectiveR, trailColor, trailProfile) {
    if (renderFlags.useThreeEffects) return;
    const step = trailProfile.step;
    if (trailProfile.minimal) {
        renderMinimalTrail(ball, effectiveR, trailColor, step);
        return;
    }

    switch (theme.trailStyle) {
        case 'vector':
            if (ball.trail.length < 2) return;
            ctx.strokeStyle = trailColor;
            ctx.lineWidth = Math.max(2, effectiveR * 0.5);
            ctx.lineCap = 'round';
            ctx.globalAlpha = 0.26;
            ctx.beginPath();
            ctx.moveTo(ball.trail[0].x, ball.trail[0].y);
            for (let i = step; i < ball.trail.length; i += step) ctx.lineTo(ball.trail[i].x, ball.trail[i].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
            break;
        case 'bubbleWake':
            for (let i = 0; i < ball.trail.length; i += step) {
                const t = ball.trail[i];
                const alpha = (i / ball.trail.length) * 0.22;
                const size = effectiveR * (i / ball.trail.length) * 0.82;
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = trailColor;
                ctx.lineWidth = 1.1;
                ctx.beginPath();
                ctx.arc(t.x, t.y, Math.max(1.5, size), 0, Math.PI * 2);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
            break;
        case 'ember':
            for (let i = 0; i < ball.trail.length; i += step) {
                const t = ball.trail[i];
                const alpha = (i / ball.trail.length) * 0.3;
                const size = Math.max(2, effectiveR * 0.35 * (i / ball.trail.length + 0.25));
                ctx.globalAlpha = alpha;
                ctx.fillStyle = trailColor;
                ctx.fillRect(t.x - size / 2, t.y - size / 2, size, size);
            }
            ctx.globalAlpha = 1;
            break;
        case 'inkRibbon':
            if (ball.trail.length < 2) return;
            for (let i = step; i < ball.trail.length; i += step) {
                const a = ball.trail[Math.max(0, i - step)];
                const b = ball.trail[i];
                ctx.globalAlpha = i / ball.trail.length * 0.26;
                ctx.strokeStyle = trailColor;
                ctx.lineWidth = effectiveR * 0.5;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
            break;
        case 'arc':
            for (let i = step; i < ball.trail.length; i += step) {
                const a = ball.trail[Math.max(0, i - step)];
                const b = ball.trail[i];
                const mx = (a.x + b.x) / 2 + Math.sin(frameCount * 0.12 + i) * 6;
                const my = (a.y + b.y) / 2 + Math.cos(frameCount * 0.1 + i) * 6;
                ctx.globalAlpha = i / ball.trail.length * 0.32;
                ctx.strokeStyle = trailColor;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(mx, my);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
            break;
        case 'ribbonArc':
            if (ball.trail.length < 2) return;
            for (let i = step; i < ball.trail.length; i += step) {
                const a = ball.trail[Math.max(0, i - step)];
                const b = ball.trail[i];
                const midX = (a.x + b.x) / 2 + Math.sin(frameCount * 0.08 + i) * 4;
                const midY = (a.y + b.y) / 2 - Math.cos(frameCount * 0.07 + i) * 5;
                ctx.globalAlpha = i / ball.trail.length * 0.32;
                ctx.strokeStyle = trailColor;
                ctx.lineWidth = Math.max(2, effectiveR * 0.52);
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.quadraticCurveTo(midX, midY, b.x, b.y);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
            break;
        case 'tendon':
            if (ball.trail.length < 2) return;
            for (let i = step; i < ball.trail.length; i += step) {
                const a = ball.trail[Math.max(0, i - step)];
                const b = ball.trail[i];
                ctx.globalAlpha = i / ball.trail.length * 0.24;
                ctx.strokeStyle = trailColor;
                ctx.lineWidth = Math.max(1.5, effectiveR * 0.34);
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
                ctx.fillStyle = trailColor;
                ctx.beginPath();
                ctx.arc(b.x, b.y, Math.max(1.1, effectiveR * 0.18), 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            break;
        case 'slabEcho':
            for (let i = 0; i < ball.trail.length; i += step) {
                const t = ball.trail[i];
                const alpha = (i / ball.trail.length) * 0.22;
                const size = Math.max(3, effectiveR * (0.35 + i / ball.trail.length * 0.45));
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = trailColor;
                ctx.lineWidth = 1;
                ctx.strokeRect(t.x - size / 2, t.y - size / 2, size, size);
            }
            ctx.globalAlpha = 1;
            break;
        default:
            for (let j = 0; j < ball.trail.length; j += step) {
                const t = ball.trail[j];
                ctx.globalAlpha = (j / ball.trail.length) * 0.35;
                ctx.fillStyle = trailColor;
                const size = effectiveR * (j / ball.trail.length) * 0.7;
                ctx.beginPath();
                ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            break;
    }
}

function renderBalls() {
    if (renderFlags.useThreeGameplay) return;
    const isMega = effects.megaBall > 0;
    const trailProfile = getTrailProfile(balls.length, isMega);
    for (const b of balls) {
        const effectiveR = isMega ? BALL_R * MEGA_BALL_SCALE : BALL_R;
        const color = isMega ? theme.megaBall : effects.fireBall > 0 ? theme.fireBall : theme.ball;
        const trailColor = isMega ? theme.megaBall : effects.fireBall > 0 ? theme.fireBall : theme.ballGlow;

        renderBallTrail(b, effectiveR, trailColor, trailProfile);

        // Ball
        ctx.shadowColor = color;
        ctx.shadowBlur = isMega ? 30 : 18;
        const grd = ctx.createRadialGradient(b.x - 2, b.y - 2, 0, b.x, b.y, effectiveR);
        grd.addColorStop(0, '#fff');
        grd.addColorStop(0.4, color);
        grd.addColorStop(1, 'rgba(0,0,0,0.3)');
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(b.x, b.y, effectiveR, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function renderBullets() {
    for (const bl of bullets) {
        ctx.save();
        ctx.shadowColor = '#ffe04d';
        ctx.shadowBlur = renderFlags.useThreeOverlay ? 0 : 16;
        ctx.fillStyle = '#fff7aa';
        ctx.fillRect(bl.x - BULLET_W / 2, bl.y - BULLET_H, BULLET_W, BULLET_H);
        ctx.shadowBlur = 0;
        ctx.restore();
    }
}

function renderPaddle() {
    const px = paddle.x - paddle.w / 2, py = PADDLE_Y, pw = paddle.w;
    const color = effects.widePaddle > 0 ? theme.text3 : theme.paddle;
    ctx.shadowColor = color; ctx.shadowBlur = renderFlags.useThreeOverlay ? 0 : 22;

    const grd = ctx.createLinearGradient(px, py, px, py + PADDLE_H);
    grd.addColorStop(0, color); grd.addColorStop(1, theme.paddleDark);
    ctx.fillStyle = grd;

    const r = PADDLE_H / 2;
    ctx.beginPath();
    ctx.moveTo(px + r, py);
    ctx.lineTo(px + pw - r, py);
    ctx.arc(px + pw - r, py + r, r, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(px + r, py + PADDLE_H);
    ctx.arc(px + r, py + r, r, Math.PI / 2, -Math.PI / 2);
    ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;
}

function renderItemBadge(x, y, radius, typeId, options = {}) {
    const color = theme.itemColors[typeId] || theme.accent;
    const icon = theme.itemIcons[typeId] || '?';
    const glow = options.glow ?? 12;
    const iconSize = options.iconSize ?? Math.max(10, radius * 0.9);

    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = glow;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, radius - 0.5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.14)';
    ctx.beginPath();
    ctx.arc(x - radius * 0.28, y - radius * 0.28, radius * 0.42, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = `bold ${iconSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon, x, y + 0.5);
    ctx.restore();
}

function renderItems() {
    for (const it of items) {
        renderItemBadge(it.x, it.y, ITEM_SIZE / 2, it.type.id, {
            glow: renderFlags.useThreeOverlay ? 0 : 12 + it.glow * 5,
            iconSize: 11,
        });
    }
}

function renderHUDChrome() {
    switch (theme.hudStyle) {
        case 'ops':
            ctx.fillStyle = 'rgba(0,0,0,0.28)';
            ctx.fillRect(12, 10, 210, 28);
            ctx.fillRect(W / 2 - 78, 10, 156, 28);
            ctx.fillRect(W - 214, 10, 202, 28);
            ctx.strokeStyle = `rgba(${hexToRgb(theme.accent)},0.28)`;
            ctx.beginPath();
            ctx.moveTo(14, 44);
            ctx.lineTo(W - 14, 44);
            ctx.stroke();
            break;
        case 'sonar':
            ctx.strokeStyle = 'rgba(255,255,255,0.18)';
            ctx.beginPath();
            ctx.arc(42, 24, 18, Math.PI * 1.05, Math.PI * 1.9);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(W - 42, 24, 18, Math.PI * 1.1, Math.PI * 1.95);
            ctx.stroke();
            break;
        case 'kiln': {
            const grd = ctx.createLinearGradient(0, 0, 0, 54);
            grd.addColorStop(0, 'rgba(255,180,80,0.16)');
            grd.addColorStop(1, 'rgba(255,120,40,0)');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, W, 54);
            break;
        }
        case 'seal':
            ctx.fillStyle = `rgba(${hexToRgb(theme.text2)},0.08)`;
            ctx.fillRect(0, 0, W, 44);
            ctx.fillStyle = `rgba(${hexToRgb(theme.accent)},0.16)`;
            ctx.fillRect(W / 2 - 120, 41, 240, 2);
            break;
        case 'overclock':
            ctx.strokeStyle = `rgba(${hexToRgb(theme.accent)},0.28)`;
            ctx.beginPath();
            ctx.moveTo(18, 42);
            ctx.lineTo(42, 16);
            ctx.lineTo(128, 16);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(W - 18, 42);
            ctx.lineTo(W - 42, 16);
            ctx.lineTo(W - 128, 16);
            ctx.stroke();
            break;
    }
}

function renderHUD() {
    ctx.shadowBlur = 0; ctx.textBaseline = 'top';
    renderHUDChrome();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE  ${score.toLocaleString()}`, 18, 14);

    ctx.textAlign = 'center';
    ctx.fillText(`STAGE ${level + 1}`, W / 2, 14);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#ff3366'; ctx.font = '20px sans-serif';
    let livesStr = '';
    for (let i = 0; i < lives; i++) livesStr += '♥ ';
    ctx.fillText(livesStr, W - 18, 14);

    if (balls.length > 1) {
        ctx.fillStyle = theme.ball; ctx.font = '14px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(`BALLS: ${balls.length}`, 18, 40);
    }

    // Bullet counter
    ctx.fillStyle = bulletsLeft > 0 ? '#ffe04d' : '#666';
    ctx.font = '15px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(`🔫 ×${bulletsLeft}`, 18, balls.length > 1 ? 60 : 40);
    if (comboDisplay.alpha > 0.05 && comboDisplay.label) {
        ctx.save();
        ctx.globalAlpha = comboDisplay.alpha;
        const col = combo >= 20 ? '#ff0055' : combo >= 10 ? '#ff6600' : combo >= 5 ? theme.text3 : theme.ball;
        ctx.fillStyle = col;
        ctx.font = `bold ${Math.floor(28 * comboDisplay.scale)}px sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.shadowColor = col; ctx.shadowBlur = renderFlags.useThreeOverlay ? 0 : 20;
        ctx.fillText(`${comboDisplay.value}x ${comboDisplay.label}`, W / 2, H / 2 - 70);
        ctx.restore();
    }

    // Effects bar
    const active = [];
    if (effects.widePaddle > 0) active.push({ name: 'WIDE', color: theme.text3, t: effects.widePaddle / EFFECT_DURATION_MS });
    if (effects.fireBall > 0) active.push({ name: 'FIRE', color: theme.fireBall, t: effects.fireBall / EFFECT_DURATION_MS });
    if (effects.slowBall > 0) active.push({ name: 'SLOW', color: theme.ball, t: effects.slowBall / EFFECT_DURATION_MS });
    if (effects.megaBall > 0) active.push({ name: 'MEGA', color: theme.megaBall, t: effects.megaBall / MEGA_BALL_DURATION_MS });

    if (active.length > 0) {
        const bw = 90, bh = 8, sx = W / 2 - (active.length * (bw + 12)) / 2;
        active.forEach((eff, i) => {
            const bx = sx + i * (bw + 12), by = H - 18;
            ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(bx, by, bw, bh);
            ctx.fillStyle = eff.color; ctx.fillRect(bx, by, bw * eff.t, bh);
            ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(eff.name, bx + bw / 2, by - 4);
        });
    }
}

// ═══════════════════════════════════════════════════════════════
// SCREENS
// ═══════════════════════════════════════════════════════════════
function neonText(text, x, y, size, color, glow = 15) {
    ctx.save();
    ctx.font = `bold ${size}px sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = color; ctx.shadowBlur = glow;
    ctx.fillStyle = color; ctx.fillText(text, x, y);
    ctx.shadowBlur = glow * 0.5;
    ctx.fillStyle = '#fff'; ctx.fillText(text, x, y);
    ctx.restore();
}

function renderRankingStorageNotice(y) {
    if (!rankingStorageNotice) return;
    ctx.fillStyle = '#ffb366';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(rankingStorageNotice, W / 2, y);
}

// UI button rects (computed during render)
let themeButtons = [];
let startButton = null;
let rankingButton = null;
let pauseButtons = { resume: null, quit: null };

function renderPreviewBackground(t, x, y, w, h) {
    const grd = ctx.createLinearGradient(x, y, x, y + h);
    grd.addColorStop(0, t.bg1);
    grd.addColorStop(1, t.bg2);
    ctx.fillStyle = grd;
    ctx.fillRect(x, y, w, h);

    switch (t.backgroundMode) {
        case 'laserGrid':
            ctx.strokeStyle = t.grid;
            for (let gx = x; gx < x + w; gx += 20) {
                ctx.beginPath();
                ctx.moveTo(gx, y);
                ctx.lineTo(gx, y + h);
                ctx.stroke();
            }
            for (let gy = y; gy < y + h; gy += 20) {
                ctx.beginPath();
                ctx.moveTo(x, gy);
                ctx.lineTo(x + w, gy);
                ctx.stroke();
            }
            break;
        case 'heatHaze':
            for (let i = 0; i < 4; i++) {
                const colX = x + (i + 0.5) * (w / 4);
                const haze = ctx.createLinearGradient(colX, y, colX, y + h);
                haze.addColorStop(0, 'rgba(255,180,80,0)');
                haze.addColorStop(1, 'rgba(255,120,40,0.18)');
                ctx.fillStyle = haze;
                ctx.fillRect(colX - 18, y, 36, h);
            }
            break;
        case 'paperWash': {
            const wash = ctx.createRadialGradient(x + w * 0.3, y + h * 0.3, 0, x + w * 0.3, y + h * 0.3, w * 0.35);
            wash.addColorStop(0, `rgba(${hexToRgb(t.text2)},0.18)`);
            wash.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = wash;
            ctx.beginPath();
            ctx.arc(x + w * 0.3, y + h * 0.3, w * 0.35, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 'rainField':
            ctx.strokeStyle = t.grid;
            for (let i = -2; i < w / 20 + 2; i++) {
                const sx = x + i * 20 + ((frameCount * 2) % 20);
                ctx.beginPath();
                ctx.moveTo(sx, y);
                ctx.lineTo(sx + 18, y + h);
                ctx.stroke();
            }
            break;
        case 'balloonParade':
            [
                { px: 0.2, py: 0.28, pr: 0.16, color: t.text2 },
                { px: 0.46, py: 0.18, pr: 0.12, color: t.text3 },
                { px: 0.74, py: 0.26, pr: 0.14, color: t.accent },
            ].forEach(entry => {
                const cx = x + w * entry.px;
                const cy = y + h * entry.py;
                const radius = w * entry.pr;
                const glow = ctx.createRadialGradient(cx - 6, cy - 8, 0, cx, cy, radius);
                glow.addColorStop(0, `rgba(${hexToRgb(entry.color)},0.22)`);
                glow.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = `rgba(${hexToRgb(entry.color)},0.24)`;
                ctx.beginPath();
                ctx.moveTo(cx, cy + radius * 0.7);
                ctx.quadraticCurveTo(cx - 5, cy + radius + 12, cx + 4, cy + radius + 24);
                ctx.stroke();
            });
            break;
        case 'prismLagoon':
            ctx.strokeStyle = `rgba(${hexToRgb(t.accent)},0.18)`;
            ctx.lineWidth = 5;
            for (let gy = y + 10; gy < y + h; gy += 18) {
                ctx.beginPath();
                for (let gx = x; gx <= x + w; gx += 16) {
                    const offset = Math.sin(gx * 0.05 + frameCount * 0.08 + gy * 0.07) * 4;
                    if (gx === x) ctx.moveTo(gx, gy + offset);
                    else ctx.lineTo(gx, gy + offset);
                }
                ctx.stroke();
            }
            ctx.fillStyle = 'rgba(255,255,255,0.12)';
            [0.18, 0.46, 0.76].forEach((ratio, index) => {
                const prismW = 10 + index * 4;
                const prismH = h * 0.42;
                ctx.save();
                ctx.translate(x + w * ratio, y + h * 0.34);
                ctx.rotate(index % 2 === 0 ? -0.12 : 0.12);
                ctx.fillRect(-prismW / 2, -prismH / 2, prismW, prismH);
                ctx.restore();
            });
            break;
        case 'dioramaShelf':
            ctx.fillStyle = 'rgba(255,245,218,0.08)';
            ctx.beginPath();
            ctx.moveTo(x + w * 0.12, y + h * 0.18);
            ctx.lineTo(x + w * 0.86, y + h * 0.12);
            ctx.lineTo(x + w * 0.94, y + h * 0.82);
            ctx.lineTo(x + w * 0.08, y + h * 0.88);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = `rgba(${hexToRgb(t.text1)},0.24)`;
            for (let i = 0; i < 4; i++) {
                const inset = i * 10;
                ctx.beginPath();
                ctx.moveTo(x + w * 0.16 + inset, y + h * 0.2 + inset * 0.2);
                ctx.lineTo(x + w * 0.8 - inset, y + h * 0.15 + inset * 0.15);
                ctx.lineTo(x + w * 0.88 - inset * 0.7, y + h * 0.78 - inset * 0.05);
                ctx.lineTo(x + w * 0.12 + inset * 0.7, y + h * 0.82 - inset * 0.04);
                ctx.closePath();
                ctx.stroke();
            }
            break;
        case 'bioPulse':
            for (let i = 0; i < 3; i++) {
                const cx = x + w * (0.24 + i * 0.24);
                const cy = y + h * (0.28 + (i % 2) * 0.14);
                const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.18);
                grd.addColorStop(0, `rgba(${hexToRgb(t.accent)},0.2)`);
                grd.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.arc(cx, cy, w * 0.18, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.strokeStyle = `rgba(${hexToRgb(t.accent)},0.2)`;
            ctx.lineWidth = 2;
            for (let gy = y + 10; gy < y + h; gy += 18) {
                ctx.beginPath();
                for (let gx = x; gx <= x + w; gx += 14) {
                    const offset = Math.sin(frameCount * 0.1 + gx * 0.05 + gy * 0.08) * 3;
                    if (gx === x) ctx.moveTo(gx, gy + offset);
                    else ctx.lineTo(gx, gy + offset);
                }
                ctx.stroke();
            }
            break;
        case 'monolithVault':
            ctx.fillStyle = 'rgba(255,255,255,0.05)';
            [0.18, 0.42, 0.7].forEach((ratio, index) => {
                const slabW = 14 + index * 6;
                ctx.fillRect(x + w * ratio, y + h * 0.16, slabW, h * 0.54);
            });
            ctx.strokeStyle = t.grid;
            for (let i = 0; i <= 5; i++) {
                const ratio = i / 5;
                ctx.beginPath();
                ctx.moveTo(x + ratio * w, y + h);
                ctx.lineTo(x + w * 0.5 + (ratio - 0.5) * 26, y + h * 0.5);
                ctx.stroke();
            }
            break;
    }

    ctx.fillStyle = `rgba(${t.starCol[0]},${t.starCol[1]},${t.starCol[2]},0.8)`;
    for (let i = 0; i < 8; i++) {
        const px = x + ((i * 37) % Math.floor(w - 12)) + 6;
        const py = y + ((i * 19) % Math.floor(h * 0.58)) + 6;
        ctx.beginPath();
        ctx.arc(px, py, 1.2 + (i % 3) * 0.45, 0, Math.PI * 2);
        ctx.fill();
    }
}

function renderPreviewBricks(t, x, y, w, h) {
    const brickY = y + h * 0.55;
    for (let i = 0; i < 4; i++) {
        const bw = 34;
        const bh = 12;
        const bx = x + 12 + i * 42;
        const hue = t.brickHue(i);
        const color = hsl(hue, t.brickSat, t.brickLight);
        const grd = ctx.createLinearGradient(bx, brickY, bx, brickY + bh);
        grd.addColorStop(0, color);
        grd.addColorStop(1, hsl(hue, t.brickSat, Math.max(t.brickLight - 18, 18)));
        ctx.fillStyle = grd;
        ctx.beginPath();
        roundRect(ctx, bx, brickY, bw, bh, t.brickStyle === 'wireframe' ? 2 : 4);
        ctx.fill();

        switch (t.brickStyle) {
            case 'wireframe':
                ctx.strokeStyle = `rgba(${hexToRgb(t.accent)},0.7)`;
                ctx.lineWidth = 1;
                ctx.stroke();
                break;
            case 'wetGlass':
                ctx.fillStyle = 'rgba(255,255,255,0.18)';
                ctx.fillRect(bx + 3, brickY + 2, 6, bh - 4);
                break;
            case 'forgedMetal':
                ctx.fillStyle = 'rgba(255,210,120,0.26)';
                ctx.fillRect(bx + 2, brickY + 2, bw - 4, 2);
                break;
            case 'lacquerTile':
                ctx.strokeStyle = 'rgba(255,255,255,0.35)';
                ctx.lineWidth = 1;
                ctx.stroke();
                break;
            case 'chargedPanel':
                ctx.strokeStyle = `rgba(${hexToRgb(t.accent)},0.45)`;
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(bx + 5, brickY + bh - 3);
                ctx.lineTo(bx + bw - 5, brickY + 3);
                ctx.stroke();
                break;
            case 'toyBlock':
                ctx.fillStyle = 'rgba(255,255,255,0.22)';
                ctx.fillRect(bx + 4, brickY + 2, bw - 8, 2);
                ctx.strokeStyle = 'rgba(255,255,255,0.24)';
                ctx.lineWidth = 1;
                ctx.stroke();
                break;
            case 'bioShell':
                ctx.strokeStyle = 'rgba(220,255,240,0.28)';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(bx + 4, brickY + bh * 0.55);
                ctx.quadraticCurveTo(bx + bw * 0.42, brickY + 1, bx + bw - 5, brickY + bh * 0.35);
                ctx.stroke();
                break;
            case 'monolithSlab':
                ctx.fillStyle = 'rgba(255,255,255,0.12)';
                ctx.fillRect(bx + 3, brickY + 2, bw - 6, 2);
                ctx.fillStyle = 'rgba(0,0,0,0.22)';
                ctx.fillRect(bx + 3, brickY + bh - 4, bw - 6, 2);
                ctx.strokeStyle = 'rgba(255,255,255,0.18)';
                ctx.lineWidth = 1;
                ctx.stroke();
                break;
            default:
                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                ctx.fillRect(bx + 3, brickY + 2, bw - 6, 2);
                break;
        }
    }
}

function renderPreviewTrail(t, x, y, w, h) {
    const points = [
        { x: x + w * 0.34, y: y + h * 0.58 },
        { x: x + w * 0.46, y: y + h * 0.46 },
        { x: x + w * 0.58, y: y + h * 0.38 },
        { x: x + w * 0.7, y: y + h * 0.3 },
    ];
    const trailColor = t.ballGlow;
    ctx.save();

    switch (t.trailStyle) {
        case 'vector':
            ctx.strokeStyle = trailColor;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
            ctx.stroke();
            break;
        case 'bubbleWake':
            points.forEach((p, i) => {
                ctx.globalAlpha = 0.18 + i * 0.05;
                ctx.strokeStyle = trailColor;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3 + i * 1.4, 0, Math.PI * 2);
                ctx.stroke();
            });
            break;
        case 'ember':
            points.forEach((p, i) => {
                ctx.globalAlpha = 0.2 + i * 0.08;
                ctx.fillStyle = trailColor;
                ctx.fillRect(p.x - 2, p.y - 2, 4 + i, 4 + i);
            });
            break;
        case 'inkRibbon':
            ctx.strokeStyle = trailColor;
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            for (let i = 1; i < points.length; i++) {
                ctx.globalAlpha = i / points.length * 0.28;
                ctx.beginPath();
                ctx.moveTo(points[i - 1].x, points[i - 1].y);
                ctx.lineTo(points[i].x, points[i].y);
                ctx.stroke();
            }
            break;
        case 'arc':
            ctx.strokeStyle = trailColor;
            ctx.lineWidth = 1.5;
            for (let i = 1; i < points.length; i++) {
                const a = points[i - 1], b = points[i];
                const mx = (a.x + b.x) / 2 + Math.sin(frameCount * 0.1 + i) * 4;
                const my = (a.y + b.y) / 2 + Math.cos(frameCount * 0.1 + i) * 4;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(mx, my);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
            break;
        case 'ribbonArc':
            ctx.strokeStyle = trailColor;
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            for (let i = 1; i < points.length; i++) {
                const a = points[i - 1];
                const b = points[i];
                ctx.globalAlpha = i / points.length * 0.26;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.quadraticCurveTo((a.x + b.x) / 2 + 3, (a.y + b.y) / 2 - 4, b.x, b.y);
                ctx.stroke();
            }
            break;
        case 'tendon':
            ctx.strokeStyle = trailColor;
            ctx.lineWidth = 2;
            points.forEach((p, i) => {
                if (i === 0) return;
                const prev = points[i - 1];
                ctx.globalAlpha = i / points.length * 0.25;
                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
                ctx.fillStyle = trailColor;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5 + i * 0.4, 0, Math.PI * 2);
                ctx.fill();
            });
            break;
        case 'slabEcho':
            points.forEach((p, i) => {
                ctx.globalAlpha = 0.1 + i * 0.05;
                ctx.strokeStyle = trailColor;
                ctx.lineWidth = 1;
                const size = 4 + i * 1.5;
                ctx.strokeRect(p.x - size / 2, p.y - size / 2, size, size);
            });
            break;
        default:
            points.forEach((p, i) => {
                ctx.globalAlpha = 0.12 + i * 0.05;
                ctx.fillStyle = trailColor;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2 + i * 1.8, 0, Math.PI * 2);
                ctx.fill();
            });
            break;
    }

    ctx.globalAlpha = 1;
    ctx.shadowColor = t.ball;
    ctx.shadowBlur = 12;
    const bx = x + w * 0.8;
    const by = y + h * 0.24;
    const grd = ctx.createRadialGradient(bx - 2, by - 2, 0, bx, by, 10);
    grd.addColorStop(0, '#fff');
    grd.addColorStop(0.45, t.ball);
    grd.addColorStop(1, 'rgba(0,0,0,0.3)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(bx, by, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function renderThemeCard(button) {
    const { key, x, y, w, h } = button;
    const t = THEMES[key];
    const selected = key === currentThemeKey;
    const hover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
    const lift = hover ? -4 : 0;
    const glow = selected ? 0.7 + Math.sin(frameCount * 0.08) * 0.3 : 0;

    ctx.save();
    ctx.translate(0, lift);
    ctx.fillStyle = selected ? `rgba(${hexToRgb(t.accent)},0.12)` : hover ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)';
    ctx.strokeStyle = selected ? `rgba(${hexToRgb(t.accent)},${0.55 + glow * 0.3})` : hover ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)';
    ctx.lineWidth = selected ? 2.2 : 1;
    if (selected) {
        ctx.shadowColor = t.accent;
        ctx.shadowBlur = 16 + glow * 6;
    }
    ctx.beginPath();
    roundRect(ctx, x, y, w, h, 14);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.save();
    ctx.beginPath();
    roundRect(ctx, x + 10, y + 10, w - 20, 70, 10);
    ctx.clip();
    renderPreviewBackground(t, x + 10, y + 10, w - 20, 70);
    renderPreviewBricks(t, x + 10, y + 10, w - 20, 70);
    renderPreviewTrail(t, x + 10, y + 10, w - 20, 70);
    ctx.restore();

    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(t.menuBadge, x + w - 14, y + 20);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(t.name, x + 14, y + 96);

    ctx.fillStyle = 'rgba(255,255,255,0.62)';
    ctx.font = '12px sans-serif';
    ctx.fillText(t.menuHint, x + 14, y + 116);

    if (selected) {
        ctx.fillStyle = `rgba(${hexToRgb(t.text3)},0.95)`;
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('SELECTED', x + w - 14, y + h - 14);
    }
    ctx.restore();
}

function renderMenuHelpPanel(x, y, w, h) {
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.26)';
    ctx.strokeStyle = `rgba(${hexToRgb(theme.accent)},0.26)`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    roundRect(ctx, x, y, w, h, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.52)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('ITEM HELP', x + 18, y + 18);
    ctx.textAlign = 'right';
    ctx.fillText('Same rules in every world', x + w - 18, y + 18);

    const innerX = x + 14;
    const innerY = y + 30;
    const innerW = w - 28;
    const colW = innerW / ITEM_TYPES.length;

    ITEM_TYPES.forEach((type, index) => {
        const ix = innerX + index * colW;
        const help = ITEM_HELP[type.id];
        const color = theme.itemColors[type.id] || theme.accent;

        if (index > 0) {
            ctx.strokeStyle = 'rgba(255,255,255,0.08)';
            ctx.beginPath();
            ctx.moveTo(ix, innerY + 4);
            ctx.lineTo(ix, y + h - 12);
            ctx.stroke();
        }

        renderItemBadge(ix + 26, innerY + 24, 16, type.id, { glow: 10, iconSize: 13 });

        ctx.textAlign = 'left';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(help.title, ix + 54, innerY + 14);

        ctx.fillStyle = `rgba(${hexToRgb(color)},0.95)`;
        ctx.font = '11px sans-serif';
        ctx.fillText(help.duration, ix + 54, innerY + 30);

        ctx.fillStyle = 'rgba(255,255,255,0.66)';
        ctx.font = '11px sans-serif';
        ctx.fillText(help.description, ix + 54, innerY + 48);
    });

    ctx.restore();
}

function renderMenuScreen() {
    const pulse = 0.7 + Math.sin(frameCount * 0.05) * 0.3;
    neonText('SHATTER STORM', W / 2, H * 0.16, 74, `rgba(${hexToRgb(theme.text1)},${pulse})`, 32);
    ctx.fillStyle = 'rgba(255,255,255,0.42)';
    ctx.font = '15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Choose a world. Gameplay stays identical. Atmosphere does not.', W / 2, H * 0.22);

    const buttonY = H * 0.29;
    const buttonW = 250, buttonH = 56;
    const startX = W / 2 - buttonW - 14;
    const rankX = W / 2 + 14;
    startButton = { x: startX, y: buttonY, w: buttonW, h: buttonH };
    rankingButton = { x: rankX, y: buttonY, w: buttonW, h: buttonH };

    [
        { button: startButton, label: '▶  START GAME', color: theme.text3 },
        { button: rankingButton, label: '🏆  RANKING', color: theme.text2 },
    ].forEach(({ button, label, color }) => {
        const hover = mouseX >= button.x && mouseX <= button.x + button.w && mouseY >= button.y && mouseY <= button.y + button.h;
        ctx.fillStyle = hover ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.05)';
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = hover ? 20 : 10;
        ctx.beginPath();
        roundRect(ctx, button.x, button.y, button.w, button.h, 10);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
        neonText(label, button.x + button.w / 2, button.y + button.h / 2, 22, color, 10);
    });

    ctx.fillStyle = 'rgba(255,255,255,0.34)';
    ctx.font = '13px sans-serif';
    ctx.fillText('Mouse: Move Paddle  |  Click / Space: Shoot  |  ESC / P: Pause  |  Q: Quit', W / 2, H * 0.41);
    ctx.fillText('Worlds change visuals, not rules.', W / 2, H * 0.45);
    renderRankingStorageNotice(H * 0.44);

    const helpW = 920;
    const helpH = 84;
    const helpX = W / 2 - helpW / 2;
    const helpY = H * 0.48;
    renderMenuHelpPanel(helpX, helpY, helpW, helpH);

    const cardW = 286;
    const cardH = 138;
    const gapX = 26;
    const gapY = 22;
    const gridY = H * 0.595;

    themeButtons = [];
    ctx.fillStyle = 'rgba(255,255,255,0.48)';
    ctx.font = '12px sans-serif';
    ctx.fillText('SELECT WORLD', W / 2, gridY - 20);

    THEME_ORDER.forEach((key, index) => {
        const row = Math.floor(index / 3);
        const rowStart = row * 3;
        const itemsInRow = Math.min(3, THEME_ORDER.length - rowStart);
        const rowWidth = itemsInRow * cardW + (itemsInRow - 1) * gapX;
        const rowX = W / 2 - rowWidth / 2;
        const col = index - rowStart;
        const bx = rowX + col * (cardW + gapX);
        const by = gridY + row * (cardH + gapY);
        const button = { key, x: bx, y: by, w: cardW, h: cardH };
        themeButtons.push(button);
        renderThemeCard(button);
    });

    // Dedication
    ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.font = 'italic 11px sans-serif';
    ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
    ctx.fillText('for elyse', W - 24, H - 16);
}

function renderPausedScreen() {
    ctx.fillStyle = 'rgba(0,0,0,0.65)'; ctx.fillRect(0, 0, W, H);
    neonText('PAUSED', W / 2, H * 0.32, 52, theme.text3, 22);
    neonText(`Score: ${score.toLocaleString()}`, W / 2, H * 0.42, 20, '#aaa', 5);

    // Resume button
    const rbW = 220, rbH = 48, rbX = W / 2 - rbW / 2, rbY = H * 0.50;
    pauseButtons.resume = { x: rbX, y: rbY, w: rbW, h: rbH };
    const hoverR = mouseX >= rbX && mouseX <= rbX + rbW && mouseY >= rbY && mouseY <= rbY + rbH;
    ctx.fillStyle = hoverR ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)';
    ctx.strokeStyle = theme.accent; ctx.lineWidth = 2;
    ctx.shadowColor = theme.accent; ctx.shadowBlur = hoverR ? 18 : 8;
    ctx.beginPath(); roundRect(ctx, rbX, rbY, rbW, rbH, 8); ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0;
    neonText('▶  RESUME', W / 2, rbY + rbH / 2, 20, theme.accent, 8);

    // Quit button
    const qbY = rbY + rbH + 16;
    pauseButtons.quit = { x: rbX, y: qbY, w: rbW, h: rbH };
    const hoverQ = mouseX >= rbX && mouseX <= rbX + rbW && mouseY >= qbY && mouseY <= qbY + rbH;
    ctx.fillStyle = hoverQ ? 'rgba(255,80,80,0.15)' : 'rgba(255,255,255,0.04)';
    ctx.strokeStyle = '#ff4466'; ctx.lineWidth = 1.5;
    ctx.shadowColor = '#ff4466'; ctx.shadowBlur = hoverQ ? 14 : 5;
    ctx.beginPath(); roundRect(ctx, rbX, qbY, rbW, rbH, 8); ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0;
    neonText('✕  QUIT', W / 2, qbY + rbH / 2, 18, '#ff4466', 6);

    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('ESC / P: Resume  |  Q: Quit', W / 2, H * 0.82);
}

function renderStageIntro() {
    const progress = 1 - stageTimer / 90;
    const alpha = progress < 0.3 ? progress / 0.3 : progress > 0.7 ? (1 - progress) / 0.3 : 1;
    ctx.globalAlpha = Math.min(alpha * 1.5, 1);
    neonText(`STAGE ${level + 1}`, W / 2, H * 0.38, 62, theme.text1, 28);
    neonText(`${stageIntroBrickCount} BRICKS`, W / 2, H * 0.5, 24, theme.fireBall || '#ff6600', 10);
    ctx.globalAlpha = 1;
}

function renderStageClear() {
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(0, 0, W, H);
    neonText('STAGE CLEAR!', W / 2, H * 0.32, 54, '#00ff88', 28);
    neonText(`Score: ${score.toLocaleString()}`, W / 2, H * 0.46, 28, theme.text3, 14);
    if (maxCombo > 1) neonText(`Max Combo: ${maxCombo}x`, W / 2, H * 0.55, 20, theme.text2, 8);
}

function renderGameOver() {
    ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 0, W, H);
    neonText('GAME OVER', W / 2, H * 0.28, 58, theme.text2, 28);
    neonText(`Final Score: ${score.toLocaleString()}`, W / 2, H * 0.42, 30, theme.text3, 14);
    neonText(`Stage: ${level + 1}  |  Max Combo: ${maxCombo}x`, W / 2, H * 0.51, 17, '#aaa', 5);

    const blink = Math.sin(frameCount * 0.06) * 0.4 + 0.6;
    ctx.globalAlpha = blink;
    if (isHighScore(score)) neonText('🏆 NEW HIGH SCORE! Click or Enter', W / 2, H * 0.64, 20, '#00ff88', 12);
    else neonText('Click or Enter to continue', W / 2, H * 0.64, 20, '#fff', 8);
    ctx.globalAlpha = 1;
    renderRankingStorageNotice(H * 0.73);
}

function renderNameInput() {
    ctx.fillStyle = 'rgba(0,0,0,0.82)'; ctx.fillRect(0, 0, W, H);
    neonText('ENTER YOUR NAME', W / 2, H * 0.28, 36, theme.text3, 16);

    const iw = 320, ih = 52, ix = W / 2 - iw / 2, iy = H * 0.4;
    ctx.strokeStyle = theme.accent; ctx.shadowColor = theme.accent; ctx.shadowBlur = 12;
    ctx.lineWidth = 2; ctx.strokeRect(ix, iy, iw, ih);
    ctx.shadowBlur = 0;

    const cursor = Math.sin(frameCount * 0.1) > 0 ? '|' : '';
    ctx.fillStyle = '#fff'; ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(nameInput + cursor, W / 2, iy + ih / 2);

    neonText(`Score: ${score.toLocaleString()}`, W / 2, H * 0.6, 22, theme.text2, 8);
    renderRankingStorageNotice(H * 0.65);
    const blink = Math.sin(frameCount * 0.06) * 0.4 + 0.6;
    ctx.globalAlpha = blink;
    neonText('Press ENTER to confirm', W / 2, H * 0.7, 17, '#00ff88', 6);
    ctx.globalAlpha = 1;
}

function renderRanking() {
    ctx.fillStyle = 'rgba(0,0,0,0.88)'; ctx.fillRect(0, 0, W, H);
    const rankingLayout = getRankingLayout(MAX_RANKING);
    neonText(`🏆 TOP ${MAX_RANKING} RANKING`, W / 2, rankingLayout.titleY, rankingLayout.titleSize, theme.text3, 16);

    const ranking = loadRanking();
    const sy = rankingLayout.startY;
    const rh = rankingLayout.rowHeight;

    ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.font = rankingLayout.headerFont;
    ctx.textAlign = 'left';
    ctx.fillText('RANK', 60, sy + rankingLayout.headerLabelOffset);
    ctx.fillText('NAME', W * 0.2, sy + rankingLayout.headerLabelOffset);
    ctx.textAlign = 'right';
    ctx.fillText('SCORE', W * 0.55, sy + rankingLayout.headerLabelOffset);
    ctx.fillText('STAGE', W * 0.72, sy + rankingLayout.headerLabelOffset);
    ctx.fillText('DATE', W * 0.88, sy + rankingLayout.headerLabelOffset);

    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath(); ctx.moveTo(50, sy + rankingLayout.dividerOffset); ctx.lineTo(W - 50, sy + rankingLayout.dividerOffset); ctx.stroke();

    for (let i = 0; i < ranking.length; i++) {
        const r = ranking[i], y = sy + rankingLayout.firstRowOffset + i * rh;
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`;
        const rc = i < 3 ? NEON[i] : 'rgba(255,255,255,0.7)';

        ctx.fillStyle = rc; ctx.font = `bold ${rankingLayout.rankFont}`;
        ctx.textAlign = 'left';
        ctx.fillText(medal, 65, y + 8);
        ctx.font = rankingLayout.bodyFont;
        ctx.fillText(r.name, W * 0.2, y + 8);
        ctx.textAlign = 'right';
        ctx.fillText(r.score.toLocaleString(), W * 0.55, y + 8);
        ctx.fillText(`Stage ${r.level}`, W * 0.72, y + 8);
        ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.font = rankingLayout.metaFont;
        ctx.fillText(r.date, W * 0.88, y + 12);
    }

    if (ranking.length === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = rankingLayout.emptyFont; ctx.textAlign = 'center';
        ctx.fillText('No records yet. Play a game!', W / 2, H * 0.5);
    }

    const blink = Math.sin(frameCount * 0.06) * 0.4 + 0.6;
    ctx.globalAlpha = blink;
    renderRankingStorageNotice(rankingLayout.noticeY);
    neonText('Click or Enter to return to menu', W / 2, rankingLayout.footerY, rankingLayout.footerFontSize, theme.accent, 6);
    ctx.globalAlpha = 1;
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function roundRect(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
}

function hexToRgb(hex) {
    const h = hex.replace('#', '');
    if (h.length === 3) {
        return `${parseInt(h[0]+h[0],16)},${parseInt(h[1]+h[1],16)},${parseInt(h[2]+h[2],16)}`;
    }
    return `${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)}`;
}

// ═══════════════════════════════════════════════════════════════
// MAIN RENDER
// ═══════════════════════════════════════════════════════════════
function getRenderSnapshot() {
    const gameplayThemeTuning = {
        diorama: { lightAlpha: 1.28, lightScale: 0.26 },
        biomech: { lightAlpha: 1.18, lightScale: 0.22 },
        monolith: { lightAlpha: 0.92, lightScale: 0.14 },
    };
    const gameplayTuning = gameplayThemeTuning[currentThemeKey] || { lightAlpha: 1, lightScale: 0 };
    const gameplayRendererReady = !!(
        threeGameplayRenderer
        && threeGameplayRenderer.isReady()
        && state !== 'MENU'
        && state !== 'RANKING'
        && state !== 'NAME_INPUT'
    );
    const overlayRendererReady = !!(threeOverlayRenderer && threeOverlayRenderer.isReady());
    const shakeLayers = resolveShakeLayers({
        x: shake.x,
        y: shake.y,
        useThreeGameplay: gameplayRendererReady,
    });
    const effectBridge = resolveThreeEffectBridge({
        rendererReady: !!(threeRenderer && threeRenderer.isReady()),
        theme,
        effects,
        balls,
        particles,
        impactBursts,
    });
    const activeBrickBodies = collectActiveBrickBodies(bricks).map((brick) => ({
        ...brick,
        color: brickColor(brick),
        lightAlpha: brick.lightAlpha * gameplayTuning.lightAlpha,
        lightScale: brick.lightScale + gameplayTuning.lightScale,
    }));
    const activeBallBodies = collectActiveBallBodies(balls, {
        ballRadius: BALL_R,
        megaScale: MEGA_BALL_SCALE,
        themeColors: {
            ball: theme.ball,
            fireBall: theme.fireBall,
            megaBall: theme.megaBall,
        },
        effects,
    });
    const gameplayBridge = resolveThreeGameplayBridge({
        rendererReady: gameplayRendererReady,
        brickBodies: activeBrickBodies,
        ballBodies: activeBallBodies,
    });
    const overlayBridge = resolveThreeOverlayBridge({
        rendererReady: overlayRendererReady,
        bricks,
        items,
        bullets,
        paddle,
        flashAlpha: 0,
        brickStyle: theme.brickStyle,
        brickFlashFrames: BRICK_FLASH_FRAMES,
        comboDisplay,
        comboCount: combo,
        theme,
        width: W,
        height: H,
        paddleY: PADDLE_Y,
        paddleHeight: PADDLE_H,
        bulletHeight: BULLET_H,
        effects,
    });

    return {
        width: W,
        height: H,
        time: performance.now() * 0.001,
        frameCount,
        state,
        themeKey: currentThemeKey,
        flashAlpha: 0,
        shakeX: shake.x,
        shakeY: shake.y,
        worldShakeX: shakeLayers.worldX,
        worldShakeY: shakeLayers.worldY,
        gameplayShakeX: shakeLayers.gameplayX,
        gameplayShakeY: shakeLayers.gameplayY,
        backgroundShakeX: shakeLayers.backgroundX,
        backgroundShakeY: shakeLayers.backgroundY,
        overlayShakeX: shakeLayers.overlayX,
        overlayShakeY: shakeLayers.overlayY,
        ...effectBridge,
        ...gameplayBridge,
        ...overlayBridge,
        impactSlices: overlayBridge.useThreeOverlay ? impactSlices : [],
        depthPulse,
        brickStyle: theme.brickStyle,
        palette: {
            bg1: theme.bg1,
            bg2: theme.bg2,
            accent: theme.accent,
            text1: theme.text1,
            text2: theme.text2,
            text3: theme.text3,
            grid: theme.grid,
        },
        counts: {
            balls: balls.length,
            particles: particles.length,
            items: items.length,
            bullets: bullets.length,
        },
    };
}

function render() {
    const showCursor = state !== 'PLAYING' && state !== 'STAGE_INTRO' && state !== 'STAGE_CLEAR';
    setUiCursorVisible(showCursor);
    const snapshot = getRenderSnapshot();
    const useThreeBackground = snapshot.useThreeEffects;
    const useThreeGameplay = snapshot.useThreeGameplay;
    const useThreeOverlay = snapshot.useThreeOverlay;
    renderFlags.useThreeEffects = snapshot.useThreeEffects;
    renderFlags.useThreeGameplay = snapshot.useThreeGameplay;
    renderFlags.useThreeOverlay = snapshot.useThreeOverlay;

    if (useThreeBackground) {
        threeRenderer.render(snapshot);
        ctx.clearRect(0, 0, W, H);
    }

    if (threeGameplayRenderer) threeGameplayRenderer.render(snapshot);

    ctx.save();
    ctx.translate(snapshot.worldShakeX, snapshot.worldShakeY);
    if (useThreeBackground) renderThemeOverlay();
    else renderBackground();

    if (state === 'MENU') {
        renderMenuScreen();
    } else if (state === 'RANKING') {
        renderRanking();
    } else if (state === 'NAME_INPUT') {
        renderNameInput();
    } else {
        if (useThreeGameplay) renderBrickLabels();
        else if (state === 'STAGE_INTRO' && stageIntroBrickSnapshot) ctx.drawImage(stageIntroBrickSnapshot, 0, 0);
        else if (brickLayerCanvas) ctx.drawImage(brickLayerCanvas, 0, 0);
        else renderBricks();
        renderBrickFlashes();
        renderItems();
        renderBullets();
        renderBalls();
        renderPaddle();
        renderParticles();
        renderFloatingTexts();
        renderHUD();

        if (state === 'PAUSED') renderPausedScreen();
        else if (state === 'STAGE_INTRO') renderStageIntro();
        else if (state === 'STAGE_CLEAR') renderStageClear();
        else if (state === 'GAME_OVER') renderGameOver();
    }
    ctx.restore();

    if (useThreeOverlay) threeOverlayRenderer.render(snapshot);
}

// ═══════════════════════════════════════════════════════════════
// GAME LOOP
// ═══════════════════════════════════════════════════════════════
function loop() {
    update();
    render();
    requestAnimationFrame(loop);
}

setTheme('neon');
setUiCursorVisible(true);
requestAnimationFrame(loop);

})();
