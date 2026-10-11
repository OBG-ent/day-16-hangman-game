# 🎯 Hangman — The Classic Word Game

**The childhood classic, rebuilt with a slick dark UI: SVG figure that draws itself, 96 words across 4 categories and 3 difficulties, hints, scoring, and a persistent best-streak.**

## ✨ Features

- **Animated SVG hangman** — body parts pop in one by one with every miss
- **96 words** — 4 categories (🐾 Animals, 🍕 Food, 💻 Tech, ⚽ Sports) × 3 difficulties (3–5 / 6–8 / 9+ letters)
- **On-screen + physical keyboard** — tap the keys or just type; used letters turn green/red
- **Hint system** — reveals a letter at the cost of one life (one per round)
- **Scoring & streaks** — points scale with difficulty, minus penalties for misses; best streak saved in `localStorage`
- **Win/lose overlay** — reveals the word, press Enter to play again
- **Polished animations** — flipping letter tiles, sliding pop-ins, smooth fade-ins

## 🚀 Run it in 30 seconds

1. Open `index.html` in any browser (double-click — no server needed).
2. Pick a category and difficulty, then start guessing letters.
3. Six misses and the figure is complete — solve the word to keep your streak alive!

## 🧠 What this project practices

- **Game state management** — one `newGame()` that resets everything cleanly
- **`Set` for guessed letters** — O(1) lookups, no duplicate-guess bugs
- **SVG manipulation** — toggling classes on vector parts via `classList`
- **`localStorage`** — persisting the best streak across sessions
- **Event handling** — click + `keydown` listeners feeding the same `guess()` function
- **Modular JS** — word data (`words.js`) cleanly separated from game logic (`script.js`)

## 📁 Files

| File | What |
|------|------|
| `index.html` | Page structure + the SVG hangman figure |
| `style.css` | Dark theme, animations, responsive layout |
| `words.js` | The 96-word bank, difficulty point values |
| `script.js` | All game logic: guessing, scoring, streaks, hints |

*Day 16 · featured build of my daily coding journey.*
