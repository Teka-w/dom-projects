const targetEl = document.getElementById("target");
const symbolEl = document.getElementById("symbol");
const messageEl = document.getElementById("message");
const hintEl = document.getElementById("hint");
const lastEl = document.getElementById("last");
const bestEl = document.getElementById("best");
const statusEl = document.getElementById("status"); 

let state = "idle";
let timeoutId;
let readyAt = 0;
let best = null;

const showPanel = (background, text, symbol, message, hint) => {
  targetEl.classList.remove("bg-zinc-800", "bg-rose-950", "bg-lime-200", "text-zinc-100", "text-zinc-950");
  targetEl.classList.add(background, text);
  symbolEl.textContent = symbol;
  messageEl.textContent = message;
  hintEl.textContent = hint;
  
  if (statusEl) {
    statusEl.textContent = message;
  }
};

const startRound = () => {
  state = "waiting";
  showPanel("bg-rose-950", "text-zinc-100", "…", "Wait for green", "Not yet. Stay ready.");
  timeoutId = setTimeout(
    () => {
      state = "ready";
      showPanel("bg-lime-200", "text-zinc-950", "!", "Click now!", "Go, go, go!");
      readyAt = performance.now();
    },
    2000 + Math.random() * 3000,
  );
};

const handleAction = () => {
  if (state === "waiting") {
    clearTimeout(timeoutId);
    state = "result";
    showPanel("bg-zinc-800", "text-zinc-100", "↻", "Too soon!", "Click to try again");
  } else if (state === "ready") {
    const milliseconds = Math.round(performance.now() - readyAt);
    best = best === null ? milliseconds : Math.min(best, milliseconds);
    lastEl.textContent = `${milliseconds} ms`;
    bestEl.textContent = `${best} ms`;
    state = "result";
    showPanel("bg-zinc-800", "text-zinc-100", "✓", `${milliseconds} ms`, "Click to play again");
  } else {
    startRound();
  }
};

targetEl.addEventListener("click", handleAction);