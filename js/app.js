let display = document.getElementById("display");
let operator = null;
let operand1 = null;

function appendNumber(number) {
    // Avoid multiple decimal points in a number
    if (number === '.' && display.value.includes('.') && !operator) {
        return;
    }
    display.value += number;
}

function appendOperator(op) {
    // Prevent multiple operators
    if (operator && !display.value.endsWith(operator)) {
        calculate(); // Calculate the previous operation before adding a new operator
        display.value += op;
    } else if (!operator && display.value !== "") {
        operator = op;
        operand1 = parseFloat(display.value);
        display.value += op;
    }
}

function calculate() {
    if (operator === null) return; // Prevent undefined error

    let operand2 = parseFloat(display.value.substring(display.value.lastIndexOf(operator) + 1));
    let result;

    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            if (operand2 === 0) {
                result = "Error";
            } else {
                result = operand1 / operand2;
            }
            break;
    }

    display.value = result;
    operator = null;
    operand1 = result; // Allow further calculations
}

function clearDisplay() {
    display.value = "";
    operator = null;
    operand1 = null;
}

document.addEventListener("keydown", function(event) {
    let key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === "+") {
        appendOperator("+");
    } else if (key === "-") {
        appendOperator("-");
    } else if (key === "*") {
        appendOperator("*");
    } else if (key === "/") {
        appendOperator("/");
    } else if (key === ".") {
        appendNumber(".");
    } else if (key === "=" || key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    } else if (key === "Delete") {
        clearDisplay();
    }
});

// Toggle theme between day and night
function toggleTheme() {
    document.body.classList.toggle("night-mode");
}
