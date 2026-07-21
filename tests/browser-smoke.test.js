const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { pathToFileURL } = require('node:url');
const { join, resolve } = require('node:path');

function findBrowser() {
    const candidates = [
        process.env.CHROME_BIN,
        'google-chrome',
        'google-chrome-stable',
        'chromium',
        'chromium-browser',
    ].filter(Boolean);

    for (const candidate of candidates) {
        const probe = spawnSync(candidate, ['--version'], { encoding: 'utf8' });
        if (probe.status === 0) return candidate;
    }

    return null;
}

test('index.html boots the layered canvas application in a real browser', { timeout: 60000 }, (t) => {
    const browser = findBrowser();
    if (!browser) {
        if (process.env.REQUIRE_BROWSER === '1') {
            assert.fail('Chrome or Chromium is required but was not found');
        }
        t.skip('Chrome or Chromium is not installed');
        return;
    }

    const pageUrl = pathToFileURL(resolve(__dirname, '..', 'index.html')).href;
    const userDataDir = mkdtempSync(join(tmpdir(), 'shatter-storm-chrome-'));
    let result;
    try {
        result = spawnSync(browser, [
            '--headless',
            '--no-sandbox',
            '--no-first-run',
            '--disable-background-networking',
            '--disable-dev-shm-usage',
            '--enable-unsafe-swiftshader',
            `--user-data-dir=${userDataDir}`,
            '--virtual-time-budget=1200',
            '--dump-dom',
            pageUrl,
        ], {
            encoding: 'utf8',
            maxBuffer: 4 * 1024 * 1024,
            timeout: 50000,
        });
    } finally {
        rmSync(userDataDir, { recursive: true, force: true });
    }

    assert.equal(result.status, 0, result.stderr || 'Browser process failed');
    assert.match(result.stdout, /<body class="is-ui-cursor">/);
    assert.match(result.stdout, /<canvas[^>]+id="game"[^>]+width="1600"[^>]+height="1200"/);
    assert.doesNotMatch(result.stderr, /ShatterLogic must load before three-renderer\.js/);
});
