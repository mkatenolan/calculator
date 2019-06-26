const calculator = document.querySelector ('.calculator');
const keys = document.querySelector ('.keys');
const display = document.querySelector ('#display');

keys.addEventListener('click', e=> {
  if (e.target.matches('button')) {

const key = e.target;
const action = e.dataset.action;
const keyType = key.textContent;
const displayedNum = display.textContent;




  }
})
