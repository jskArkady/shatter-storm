const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const projectRoot = resolve(__dirname, '..');
const indexSource = readFileSync(resolve(projectRoot, 'index.html'), 'utf8');
const gameSource = readFileSync(resolve(projectRoot, 'game.js'), 'utf8');
const rendererSource = readFileSync(resolve(projectRoot, 'three-renderer.js'), 'utf8');

test('browser scripts load pure rules before dependent renderers and game boot', () => {
    const scripts = [...indexSource.matchAll(/<script\s+src="([^"]+)"/g)].map(match => match[1]);

    assert.ok(scripts.indexOf('game-rules.js') < scripts.indexOf('three-renderer.js'));
    assert.ok(scripts.indexOf('three-renderer.js') < scripts.indexOf('game.js'));
});

test('Three renderers require the real depth-mesh rule instead of a permissive fallback', () => {
    assert.match(rendererSource, /ShatterLogic must load before three-renderer\.js/);
    assert.doesNotMatch(rendererSource, /isBrickDepthMeshEnabled\s*=\s*\(\)\s*=>\s*true/);
});

test('game ball capacity is passed to both Three.js ball render paths', () => {
    assert.match(gameSource, /maxTrails:\s*MAX_BALLS/);
    assert.match(gameSource, /maxBalls:\s*MAX_BALLS/);
    assert.match(rendererSource, /constructor\(\{ canvas, width, height, maxBalls = 220 \}\)/);
    assert.match(rendererSource, /this\.maxBalls = maxBalls/);
});

test('main canvas exposes keyboard focus and accessible instructions', () => {
    assert.match(indexSource, /id="game"[\s\S]*role="application"/);
    assert.match(indexSource, /tabindex="0"/);
    assert.match(indexSource, /aria-label="Shatter Storm game\./);
});

test('game loop consumes a fixed-step clock instead of updating once per render', () => {
    assert.match(gameSource, /advanceFixedStepClock\(\{/);
    assert.match(gameSource, /for \(let step = 0; step < fixedClock\.steps; step\+\+\)/);
    assert.doesNotMatch(gameSource, /function loop\(\) \{\s*update\(\);/);
});

test('input and renderer fallbacks cover interruption and non-mouse play', () => {
    assert.match(gameSource, /addEventListener\('pointermove'/);
    assert.match(gameSource, /pressedKeys\.has\('arrowright'\)/);
    assert.match(gameSource, /addEventListener\('visibilitychange'/);
    assert.match(gameSource, /backgroundRendererReady[\s\S]*&& threeGameplayRenderer/);
    assert.match(rendererSource, /addEventListener\('webglcontextlost'/);
});
