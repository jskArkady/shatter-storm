(() => {
'use strict';

// ═══════════════════════════════════════════════════════════════
// THEMES
// ═══════════════════════════════════════════════════════════════
const THEMES = {
    neon: {
        name: 'N E O N',
        bg1: '#07071e', bg2: '#140a30',
        grid: 'rgba(60,40,120,0.12)',
        ball: '#00eeff', ballGlow: '#00eeff',
        paddle: '#00eeff', paddleDark: 'hsl(195,90%,30%)',
        brickHue: r => (r * 32 + 340) % 360, brickSat: 85, brickLight: 52,
        starCol: [200, 220, 255],
        text1: '#00eeff', text2: '#ff0055', text3: '#ffcc00',
        accent: '#00eeff',
        fireBall: '#ff6600', megaBall: '#ffd700',
        itemColors: { MULTI_BALL: '#ff0055', BOMB: '#ff6600', WIDE_PADDLE: '#ffcc00',
                      FIRE_BALL: '#ff3300', LIGHTNING: '#aa44ff', MEGA_BALL: '#ffd700' },
    },
    retro: {
        name: 'R E T R O',
        bg1: '#0f0f23', bg2: '#1a1a35',
        grid: 'rgba(60,60,100,0.08)',
        ball: '#f5deb3', ballGlow: '#daa520',
        paddle: '#f5deb3', paddleDark: '#8b6914',
        brickHue: r => [0, 25, 50, 85, 160, 220, 280, 310, 340, 15][r % 10],
        brickSat: 72, brickLight: 50,
        starCol: [255, 255, 200],
        text1: '#f5deb3', text2: '#ff6347', text3: '#98fb98',
        accent: '#f5deb3',
        fireBall: '#ff4500', megaBall: '#ffd700',
        itemColors: { MULTI_BALL: '#ff6347', BOMB: '#ff8c00', WIDE_PADDLE: '#f0e68c',
                      FIRE_BALL: '#ff4500', LIGHTNING: '#9370db', MEGA_BALL: '#ffd700' },
    },
    inferno: {
        name: 'I N F E R N O',
        bg1: '#120000', bg2: '#250808',
        grid: 'rgba(100,30,10,0.1)',
        ball: '#ff4500', ballGlow: '#ff2200',
        paddle: '#ff6600', paddleDark: '#993300',
        brickHue: r => [0, 10, 20, 30, 42, 50, 15, 5, 35, 25][r % 10],
        brickSat: 90, brickLight: 50,
        starCol: [255, 120, 50],
        text1: '#ff6600', text2: '#ff0000', text3: '#ffd700',
        accent: '#ff4500',
        fireBall: '#ffff00', megaBall: '#ffffff',
        itemColors: { MULTI_BALL: '#ff0000', BOMB: '#ff4500', WIDE_PADDLE: '#ffd700',
                      FIRE_BALL: '#ffff00', LIGHTNING: '#ff8c00', MEGA_BALL: '#ffffff' },
    },
    cosmic: {
        name: 'C O S M I C',
        bg1: '#0a0020', bg2: '#1a0040',
        grid: 'rgba(80,40,140,0.1)',
        ball: '#da70d6', ballGlow: '#ba55d3',
        paddle: '#da70d6', paddleDark: '#6a0080',
        brickHue: r => [270, 290, 310, 330, 250, 200, 180, 280, 300, 340][r % 10],
        brickSat: 78, brickLight: 55,
        starCol: [200, 150, 255],
        text1: '#da70d6', text2: '#ff69b4', text3: '#e0b0ff',
        accent: '#da70d6',
        fireBall: '#ff1493', megaBall: '#fffff0',
        itemColors: { MULTI_BALL: '#ff69b4', BOMB: '#ff1493', WIDE_PADDLE: '#e0b0ff',
                      FIRE_BALL: '#ff1493', LIGHTNING: '#9400d3', MEGA_BALL: '#fffff0' },
    },
    ocean: {
        name: 'O C E A N',
        bg1: '#001020', bg2: '#002040',
        grid: 'rgba(0,80,120,0.1)',
        ball: '#00e5ff', ballGlow: '#0097a7',
        paddle: '#00bcd4', paddleDark: '#006064',
        brickHue: r => [180, 190, 200, 210, 170, 195, 185, 205, 175, 215][r % 10],
        brickSat: 75, brickLight: 50,
        starCol: [100, 200, 255],
        text1: '#00e5ff', text2: '#26c6da', text3: '#80deea',
        accent: '#00e5ff',
        fireBall: '#ff8f00', megaBall: '#ffffff',
        itemColors: { MULTI_BALL: '#26c6da', BOMB: '#ff8f00', WIDE_PADDLE: '#80deea',
                      FIRE_BALL: '#ff8f00', LIGHTNING: '#00838f', MEGA_BALL: '#ffffff' },
    },
    aurora: {
        name: 'A U R O R A',
        bg1: '#000a14', bg2: '#001a1a',
        grid: 'rgba(0,100,80,0.1)',
        ball: '#69f0ae', ballGlow: '#00e676',
        paddle: '#69f0ae', paddleDark: '#1b5e20',
        brickHue: r => [120, 140, 160, 100, 80, 170, 150, 130, 110, 90][r % 10],
        brickSat: 70, brickLight: 52,
        starCol: [100, 255, 180],
        text1: '#69f0ae', text2: '#b2ff59', text3: '#00e676',
        accent: '#69f0ae',
        fireBall: '#ff6e40', megaBall: '#eeff41',
        itemColors: { MULTI_BALL: '#b2ff59', BOMB: '#ff6e40', WIDE_PADDLE: '#00e676',
                      FIRE_BALL: '#ff6e40', LIGHTNING: '#76ff03', MEGA_BALL: '#eeff41' },
    },
    sakura: {
        name: 'S A K U R A',
        bg1: '#1a0a14', bg2: '#2a1020',
        grid: 'rgba(120,40,80,0.1)',
        ball: '#f48fb1', ballGlow: '#f06292',
        paddle: '#f48fb1', paddleDark: '#880e4f',
        brickHue: r => [330, 340, 350, 320, 310, 0, 345, 335, 325, 315][r % 10],
        brickSat: 72, brickLight: 58,
        starCol: [255, 180, 200],
        text1: '#f48fb1', text2: '#ce93d8', text3: '#f8bbd0',
        accent: '#f48fb1',
        fireBall: '#ff5252', megaBall: '#ffffff',
        itemColors: { MULTI_BALL: '#ce93d8', BOMB: '#ff5252', WIDE_PADDLE: '#f8bbd0',
                      FIRE_BALL: '#ff5252', LIGHTNING: '#ab47bc', MEGA_BALL: '#ffffff' },
    },
};

let currentThemeKey = 'neon';
let theme = THEMES.neon;

function setTheme(key) {
    currentThemeKey = key;
    theme = THEMES[key];
    document.body.style.background = theme.bg1;
}

// ═══════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════
const W = 1600, H = 1200;
const PADDLE_BASE_W = 160, PADDLE_H = 15, PADDLE_Y = H - 55;
const BALL_R = 7, BALL_BASE_SPEED = 5;
const BRICK_COLS = 38, BRICK_PAD = 2;
const BRICK_OFFSET_TOP = 58, BRICK_OFFSET_LEFT = 16;
const BRICK_W = (W - BRICK_OFFSET_LEFT * 2 - BRICK_PAD * (BRICK_COLS - 1)) / BRICK_COLS;
const BRICK_H = 16;
const ITEM_SIZE = 24, ITEM_FALL_SPEED = 2.8;
const MAX_BALLS = 100, START_LIVES = 3;
const COMBO_WINDOW_MS = 1800;
const MULTI_BALL_COUNT = 15;
const EFFECT_DURATION_MS = 10000;
const RANKING_KEY = 'shatterStorm_v6';
const MAX_RANKING = 10;
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
const TOTAL_ITEM_WEIGHT = ITEM_TYPES.reduce((s, i) => s + i.weight, 0);
const ITEM_DROP_CHANCE = 0.45;

// ═══════════════════════════════════════════════════════════════
// CANVAS SETUP
// ═══════════════════════════════════════════════════════════════
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = W;
canvas.height = H;

function resizeCanvas() {
    const scale = Math.min(window.innerWidth / W, window.innerHeight / H, 1);
    canvas.style.width = (W * scale) + 'px';
    canvas.style.height = (H * scale) + 'px';
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

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
function spawnParticles(x, y, color, count = 15) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x, y,
            vx: rand(-6, 6), vy: rand(-7, 3),
            life: 1, decay: rand(0.013, 0.035),
            color, size: rand(2, 6),
        });
    }
}
function spawnCelebration(count = 120) {
    for (let i = 0; i < count; i++) {
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
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
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
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.12; p.life -= p.decay;
        if (p.life <= 0) particles.splice(i, 1);
    }
}
function renderParticles() {
    for (const p of particles) {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
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
    for (const s of stars) { s.y -= s.speed; if (s.y < 0) { s.y = H; s.x = rand(0, W); } }
}

function renderBackground() {
    const grd = ctx.createLinearGradient(0, 0, 0, H);
    grd.addColorStop(0, theme.bg1); grd.addColorStop(1, theme.bg2);
    ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = theme.grid; ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    const sc = theme.starCol;
    for (const s of stars) {
        ctx.globalAlpha = s.brightness;
        ctx.fillStyle = `rgb(${sc[0]},${sc[1]},${sc[2]})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
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
function loadRanking() {
    try { const d = localStorage.getItem(RANKING_KEY); return d ? JSON.parse(d) : []; } catch { return []; }
}
function saveRanking(ranking) {
    try { localStorage.setItem(RANKING_KEY, JSON.stringify(ranking)); } catch {}
}
function addRankingEntry(name, sc, lvl) {
    const ranking = loadRanking();
    ranking.push({ name, score: sc, level: lvl, date: new Date().toLocaleDateString('ko-KR') });
    ranking.sort((a, b) => b.score - a.score);
    if (ranking.length > MAX_RANKING) ranking.length = MAX_RANKING;
    saveRanking(ranking); return ranking;
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
let bulletsLeft = BULLETS_PER_STAGE;
let paddle = { x: W / 2, w: PADDLE_BASE_W, targetW: PADDLE_BASE_W };
let mouseX = W / 2, mouseY = H / 2;
let shake = { x: 0, y: 0, intensity: 0 };
let effects = { widePaddle: 0, fireBall: 0, slowBall: 0, megaBall: 0 };
let stageTimer = 0;
let nameInput = '';
let flashEffect = { alpha: 0 };
let frameCount = 0;
let comboDisplay = { value: 0, scale: 1, alpha: 0, label: '' };

const COMBO_LABELS = [
    [3,  'COMBO!'],
    [5,  'GREAT!'],
    [10, 'AMAZING!'],
    [20, 'UNSTOPPABLE!'],
    [30, 'GODLIKE!'],
];

function getComboLabel(c) {
    let label = '';
    for (const [threshold, text] of COMBO_LABELS) {
        if (c >= threshold) label = text;
    }
    return label;
}

// ═══════════════════════════════════════════════════════════════
// BALL MANAGEMENT
// ═══════════════════════════════════════════════════════════════
function getLevelDef(idx) {
    return idx < LEVELS.length ? LEVELS[idx] : generateEndlessLevel(idx);
}

function currentBallSpeed() {
    const lvl = getLevelDef(level);
    let speed = BALL_BASE_SPEED * lvl.speed;
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

function loadLevel(idx) {
    const def = idx < LEVELS.length ? LEVELS[idx] : generateEndlessLevel(idx);
    bricks = [];
    for (let r = 0; r < def.rows.length; r++) {
        for (let c = 0; c < def.rows[r].length; c++) {
            const hp = def.rows[r][c];
            if (hp <= 0) continue;
            bricks.push({
                x: BRICK_OFFSET_LEFT + c * (BRICK_W + BRICK_PAD),
                y: BRICK_OFFSET_TOP + r * (BRICK_H + BRICK_PAD),
                w: BRICK_W, h: BRICK_H,
                hp, maxHp: hp, row: r,
                alive: true, flashTimer: 0,
            });
        }
    }
    items = [];
    bullets = [];
    bulletsLeft = BULLETS_PER_STAGE;
    effects = { widePaddle: 0, fireBall: 0, slowBall: 0, megaBall: 0 };
    paddle.targetW = PADDLE_BASE_W;
    combo = 0;
    spawnInitialBall();
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
    spawnParticles(bx, by, brickColor(br), 15);
    const pts = Math.floor(([0, 10, 25, 50][br.maxHp] || 10) * scoreMultiplier);
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
    flashEffect.alpha = 0.25;
    switch (item.type.id) {
        case 'MULTI_BALL': {
            playSound('multiBall');
            shake.intensity = 14;
            const src = balls[0] || { x: W / 2, y: H / 2 };
            const count = Math.min(MULTI_BALL_COUNT, MAX_BALLS - balls.length);
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 1.5 - Math.PI * 0.75;
                balls.push(createBall(src.x, src.y, angle));
            }
            break;
        }
        case 'WIDE_PADDLE':
            effects.widePaddle = EFFECT_DURATION_MS;
            paddle.targetW = PADDLE_BASE_W * 2.5;
            break;
        case 'FIRE_BALL':
            effects.fireBall = EFFECT_DURATION_MS;
            break;
        case 'MEGA_BALL':
            playSound('megaBall');
            effects.megaBall = 8000;
            effects.fireBall = 8000;
            shake.intensity = 10;
            break;
    }
}

// ═══════════════════════════════════════════════════════════════
// GAME LOGIC
// ═══════════════════════════════════════════════════════════════
function startGame() {
    score = 0; lives = START_LIVES; level = 0;
    maxCombo = 0; combo = 0; particles = []; floatingTexts = [];
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
    updateFloatingTexts();

    if (flashEffect.alpha > 0) flashEffect.alpha *= 0.9;
    if (shake.intensity > 0.3) {
        shake.x = rand(-1, 1) * shake.intensity;
        shake.y = rand(-1, 1) * shake.intensity;
        shake.intensity *= 0.87;
    } else { shake.x = shake.y = shake.intensity = 0; }

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
        if (b.trail.length > (isMega ? 12 : 8)) b.trail.shift();

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
        for (const br of bricks) {
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
            br.flashTimer = 6;
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
            const hpBonus = [0, 10, 25, 50];
            const base = hpBonus[br.maxHp] || 10;
            const comboMult = 1 + Math.min(combo, 30) * 0.3;
            const pts = Math.floor(base * comboMult);
            score += pts;
            addFloatingText(br.x + br.w / 2, br.y + br.h / 2, `+${pts}`, theme.text3);

            if (combo >= 5) shake.intensity = Math.min(combo * 1.2, 20);

            if (br.hp <= 0) {
                br.alive = false;
                spawnParticles(br.x + br.w / 2, br.y + br.h / 2, brickColor(br), isMega ? 25 : 18);
                tryDropItem(br.x + br.w / 2, br.y + br.h / 2);
            }
            break;
        }

        // Lost
        if (b.y - effectiveR > H) balls.splice(i, 1);
    }

    // All balls lost
    if (balls.length === 0) {
        lives--; combo = 0;
        if (lives <= 0) { playSound('gameOver'); state = 'GAME_OVER'; }
        else { playSound('die'); spawnInitialBall(); }
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
        for (const br of bricks) {
            if (!br.alive) continue;
            if (bl.x > br.x - BULLET_W / 2 && bl.x < br.x + br.w + BULLET_W / 2 &&
                bl.y > br.y && bl.y < br.y + br.h) {
                br.hp--;
                br.flashTimer = 6;
                playSound('brick');
                if (br.hp <= 0) {
                    spawnParticles(br.x + br.w / 2, br.y + br.h / 2, brickColor(br), 12);
                    const pts = [0, 10, 25, 50][br.maxHp] || 10;
                    score += pts;
                    addFloatingText(br.x + br.w / 2, br.y + br.h / 2, `+${pts}`, theme.text3);
                    br.alive = false;
                    tryDropItem(br.x + br.w / 2, br.y + br.h / 2);
                }
                hit = true;
                break;
            }
        }
        if (hit) { bullets.splice(i, 1); }
    }

    // Stage clear
    if (bricks.every(b => !b.alive)) {
        playSound('levelClear');
        spawnCelebration(140);
        state = 'STAGE_CLEAR'; stageTimer = 120;
    }

    for (const br of bricks) { if (br.flashTimer > 0) br.flashTimer--; }
}

// ═══════════════════════════════════════════════════════════════
// RENDERING
// ═══════════════════════════════════════════════════════════════
function renderBricks() {
    for (const br of bricks) {
        if (!br.alive) continue;
        const color = brickColor(br);
        ctx.shadowColor = color; ctx.shadowBlur = 10;

        if (br.flashTimer > 0) {
            ctx.fillStyle = '#fff';
        } else {
            const grd = ctx.createLinearGradient(br.x, br.y, br.x, br.y + br.h);
            const hue = theme.brickHue(br.row);
            grd.addColorStop(0, color);
            grd.addColorStop(1, hsl(hue, theme.brickSat, theme.brickLight - 18));
            ctx.fillStyle = grd;
        }

        const r = 3;
        ctx.beginPath();
        ctx.moveTo(br.x + r, br.y);
        ctx.lineTo(br.x + br.w - r, br.y);
        ctx.arcTo(br.x + br.w, br.y, br.x + br.w, br.y + r, r);
        ctx.lineTo(br.x + br.w, br.y + br.h - r);
        ctx.arcTo(br.x + br.w, br.y + br.h, br.x + br.w - r, br.y + br.h, r);
        ctx.lineTo(br.x + r, br.y + br.h);
        ctx.arcTo(br.x, br.y + br.h, br.x, br.y + br.h - r, r);
        ctx.lineTo(br.x, br.y + r);
        ctx.arcTo(br.x, br.y, br.x + r, br.y, r);
        ctx.closePath(); ctx.fill();

        if (br.hp > 1) {
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(br.hp, br.x + br.w / 2, br.y + br.h / 2);
        }
        ctx.shadowBlur = 0;
    }
}

function renderBalls() {
    const isMega = effects.megaBall > 0;
    for (const b of balls) {
        const effectiveR = isMega ? BALL_R * MEGA_BALL_SCALE : BALL_R;
        const color = isMega ? theme.megaBall : effects.fireBall > 0 ? theme.fireBall : theme.ball;
        const trailColor = isMega ? theme.megaBall : effects.fireBall > 0 ? theme.fireBall : theme.ballGlow;

        // Trail
        for (let j = 0; j < b.trail.length; j++) {
            const t = b.trail[j];
            ctx.globalAlpha = (j / b.trail.length) * 0.35;
            ctx.fillStyle = trailColor;
            const sz = effectiveR * (j / b.trail.length) * 0.7;
            ctx.beginPath(); ctx.arc(t.x, t.y, sz, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;

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
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#fff7aa';
        ctx.fillRect(bl.x - BULLET_W / 2, bl.y - BULLET_H, BULLET_W, BULLET_H);
        ctx.shadowBlur = 0;
        ctx.restore();
    }
}

function renderPaddle() {
    const px = paddle.x - paddle.w / 2, py = PADDLE_Y, pw = paddle.w;
    const color = effects.widePaddle > 0 ? theme.text3 : theme.paddle;
    ctx.shadowColor = color; ctx.shadowBlur = 22;

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

function renderItems() {
    for (const it of items) {
        ctx.shadowColor = it.color;
        ctx.shadowBlur = 12 + it.glow * 5;
        ctx.fillStyle = it.color;
        ctx.beginPath(); ctx.arc(it.x, it.y, ITEM_SIZE / 2, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(it.type.label, it.x, it.y);
    }
}

function renderHUD() {
    ctx.shadowBlur = 0; ctx.textBaseline = 'top';

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
        ctx.shadowColor = col; ctx.shadowBlur = 20;
        ctx.fillText(`${comboDisplay.value}x ${comboDisplay.label}`, W / 2, H / 2 - 70);
        ctx.restore();
    }

    // Effects bar
    const active = [];
    if (effects.widePaddle > 0) active.push({ name: 'WIDE', color: theme.text3, t: effects.widePaddle / EFFECT_DURATION_MS });
    if (effects.fireBall > 0 && effects.megaBall <= 0) active.push({ name: 'FIRE', color: theme.fireBall, t: effects.fireBall / EFFECT_DURATION_MS });
    if (effects.slowBall > 0) active.push({ name: 'SLOW', color: theme.ball, t: effects.slowBall / EFFECT_DURATION_MS });
    if (effects.megaBall > 0) active.push({ name: 'MEGA', color: theme.megaBall, t: effects.megaBall / 8000 });

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

// UI button rects (computed during render)
let themeButtons = [];
let startButton = null;
let rankingButton = null;
let pauseButtons = { resume: null, quit: null };

function renderMenuScreen() {
    const pulse = 0.7 + Math.sin(frameCount * 0.05) * 0.3;

    neonText('SHATTER STORM', W / 2, H * 0.24, 64, `rgba(${hexToRgb(theme.text1)},${pulse})`, 30);

    // START button
    const sbW = 240, sbH = 52;
    const sbX = W / 2 - sbW - 12, sbY = H * 0.38;
    startButton = { x: sbX, y: sbY, w: sbW, h: sbH };

    const isHoverStart = mouseX >= sbX && mouseX <= sbX + sbW && mouseY >= sbY && mouseY <= sbY + sbH;
    ctx.fillStyle = isHoverStart ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)';
    ctx.strokeStyle = theme.text3;
    ctx.lineWidth = 2;
    ctx.shadowColor = theme.text3;
    ctx.shadowBlur = isHoverStart ? 20 : 10;
    ctx.beginPath();
    roundRect(ctx, sbX, sbY, sbW, sbH, 8);
    ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0;
    neonText('▶  START GAME', sbX + sbW / 2, sbY + sbH / 2, 22, theme.text3, 10);

    // RANKING button
    const rbW = 240, rbH = 52;
    const rbX = W / 2 + 12, rbY = H * 0.38;
    rankingButton = { x: rbX, y: rbY, w: rbW, h: rbH };
    const isHoverRank = mouseX >= rbX && mouseX <= rbX + rbW && mouseY >= rbY && mouseY <= rbY + rbH;
    ctx.fillStyle = isHoverRank ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)';
    ctx.strokeStyle = theme.text2;
    ctx.lineWidth = 2;
    ctx.shadowColor = theme.text2;
    ctx.shadowBlur = isHoverRank ? 20 : 10;
    ctx.beginPath();
    roundRect(ctx, rbX, rbY, rbW, rbH, 8);
    ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0;
    neonText('🏆  RANKING', rbX + rbW / 2, rbY + rbH / 2, 22, theme.text2, 10);

    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.font = '13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Mouse: Move Paddle  |  Click / Space: Shoot  |  ESC / P: Pause  |  Q: Quit & Save', W / 2, H * 0.52);
    ctx.fillText('🔴Multi Ball  ◄►Wide  🔥Fire  🌟Mega', W / 2, H * 0.57);

    // Theme selector
    const keys = Object.keys(THEMES);
    const btnW = 140, btnH = 42, gap = 12;
    const totalW = keys.length * (btnW + gap) - gap;
    const startX = W / 2 - totalW / 2;
    const btnY = H * 0.68;
    themeButtons = [];

    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '12px sans-serif';
    ctx.fillText('SELECT THEME', W / 2, btnY - 16);

    keys.forEach((key, i) => {
        const bx = startX + i * (btnW + gap);
        const t = THEMES[key];
        const isSelected = key === currentThemeKey;
        const isHover = mouseX >= bx && mouseX <= bx + btnW && mouseY >= btnY && mouseY <= btnY + btnH;

        themeButtons.push({ key, x: bx, y: btnY, w: btnW, h: btnH });

        ctx.fillStyle = isSelected ? 'rgba(255,255,255,0.12)' : isHover ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)';
        ctx.strokeStyle = isSelected ? t.accent : isHover ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)';
        ctx.lineWidth = isSelected ? 2 : 1;
        if (isSelected) { ctx.shadowColor = t.accent; ctx.shadowBlur = 12; }
        ctx.beginPath();
        roundRect(ctx, bx, btnY, btnW, btnH, 6);
        ctx.fill(); ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = isSelected ? '#fff' : 'rgba(255,255,255,0.6)';
        ctx.font = `bold 13px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(t.name, bx + btnW / 2, btnY + 14);

        for (let c = 0; c < 8; c++) {
            const hue = t.brickHue(c);
            ctx.fillStyle = hsl(hue, t.brickSat, t.brickLight);
            ctx.fillRect(bx + 10 + c * (btnW - 20) / 8, btnY + 28, (btnW - 20) / 8 - 1, 6);
        }
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
    neonText('✕  QUIT & SAVE', W / 2, qbY + rbH / 2, 18, '#ff4466', 6);

    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('ESC / P: Resume  |  Q: Quit & Save Score', W / 2, H * 0.82);
}

function renderStageIntro() {
    const progress = 1 - stageTimer / 90;
    const alpha = progress < 0.3 ? progress / 0.3 : progress > 0.7 ? (1 - progress) / 0.3 : 1;
    ctx.globalAlpha = Math.min(alpha * 1.5, 1);
    neonText(`STAGE ${level + 1}`, W / 2, H * 0.38, 62, theme.text1, 28);
    const def = getLevelDef(level);
    const cnt = def.rows.flat().filter(v => v > 0).length;
    neonText(`${cnt} BRICKS`, W / 2, H * 0.5, 24, theme.fireBall || '#ff6600', 10);
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
    const blink = Math.sin(frameCount * 0.06) * 0.4 + 0.6;
    ctx.globalAlpha = blink;
    neonText('Press ENTER to confirm', W / 2, H * 0.7, 17, '#00ff88', 6);
    ctx.globalAlpha = 1;
}

function renderRanking() {
    ctx.fillStyle = 'rgba(0,0,0,0.88)'; ctx.fillRect(0, 0, W, H);
    neonText('🏆 TOP 10 RANKING', W / 2, 55, 34, theme.text3, 16);

    const ranking = loadRanking();
    const sy = 110, rh = 42;

    ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('RANK', 60, sy - 10);
    ctx.fillText('NAME', W * 0.2, sy - 10);
    ctx.textAlign = 'right';
    ctx.fillText('SCORE', W * 0.55, sy - 10);
    ctx.fillText('STAGE', W * 0.72, sy - 10);
    ctx.fillText('DATE', W * 0.88, sy - 10);

    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath(); ctx.moveTo(50, sy + 6); ctx.lineTo(W - 50, sy + 6); ctx.stroke();

    for (let i = 0; i < ranking.length; i++) {
        const r = ranking[i], y = sy + 20 + i * rh;
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`;
        const rc = i < 3 ? NEON[i] : 'rgba(255,255,255,0.7)';

        ctx.fillStyle = rc; ctx.font = i < 3 ? 'bold 17px sans-serif' : '16px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(medal, 65, y + 5);
        ctx.fillText(r.name, W * 0.2, y + 5);
        ctx.textAlign = 'right';
        ctx.fillText(r.score.toLocaleString(), W * 0.55, y + 5);
        ctx.fillText(`Stage ${r.level}`, W * 0.72, y + 5);
        ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.font = '12px sans-serif';
        ctx.fillText(r.date, W * 0.88, y + 5);
    }

    if (ranking.length === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '17px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('No records yet. Play a game!', W / 2, H * 0.5);
    }

    const blink = Math.sin(frameCount * 0.06) * 0.4 + 0.6;
    ctx.globalAlpha = blink;
    neonText('Click or Enter to return to menu', W / 2, H - 45, 15, theme.accent, 6);
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
function render() {
    // Dynamic cursor: show pointer on UI screens, hide during gameplay
    const showCursor = state !== 'PLAYING' && state !== 'STAGE_INTRO' && state !== 'STAGE_CLEAR';
    canvas.style.cursor = showCursor ? 'default' : 'none';

    ctx.save();
    ctx.translate(shake.x, shake.y);
    renderBackground();

    if (state === 'MENU') {
        renderMenuScreen();
    } else if (state === 'RANKING') {
        renderRanking();
    } else if (state === 'NAME_INPUT') {
        renderNameInput();
    } else {
        renderBricks();
        renderItems();
        renderBullets();
        renderBalls();
        renderPaddle();
        renderParticles();
        renderFloatingTexts();
        renderHUD();

        if (flashEffect.alpha > 0.01) {
            ctx.fillStyle = `rgba(255,255,255,${flashEffect.alpha})`;
            ctx.fillRect(-20, -20, W + 40, H + 40);
        }

        if (state === 'PAUSED') renderPausedScreen();
        else if (state === 'STAGE_INTRO') renderStageIntro();
        else if (state === 'STAGE_CLEAR') renderStageClear();
        else if (state === 'GAME_OVER') renderGameOver();
    }
    ctx.restore();
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
requestAnimationFrame(loop);

})();
