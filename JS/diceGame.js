'use strict'

const score0EL = document.querySelector('#score--0');
const scorer1EL = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

score0EL.textContent = 0;
scorer1EL.textContent = 0;
diceEl.classList.add('hidden');

btnroll.addEventListener('click', function (){
    let dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;


})