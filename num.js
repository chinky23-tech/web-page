const numInput = document.getElementById('numInput');
const checkBtn = document.getElementById('checkBtn');
const result = document.getElementById('result');

let secret = Math.floor(Math.random() * 100 ) +1;

let attemptsLeft = 5;


function guessNum(){

let guess = parseInt(numInput.value);

let resultText = '';

if(isNaN(guess)){
    resultText = 'please enter valid number';
}else if( guess == secret){

    resultText = 'bingo you nailed it';
     checkBtn.disabled = true;
}else {
   attemptsLeft--;
}if(attemptsLeft > 0){
    if(guess > secret){
        resultText = `too high attempts left: ${attemptsLeft}`;
    }else{
        resultText = `too low attempts left: ${attemptsLeft}`;
    }
    }else{
        resultText = 'game over';
        checkBtn.disabled = true;
    }
}




