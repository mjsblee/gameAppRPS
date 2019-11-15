var scores, activePlayer, gamePlaying;

reset();



//Btn-choose
document.querySelector('#rock').addEventListener('click', selection.bind(this, 3, 1));
document.querySelector('#paper').addEventListener('click', selection.bind(this, 1, 2));
document.querySelector('#scissor').addEventListener('click', selection.bind(this, 2, 3));


//Btn-new
document.querySelector('.btn-new').addEventListener('click', reset);






//When Selection Button was pressed (General Function)

function selection(weaker, picNum){
    //1.show the result bar and generate ramdom number
    var random = Math.floor(Math.random() * 3 + 1);

    //2.assign random to the computer's choice
    document.querySelector('.result-image').src = 'img/rps-' + random + '.png';
    document.querySelector('#result-panel').classList.remove('win');
    document.querySelector('#result-panel').classList.remove('lose');
    document.querySelector('#score-box-0').style.animation = '';
    document.querySelector('#score-box-1').style.animation = '';

    document.querySelector('#rock').style.display = 'none';
    document.querySelector('#paper').style.display = 'none';
    document.querySelector('#scissor').style.display = 'none';


    // Set Winning Score
    var input = document.querySelector('.final-score').value;
    var winningScore;

    if (input) {
        winningScore = input;
    } else {
        winningScore = 15;
    }
    //


        //1//// When the player wins
        if (random === weaker) {

            //1. add Score
            scores[activePlayer]++;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            

            //2. add win class
            document.querySelector('#result-panel').classList.add('win');
            document.querySelector('#result-name').textContent = 'WIN';
            
            document.querySelector('#score-box-' + activePlayer).style.animation = 'big .5s ease-in .5s';

            transition();


            //Check if there's a winner

            //When there's a winner
            if (scores[activePlayer] >= winningScore){

                document.querySelector('#next').classList.remove('next-appear');
                document.querySelector('#rock').style.display = 'none';
                document.querySelector('#paper').style.display = 'none';
                document.querySelector('#scissor').style.display = 'none';

                setTimeout(winner, 1500);
                
                function winner(){
                disappear();
                document.querySelector('#name-' + activePlayer).textContent = 'Winner';
                document.querySelector('#name-' + activePlayer).style.animation = 'winnerColor 1s linear infinite';
                }
                
                
            }else{
            //When there isn't a winner
                document.querySelector('#next').addEventListener('click', disappear);
            }

        }else if (random === picNum){
            //2////////Tie
        
            document.querySelector('.result-label').textContent = 'TIE';
            transition();

            document.querySelector('#next').addEventListener('click', disappear);

        }else{
            //3//////Lose
            document.querySelector('#result-panel').classList.add('lose');
            document.querySelector('.result-label').textContent = 'LOSE';
            document.querySelector('#cover').classList.add('disappear');
            document.querySelector('.result-wrapper').classList.add('result-appear');
            
            setTimeout(nextPlayer,1500);
        }        

    }




//Next disappear >> Result disappear >> Cover appear
function disappear(){
    document.querySelector('#next').classList.remove('next-appear');
    document.querySelector('.result-wrapper').classList.remove('result-appear');
    document.querySelector('#cover').classList.remove('disappear');

    document.querySelector('#rock').style.display = 'inline-grid';
    document.querySelector('#paper').style.display = 'inline-grid';
    document.querySelector('#scissor').style.display = 'inline-grid';
}


//Cover disappear >> Result appear >> Next appear
function transition(){
    document.querySelector('#cover').classList.add('disappear');
    document.querySelector('.result-wrapper').classList.add('result-appear');
    document.querySelector('#next').classList.add('next-appear');
}








function nextPlayer(){
    //1.change activePlayer
    document.querySelector('.result-wrapper').classList.remove('result-appear');
    document.querySelector('#cover').classList.remove('disappear');

    document.querySelector('#rock').style.display = 'inline-grid';
    document.querySelector('#paper').style.display = 'inline-grid';
    document.querySelector('#scissor').style.display = 'inline-grid';
    
    activePlayer === 0? activePlayer = 1: activePlayer = 0;
    //2.add/remove active class
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
}


// RESET FUNCTION
function reset(){
    //1.reset all the score to 0
    scores = [0,0];
    activePlayer = 0;
    you = 0;
    computer = 1;
    gamePlaying = true;

    
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('#name-0').classList.remove('winner');
    document.querySelector('#name-1').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('#name-0').style.animation = '';
    document.querySelector('#name-1').style.animation = '';

    document.querySelector('.final-score').value = '';

    //2.hide the result bar
    disappear();
    }
