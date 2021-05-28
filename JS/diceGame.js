'use strict'

const score0EL = document.querySelector('#score--0');
const scorer1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1t');
const diceEl = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const resetBtn = document.querySelector('.btn--new');

//this way too reset the game, this would be my way. ill refactor according to the course.
btnnew.addEventListener('click', function (){
    window.location.reload();
});

score0EL.textContent = 0;
scorer1EL.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function (){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
};

btnroll.addEventListener('click', function (){
    if(playing) {

    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.jpeg`;

    if(dice !== 1){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    } else {
        switchPlayer();
    }
}
});

btnhold.addEventListener('click', function () {
    if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if(scores[activePlayer] >= 100) {
        playing = false;
        diceEl.classList.add('hidden');
       document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }

    switchPlayer();

    }
})
