'use strict'

const score0EL = document.querySelector('#score--0');
const scorer1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1t');
const diceEl = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');


score0EL.textContent = 0;
scorer1EL.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;

btnroll.addEventListener('click', function (){
    let dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.jpeg`;

    if(dice !== 1){
        currentScore += dice;
        current0EL.textContent = currentScore;
    } else {

    }

})