//declare main variables

const calculator = document.querySelector ('.calculator');
const keys = document.querySelector ('.keys');
const display = document.querySelector ('#display');

//add event listener

keys.addEventListener('click', e=> {
  if (e.target.matches('button')) {

//declare other necessary variables

const key = e.target;
const action = key.dataset.action;
const keyType = key.textContent;
const displayedNum = display.textContent;
const previousKeyType = calculator.dataset.previousKeyType;

// change display content depending on key type

if (!action) {
  if (displayedNum === '0' || previousKeyType === 'operator') {
    display.textContent = keyType;
  } else {
    display.textContent = displayedNum + keyType;
  }
  calculator.dataset.previousKeyType = 'number';
}

// if decimal is pressed

if (action === 'decimal') {
  if(!displayedNum.includes('.')) {
  display.textContent = displayedNum + '.';
} else if (previousKeyType === 'operator') {
  display.textContent = '0.'
}
  calculator.dataset.previousKeyType = 'decimal';
}

// if an operator is pressed

if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
  calculator.dataset.previousKeyType = 'operator';
  calculator.dataset.firstValue = displayedNum;
  calculator.dataset.operator = action;
}

// basic calculation

const calculate = (n1, operator, n2) => {
  let result = '';

  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
}

// if equals is pressed

if (action === 'calculate') {
  const firstNum = calculator.dataset.firstValue;
  const secondNum = displayedNum;
  const operator = calculator.dataset.operator;

  display.textContent = calculate (firstNum, operator, secondNum);
  calculator.dataset.previousKeyType = 'calculate';
}

//clear key texContent
let clear = document.querySelector('#clear');

if (display.textContent !== '0') {
  clear.textContent = 'CE';
}

//if clear is pressed
if (action === 'clear') {

  display.textContent = '';
  clear.textContent = 'AC';

  calculator.dataset.previousKeyType = 'clear';
}

}
})
