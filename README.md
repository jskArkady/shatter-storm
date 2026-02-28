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

## 🎨 Themes

7 selectable visual themes, each with unique color palettes:

- **Neon** — Cyan & magenta cyberpunk
- **Retro** — Warm wheat & classic arcade tones
- **Inferno** — Deep reds & fiery orange
- **Cosmic** — Purple & pink nebula
- **Ocean** — Deep sea blue & cyan
- **Aurora** — Northern lights green & emerald
- **Sakura** — Cherry blossom pink & rose

## ⚡ Items

Items drop from destroyed bricks (45% chance):

| Item | Effect |
|---|---|
| ●●● Multi Ball | Spawns 15 extra balls |
| ◄► Wide Paddle | Expands paddle for 10 seconds |
| 🔥 Fire Ball | Ball pierces through bricks for 10 seconds |
| 🌟 Mega Ball | Giant ball that destroys everything for 8 seconds |

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
├── game.js      — All game logic (~1600 lines)
└── README.md
```

Built with vanilla HTML5 Canvas, CSS, and JavaScript. No dependencies.

## 🏆 Ranking

Top 10 scores are saved in `localStorage`. View rankings from the main menu.

---

*for elyse*