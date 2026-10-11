/* ============================================================
   HANGMAN — game logic.
   Lives: 6 misses allowed. A new game starts on every load and
   whenever the player clicks "New Word" or changes settings.
   ============================================================ */

// ---- Game state (reset by newGame) ----
let word = "";          // the secret word, e.g. "GIRAFFE"
let guessed = new Set();// letters the player has already tried
let misses = 0;         // wrong guesses so far
const MAX_MISSES = 6;
let category = "animals";
let difficulty = "medium";
let hintUsed = false;
let gameOver = false;

// ---- Persistent scoreboard (survives page reloads) ----
let score = 0;
let streak = 0;
let bestStreak = parseInt(localStorage.getItem("hangmanBest") || "0", 10);

// ---- DOM handles ----
const wordEl   = document.getElementById("word");
const keysEl   = document.getElementById("keyboard");
const msgEl    = document.getElementById("message");
const svgEl    = document.getElementById("hangman");
const scoreEl  = document.getElementById("score");
const streakEl = document.getElementById("streak");
const bestEl   = document.getElementById("best");
const overlay  = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText  = document.getElementById("overlayText");

/* The six body parts appear one by one as you miss.
   Their IDs match the SVG elements in index.html. */
const PARTS = ["head", "body", "armL", "armR", "legL", "legR"];

// ============================================================
//  GAME FLOW
// ============================================================

function newGame() {
  word = randomWord(category, difficulty); // randomWord() lives in words.js
  guessed = new Set();
  misses = 0;
  hintUsed = false;
  gameOver = false;
  document.getElementById("hintBtn").disabled = false;
  hideOverlay();
  buildWord();
  buildKeyboard();
  updateFigure();
  updateScoreboard();
  setMessage(`Guess the ${difficulty} ${category} word — ${word.length} letters. Good luck!`);
}

/* Render the word as blanks, filling in guessed letters. */
function buildWord() {
  wordEl.innerHTML = "";
  [...word].forEach(ch => {
    const slot = document.createElement("span");
    slot.className = "letter";
    slot.textContent = guessed.has(ch) ? ch : "";
    if (guessed.has(ch)) slot.classList.add("revealed");
    wordEl.appendChild(slot);
  });
}

/* Build the on-screen QWERTY keyboard, disabling used letters. */
function buildKeyboard() {
  keysEl.innerHTML = "";
  "QWERTYUIOPASDFGHJKLZXCVBNM".split("").forEach(ch => {
    const key = document.createElement("button");
    key.className = "key";
    key.textContent = ch;
    key.disabled = guessed.has(ch);
    if (guessed.has(ch)) key.classList.add(word.includes(ch) ? "correct" : "wrong");
    key.addEventListener("click", () => guess(ch));
    keysEl.appendChild(key);
  });
}

/* The heart of the game: one letter guessed. */
function guess(ch) {
  if (gameOver || guessed.has(ch)) return;   // ignore repeats & dead games
  guessed.add(ch);

  if (word.includes(ch)) {
    setMessage(`Nice — "${ch}" is in the word!`);
  } else {
    misses++;
    setMessage(`Nope — "${ch}" isn't there. ${MAX_MISSES - misses} ${MAX_MISSES - misses === 1 ? "life" : "lives"} left.`);
  }

  buildWord();
  buildKeyboard();
  updateFigure();
  checkEnd();
}

/* Reveal one unguessed letter — costs one miss. */
function useHint() {
  if (gameOver || hintUsed) return;
  const remaining = [...word].filter(ch => !guessed.has(ch));
  if (!remaining.length) return;
  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  hintUsed = true;
  document.getElementById("hintBtn").disabled = true;
  misses = Math.min(misses + 1, MAX_MISSES);  // hint costs a life
  guessed.add(pick);
  setMessage(`Hint revealed "${pick}" — but it cost you a life!`);
  buildWord();
  buildKeyboard();
  updateFigure();
  checkEnd();
}

/* Win, lose, or keep playing? */
function checkEnd() {
  const won = [...word].every(ch => guessed.has(ch));
  const lost = misses >= MAX_MISSES;

  if (won) {
    gameOver = true;
    const earned = POINTS[difficulty] - misses * 5;   // fewer misses = more points
    score += Math.max(earned, 10);                      // never less than 10
    streak++;
    if (streak > bestStreak) {
      bestStreak = streak;
      localStorage.setItem("hangmanBest", String(bestStreak)); // persist best
    }
    updateScoreboard();
    showOverlay("🎉 You got it!", `The word was <b>${word}</b>.<br>+${Math.max(earned, 10)} points · streak ${streak}`);
  } else if (lost) {
    gameOver = true;
    streak = 0;                                        // a miss resets the streak
    updateScoreboard();
    showOverlay("💀 Game over", `The word was <b>${word}</b>.<br>Better luck next time!`);
  }
}

// ============================================================
//  RENDERING HELPERS
// ============================================================

/* Show/hide SVG body parts according to the miss count. */
function updateFigure() {
  PARTS.forEach((id, i) => {
    const part = document.getElementById(id);
    const shown = i < misses;
    part.classList.toggle("visible", shown);
    part.classList.toggle("pop", shown);   // little pop animation each time
  });
}

/* Top scoreboard: score, current streak, best streak. */
function updateScoreboard() {
  scoreEl.textContent = score;
  streakEl.textContent = streak;
  bestEl.textContent = bestStreak;
}

function setMessage(text) { msgEl.textContent = text; }
function showOverlay(title, html) {
  overlayTitle.textContent = title;
  overlayText.innerHTML = html;
  overlay.classList.add("show");
}
function hideOverlay() { overlay.classList.remove("show"); }

// ============================================================
//  WIRING
// ============================================================

document.getElementById("newBtn").addEventListener("click", newGame);
document.getElementById("hintBtn").addEventListener("click", useHint);
document.getElementById("playAgainBtn").addEventListener("click", newGame);

document.getElementById("categorySel").addEventListener("change", e => {
  category = e.target.value;
  newGame();
});
document.getElementById("difficultySel").addEventListener("change", e => {
  difficulty = e.target.value;
  newGame();
});

/* Physical keyboard support — letters only. */
document.addEventListener("keydown", e => {
  if (/^[a-zA-Z]$/.test(e.key) && !overlay.classList.contains("show")) {
    guess(e.key.toUpperCase());
  } else if (e.key === "Enter" && overlay.classList.contains("show")) {
    newGame(); // Enter restarts after a win/lose
  }
});

newGame(); // go!
