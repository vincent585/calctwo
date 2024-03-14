const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearAllBtn = document.querySelector(".clear-all");
const deleteBtn = document.querySelector(".delete");

clearAllBtn.addEventListener("click", clearDisplay);
numbers.forEach((num) => num.addEventListener("click", appendToDisplay));

function appendToDisplay(event) {
  const num = event.target.value;
  if (display.textContent === "0") {
    display.textContent = num;
  } else {
    display.textContent += num;
  }
}

function clearDisplay() {
  display.textContent = "0";
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "ERR";
  }

  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      console.log("Unknown operator");
      break;
  }
}