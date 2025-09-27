// === Theme toggle ===
const body = document.body;
const themeBtn = document.getElementById("themeToggle");

function setTheme(theme) {
  body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeBtn.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
}

themeBtn.onclick = () => {
  const current = body.getAttribute("data-theme") || "light";
  setTheme(current === "light" ? "dark" : "light");
};

setTheme(localStorage.getItem("theme") || "light");

// === Navigation ===
const stopwatchBtn = document.getElementById("showStopwatch");
const timerBtn = document.getElementById("showTimer");
const stopwatchSection = document.getElementById("stopwatchSection");
const timerSection = document.getElementById("timerSection");

stopwatchBtn.onclick = () => {
  stopwatchBtn.classList.add("active");
  timerBtn.classList.remove("active");
  stopwatchSection.classList.add("active");
  timerSection.classList.remove("active");
};
timerBtn.onclick = () => {
  timerBtn.classList.add("active");
  stopwatchBtn.classList.remove("active");
  timerSection.classList.add("active");
  stopwatchSection.classList.remove("active");
};

// === Stopwatch ===
let stopwatchInterval,
  stopwatchTime = 0;
const stopwatchDisplay = document.getElementById("stopwatchDisplay");

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  let mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  let secs = String(totalSeconds % 60).padStart(2, "0");
  let milli = String(ms % 1000).padStart(3, "0");
  return `${hrs}:${mins}:${secs}:${milli}`;
}

document.getElementById("startStopwatch").onclick = () => {
  if (!stopwatchInterval) {
    let start = Date.now() - stopwatchTime;
    stopwatchInterval = setInterval(() => {
      stopwatchTime = Date.now() - start;
      stopwatchDisplay.textContent = formatTime(stopwatchTime);
    }, 10);
  }
};
document.getElementById("pauseStopwatch").onclick = () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
};
document.getElementById("resetStopwatch").onclick = () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchTime = 0;
  stopwatchDisplay.textContent = "00:00:00:000";
};

// === Timer ===
let timerInterval,
  timerTime = 0;
const timerDisplay = document.getElementById("timerDisplay");

function formatTimer(seconds) {
  let mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  let secs = String(seconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

document.getElementById("startTimer").onclick = () => {
  if (!timerInterval) {
    let mins = parseInt(document.getElementById("minutesInput").value) || 0;
    let secs = parseInt(document.getElementById("secondsInput").value) || 0;
    if (timerTime === 0) {
      timerTime = mins * 60 + secs;
    }
    timerDisplay.textContent = formatTimer(timerTime);
    timerInterval = setInterval(() => {
      if (timerTime > 0) {
        timerTime--;
        timerDisplay.textContent = formatTimer(timerTime);
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        alert("⏰ Time's up!");
      }
    }, 1000);
  }
};
document.getElementById("pauseTimer").onclick = () => {
  clearInterval(timerInterval);
  timerInterval = null;
};
document.getElementById("resetTimer").onclick = () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerTime = 0;
  timerDisplay.textContent = "00:00";
};
