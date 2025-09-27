// Get references to the display elements
const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");

// Stores the current math expression as a string
let expression = "";

//If expression is empty, show "0"
function updateDisplay() {
  expressionEl.textContent = expression || "0";
}

// Appends a number/operator to the current expression.
function append(value) {
  expression += value;
  updateDisplay();
}

//Clears everything (expression + result).
function clearAll() {
  expression = "";
  resultEl.textContent = "0";
  updateDisplay();
}

// Removes the last character (like a backspace)
function backspace() {
  expression = expression.slice(0, -2);
  updateDisplay();
}

// Calculates the final result using eval().
// If expression is empty → show 0.
// If invalid expression → show "Error".
function calculateFinal() {
  try {
    if (expression.trim() === "") {
      // Nothing entered → result is 0
      resultEl.textContent = "0";
      return;
    }
    const val = eval(expression); // ⚠️ Using eval for simplicity
    resultEl.textContent = val;
    expression = String(val); // So user can continue calculating
    updateDisplay();
  } catch {
    resultEl.textContent = "Error";
  }
}

// Attach click handlers to all buttons with data-value
document.querySelectorAll("[data-value]").forEach((btn) => {
  btn.addEventListener("click", () => append(btn.getAttribute("data-value")));
});

// Attach click handlers to special buttons (clear, backspace, equals)
document.querySelectorAll("[data-action]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.getAttribute("data-action");
    if (action === "clear") clearAll();
    if (action === "back") backspace();
    if (action === "equals") calculateFinal();
  });
});

// Add keyboard support
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    calculateFinal();
  } else if (e.key === "Backspace") {
    e.preventDefault();
    backspace();
  } else if (e.key === "Escape") {
    e.preventDefault();
    clearAll();
  } else if (/^[0-9+\-*/().]$/.test(e.key)) {
    append(e.key);
  }
});

// Initialize display with "0"
updateDisplay();
