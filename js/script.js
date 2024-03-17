const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearAllBtn = document.querySelector(".clear-all");
const deleteBtn = document.querySelector(".delete");
const decimalBtn = document.querySelector(".decimal");

clearAllBtn.addEventListener("click", clearDisplay);
clearAllBtn.addEventListener("click", clearCalculator);
numbers.forEach((num) => num.addEventListener("click", appendToDisplay));
numbers.forEach((num) => num.addEventListener("click", updateOperand));

operators.forEach((operator) => operator.addEventListener("click", updateOperator));
decimalBtn.addEventListener("click", appendDecimal);
deleteBtn.addEventListener("click", deleteLastNumber);

const calculator = {
  firstOperand: null,
  operator: null,
  secondOperand: null,
}

function appendToDisplay(event) {
  const num = event.target.value;
  if (calculator.operator && !calculator.secondOperand) {
    display.textContent = num;
  } else if (display.textContent === "0") {
    display.textContent = num;
  } else {
    display.textContent += num;
  }
}

function updateOperand() {
  if (calculator.operator) {
    calculator.secondOperand = display.textContent;
  } else {
    calculator.firstOperand = display.textContent;
  }
}

function updateOperator(event) {
  let operator = event.target.value;

  if (operator === "=" && calculator.secondOperand) {
    evaluate();
  } else if (operator === "=") {
    return;
  } else if (calculator.secondOperand) {
    evaluate(operator);
  } else if (calculator.firstOperand) {
    calculator.operator = operator;
  }
}

function evaluate(newOperator = null) {
  let result = operate(calculator.operator, parseFloat(calculator.firstOperand), parseFloat(calculator.secondOperand));
  if (result === "ERR") {
    alert("Error occurred");
    clearCalculator();
    clearDisplay();
    return;
  }

  calculator.firstOperand = result;
  calculator.operator = newOperator;
  calculator.secondOperand = null;
  display.textContent = calculator.firstOperand;
}

function deleteLastNumber() {
  if (display.textContent.length === 1) {
    clearDisplay();
  } else {
    display.textContent = display.textContent.slice(0, -1);
  }
}

function appendDecimal() {
  if (validDecimalPlacement()) {
    display.textContent += ".";
  }
}

function validDecimalPlacement() {
  return !display.textContent.includes(".");
}

function clearDisplay() {
  display.textContent = "0";
}

function clearCalculator() {
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.secondOperand = null;
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