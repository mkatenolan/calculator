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
const modValue = calculator.dataset.modValue;

// change display content depending on key type

if (!action) {
  if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType ==='calculate') {
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
} else if (previousKeyType === 'operator' || 'calculate') {
  display.textContent = '0.'
}
  calculator.dataset.previousKeyType = 'decimal';
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

// if an operator is pressed

if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
  const firstValue = calculator.dataset.firstValue;
  const operator = calculator.dataset.operator;
  const secondValue = displayedNum;

  if (firstValue && operator && (previousKeyType !=='operator' && 'calculate')) {
    const calcValue = calculate (firstValue, operator, secondValue)
    display.textContent = calcValue;

    calculator.dataset.firstValue = calcValue;
  } else {
    calculator.dataset.firstValue = displayedNum;
  }

  calculator.dataset.previousKeyType = 'operator';
  calculator.dataset.operator = action;
}

// if equals is pressed

if (action === 'calculate') {
  const firstValue = calculator.dataset.firstValue;
  const secondValue = displayedNum;
  const operator = calculator.dataset.operator;

  if(firstValue){
    if (previousKeyType === 'calculate') {
      firstValue = displayedNum;
      secondValue = calculator.dataset.modValue;
    }
    display.textContent = calculate (firstValue, operator, secondValue);
  }

  calculator.dataset.modValue = secondValue;
  calculator.dataset.previousKeyType = 'calculate';
}

//clear key texContent
let clear = document.querySelector('#clear');

if (display.textContent !== '0') {
  clear.textContent = 'CE';
}

//if clear is pressed
if (action === 'clear') {
  if (clear.textContent === 'AC') {
    calculator.dataset.firstValue = '';
    calculator.dataset.operator = '';
    calculator.dataset.secondValue = '';
    calculator.dataset.modValue = '';
    calculator.dataset.previousKeyType = '';
  } else {
    clear.textContent = 'AC'
  }

  display.textContent = '0';

  calculator.dataset.previousKeyType = 'clear';
}

}
})
