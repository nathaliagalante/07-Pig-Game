'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const initGame = () => {
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    diceEl.classList.add('hidden');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}

initGame();

const switchPlayer = () => {
        document.getElementById(`current--${activePlayer}`).textContent = 0;

        activePlayer = activePlayer === 0 ? 1 : 0;

        currentScore = 0;

        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
}

//rolling dice functionality
btnRoll.addEventListener('click', function() {
    if(playing){
         //1. generating dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. check for rolled 1: if true, switch for next player
        if(dice !== 1){
            //add dice to current score 
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
            switchPlayer();
        }
    } 
});

//holding dice functionality
btnHold.addEventListener('click', function() {
    if(playing){
        //1. add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //2. check if player's score is >= 100
        if(scores[activePlayer] >= 20){
            playing = false;

            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

            document.getElementById(`score--${activePlayer}`).textContent = `Winner!`;
            
        }else{
            switchPlayer();
        }
    }

});

btnNew.addEventListener('click', initGame);