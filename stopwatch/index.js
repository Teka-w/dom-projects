const text = document.getElementById("text")
const hourTimer = document.getElementById("hour")
const minutesTimer = document.getElementById("minute")
const secondsTimer = document.getElementById("second")
const startButton = document.getElementById("start-button")
const pauseButton = document.getElementById("pause-button")
const resetButton = document.getElementById("reset-button")


let intervalId;
let startTime = 0;


const formatTime = (startTime) => {
  const hours = Math.floor(startTime / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((startTime % 3600) / 60).toString().padStart(2, "0");
  const seconds = Math.floor(startTime % 60).toString().padStart(2, "0");

  hourTimer.textContent = hours;
  minutesTimer.textContent = minutes;
  secondsTimer.textContent = seconds;
}



const startTimer = () => {
  intervalId = setInterval(() => {
    startTime++;
    formatTime(startTime);
  },1000)

  text.textContent = "Running";
  
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
}

const pauseTimer = () => {
  clearInterval(intervalId);

  text.textContent = "Paused";
  startButton.textContent = "Resume"
  startButton.disabled = false;
  pauseButton.disabled = true;
  
}

const resetTimer = () => {
  clearInterval(intervalId);
  startTime = 0;
  formatTime(startTime);

  text.textContent = "Ready";
  startButton.textContent = "Start"
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);