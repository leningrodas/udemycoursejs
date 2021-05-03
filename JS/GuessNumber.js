'use strict'
//PRACTINCING DOM MANIPULATION
// console.log(document.querySelector('.message').textContent);
// // document.querySelector('.message').textContent = 'changing the text';
//
// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);
let answer = Math.trunc(Math.random()*20) + 1;
let score = 20;

document.querySelector('.check').addEventListener('click', function (){
    const guess = Number(document.querySelector('.guess').value)
    console.log(guess, typeof guess);

    if(!guess){
        document.querySelector('.message').textContent = 'No Number!';
    } else if (guess == answer){
        document.querySelector('.message').textContent = 'Correct GUESS!';
        document.querySelector('body').style.background = 'Green';
        document.querySelector('.number').textContent = answer;
    } else if(guess > answer || guess < answer) {
        if (score > 1) {

        document.querySelector('body').style.background = 'red';
        document.querySelector('.message').textContent = 'Guess out of range!';
        score--;
        document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = 'you lost';
    }
    } else {
        document.querySelector('.message').textContent = 'False, try again';
        document.querySelector('body').style.background = 'red';
        document.querySelector('.number').textContent = answer;
    }
});


document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    answer = Math.trunc(Math.random()*20) + 1;

    document.querySelector('.message').textContent = 'start guessing..';
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector(".guess").value = '';
    document.querySelector('body').style.backgroundColor = '#222';


});
