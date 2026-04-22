# ⚡ Shatter Storm

A browser-based brick breaker game with neon graphics, satisfying destruction, and endless stages.

## 🎮 How to Play

Open `index.html` in any modern browser. No server or build tools required.

### Controls

| Input | Action |
|---|---|
| Mouse | Move paddle |
| Click / Space | Shoot bullets (10 per stage) |
| ESC / P | Pause |
| Q | Quit & save score |

### Rules

- Break all bricks to clear the stage
- Catch falling items for power-ups
- Don't let the ball fall — you have 3 lives
- Stages 1–10 are hand-designed; stage 11+ generates infinitely with random HP bricks
- Even early stages get a light density boost, while mid and late stages pack in much harder

## 🎨 Themes

6 selectable world themes, each with distinct background motion, brick materials, trails, and HUD styling:

- **Neon** — Original laser-grid cyber arcade
- **Black Site** — Tactical radar sweep and wireframe panels
- **Abyss** — Deep sea caustics and submerged glow
- **Forge** — Furnace haze and forged metal surfaces
- **Shrine Bloom** — Ink wash, lacquer tiles, and drifting petals
- **Storm Circuit** — Electric rain and overloaded grid flashes

## ⚡ Items

Items drop from destroyed bricks (45% chance):

| Item | Effect |
|---|---|
| ●●● Multi Ball | Spawns 15 extra balls |
| ◄► Wide Paddle | Expands paddle for 10 seconds |
| 🔥 Fire Ball | Ball pierces through bricks for 10 seconds |
| 🌟 Mega Ball | Giant ball for 8 seconds |

## 🏗️ Stage Design

| Stage | Layout | Rows |
|---|---|---|
| 1 | Welcome Wall | 20 |
| 2 | Pyramid | 28 |
| 3 | Mega Wall | 30 |
| 4 | Diamond | 30 |
| 5 | Stripe Frenzy | 36 |
| 6 | Checkerboard | 34 |
| 7 | Invader | 28 |
| 8 | Heart | 32 |
| 9 | Fortress | 39 |
| 10 | Ultimate Wall | 39 |
| 11+ | Endless (random HP) | 39 |

## 📁 Project Structure

```
brick-breaker/
├── index.html   — HTML shell (canvas + file links)
├── style.css    — Minimal stylesheet
├── game.js      — All game logic (~2500 lines)
├── three-renderer.js — Three.js background renderer
├── vendor/three.min.js — Local Three.js runtime
└── README.md
```

Built with HTML5 Canvas, CSS, JavaScript, and a locally vendored Three.js runtime. No server or build step required.

## ⚙️ Rendering

The game still runs by opening `index.html` directly in a browser. No server, bundler, or install step is required.

Recent rendering optimizations keep brick destruction effects stable without changing the local-file workflow:

- Bricks are composited through a dedicated layer canvas and rebuilt only when brick state changes
- Hit flashes are rendered as an overlay instead of forcing full frame brick restyling
- Particle rendering avoids unnecessary canvas state saves for most particle styles
- Ball trails scale down automatically when multi-ball counts get high
- Theme backgrounds now render through a stacked Three.js canvas while HUD and gameplay remain on the 2D canvas
- Ball trails and particle bursts now hand off to the Three.js layer when WebGL is available, while the 2D path remains as the fallback
- Brick hit shockwaves now render through the Three.js layer while the existing 2D brick flash remains in place as the topmost feedback pass
- A second top overlay Three.js canvas now handles the frontmost brick hit flash path when WebGL is available
- Item halos and combo pulses also route through that overlay Three.js layer, while the 2D canvas keeps the badge cores and readable text
- Bullet glows and paddle aura now use that same overlay layer, leaving the 2D canvas to draw the crisp gameplay cores
- Brick bodies, weak brick glow, and ball cores now render through a middle Three.js gameplay canvas, while the 2D canvas keeps brick HP labels, HUD, and other crisp overlays
- Full-screen white flashes were removed in favor of local brick impact feedback

## 🏆 Ranking

Top 5 scores are saved in `localStorage`. View rankings from the main menu. Each entry shows the date and time (hour:minute).

---

*for elyse*
