let firstOperand = null;
let operator = null;
let secondOperand = null;
let displayValue = '0';


function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            if (b === 0) return 'Error: Cannot divide by zero';
            return divide(a, b);
        default: return null;
    }
}

const previousOperandDisplay = document.querySelector('.previous-operand');
const currentOperandDisplay = document.querySelector('.current-operand');
const digitButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const equalsButton = document.querySelector('.equals');

function updateDisplay(){
    currentOperandDisplay.textContent = displayValue;
    previousOperandDisplay.textContent = firstOperand !== null ? firstOperand + ' ' + (operator || '') : '';
}

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (displayValue.startsWith('Error')) return;
        const digit = button.dataset.digit;

        if (digit === '.' && displayValue.includes('.')) return;
        if (displayValue.length >= 10) return;

        if(displayValue === '0' && digit !== '.') {
            displayValue = digit;
        } else {
            displayValue += digit;
        }

        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    if (displayValue.startsWith('Error')) return;
    button.addEventListener('click', () => {
        const selectedOperator = button.dataset.operator;

        if (firstOperand !== null && operator !== null) {
            firstOperand = operate(operator, parseFloat(firstOperand), parseFloat(displayValue));
        } else {
            firstOperand = displayValue;
        }

        operator = selectedOperator;
        displayValue = '0';
        updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    if (firstOperand === null || operator === null) return;

    const result = operate(operator, parseFloat(firstOperand), parseFloat(displayValue));
      if (typeof result === 'string') {
        displayValue = result;
        firstOperand = null;
        operator = null;
        updateDisplay();
        return;
      }
    displayValue = String(parseFloat(result.toFixed(10)));
    firstOperand = null;
    operator = null;
    updateDisplay();
})

clearButton.addEventListener('click', () => {
    firstOperand = null;
    operator = null;
    operator = null;
    displayValue = '0';
    updateDisplay();

});

deleteButton.addEventListener('click', () => {
    if (displayValue.length === 1) {
        displayValue = '0';
    } else {
        displayValue = displayValue.slice(0, -1);
    }
    updateDisplay();
});