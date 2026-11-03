const targets = document.getElementById("target");
const symbols = document.getElementById("symbol");
const messages = document.getElementById("message");
const hints = document.getElementById("hint");
const lastScore = document.getElementById("last");
const bestScore = document.getElementById("best");

let state = "idle";
let timeoutId;
let readyAt = 0;
let best = null;

const showPanel = (bgColor, textColor, symbol, message, hint) => {
  targets.style.backgroundColor = bgColor;
  targets.style.color = textColor;
  symbols.textContent = symbol;
  messages.textContent = message;
  hints.textContent = hint;
};

const startRound = () => {
  state = "waiting";
  showPanel("#4c0519", "#f4f4f5", "…", "Wait for green", "Not yet. Stay ready.");
  timeoutId = setTimeout(
    () => {
      state = "ready";
      showPanel("#fef08a", "#09090b", "!", "Click now!", "Go, go, go!");
      readyAt = performance.now();
    },
    2000 + Math.random() * 3000,
  );
};

const handleAction = () => {
  if (state === "waiting") {
    clearTimeout(timeoutId);
    state = "result";
    showPanel("#27272a", "#f4f4f5", "↻", "Too soon!", "Click to try again");
  } else if (state === "ready") {
    const milliseconds = Math.round(performance.now() - readyAt);
    best = best === null ? milliseconds : Math.min(best, milliseconds);
    lastScore.textContent = `${milliseconds} ms`;
    bestScore.textContent = `${best} ms`;
    state = "result";
    showPanel("#27272a", "#f4f4f5", "✓", `${milliseconds} ms`, "Click to play again");
  } else {
    startRound();
  }
};

targets.addEventListener("click", handleAction);