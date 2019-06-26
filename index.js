const calculator = document.querySelector ('.calculator');
const keys = document.querySelector ('.keys');
const display = document.querySelector ('#display');

keys.addEventListener('click', e=> {
  if (e.target.matches('button')) {

const key = e.target;
const action = key.dataset.action;
const keyType = key.textContent;
const displayedNum = display.textContent;
const previousKeyType = calculator.dataset.previousKeyType;

if (!action) {
  if (displayedNum === '0' || previousKeyType === 'operator') {
    display.textContent = keyType;
  } else {
    display.textContent = displayedNum + keyType;
  }
}

if (action === 'decimal') {
  display.textContent = displayedNum + '.'
}

if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
  calculator.dataset.previousKeyType = 'operator';
  calculator.dataset.firstValue = displayedNum;
  calculator.dataset.operator = action;
}

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

if (action === 'calculate') {
  const firstNum = calculator.dataset.firstValue;
  const secondNum = displayedNum;
  const operator = calculator.dataset.operator;

  display.textContent = calculate (firstNum, operator, secondNum)
}

}
})
