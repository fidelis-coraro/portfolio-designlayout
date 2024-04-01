const display = document.getElementById('display');
let currentNumber = '';
let previousNumber = '';
let operator = null;

const buttons = [
    '.', '←','-',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '+',
    '0', '00', '=' 
];
    
    
function createButtons() {
  const buttonGrid = document.querySelector('.button-grid');
  buttons.forEach(button => {
    const btn = document.createElement('button');
    btn.textContent = button;
    btn.classList.add('button');
    if (button === '=') {
        btn.classList.add('double-size-button');
      }
    buttonGrid.appendChild(btn);
  });
}

createButtons();

document.addEventListener('keydown', function(event) {
  const isNumberKey = event.key >= '0' && event.key <= '9';
  if (isNumberKey) {
    appendNumber(event.key);
  } else if (event.key === '.') {
    appendNumber('.');
  } else if (event.key === 'Enter' || event.key === '=') {
    calculate();
  } else if (['+', '-', '*', '/', '%'].includes(event.key)) {
    chooseOperator(event.key);
  } else if (event.key === 'c' || event.key === 'Escape') {
    clear();
  } else {
    alert('Only numbers are allowed');
  }
});

const buttonsContainer = document.querySelector('.button-grid');
buttonsContainer.addEventListener('click', function(event) {
  const clickedButton = event.target;
  const buttonValue = clickedButton.textContent;

  if (!isNaN(buttonValue)) {
    appendNumber(buttonValue);
  } else if (buttonValue === '.') {
    appendNumber('.');
  } else if (['+', '-', '*', '/', '%'].includes(buttonValue)) {
    chooseOperator(buttonValue);
  } else if (buttonValue === '=') {
    calculate();
  } else if (buttonValue === 'C') {
    clear();
  }
});

function appendNumber(number) {
  currentNumber += number;
  display.value = currentNumber;
}

function chooseOperator(op) {
  if (currentNumber === '') return;
  if (previousNumber !== '') {
    calculate();
  }
  operator = op;
  previousNumber = currentNumber;
  currentNumber = '';
}

function calculate() {
  if (previousNumber === '' || currentNumber === '' || operator === null) return;
  let result = 0;
  const prevNum = parseFloat(previousNumber);
  const currNum = parseFloat(currentNumber);
  switch (operator) {
    case '+':
      result = prevNum + currNum;
      break;
    case '-':
      result = prevNum - currNum;
      break;
    case '*':
      result = prevNum * currNum;
      break;
    case '/':
      if (currNum === 0) {
        alert('Division by zero!');
        return;
      }
      result = prevNum / currNum;
      break;
    case '%':
      result = prevNum % currNum;
      break;
  }
  display.value = result;
  previousNumber = '';
  currentNumber = result.toString();
  operator = null;
}

function clear() {
  currentNumber = '';
  previousNumber = '';
  operator = null;
  display.value = '';
}