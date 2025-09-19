const numInput = document.getElementById('numInput');
const checkBtn = document.getElementById('checkBtn');
const result = document.getElementById('result');

// Generate secret number ONCE
let secret = Math.floor(Math.random() * 100) + 1;

// Attempts allowed
let attemptsLeft = 5;

function guessNum() {
  let guess = parseInt(numInput.value); // user input
  let resultText = '';

  if (isNaN(guess)) {
    resultText = '⚠️ Please enter a valid number!';
  } else if (guess === secret) {
    resultText = `🎉 Correct! The number was ${secret}`;
    checkBtn.disabled = true; // stop the game
  } else {
    attemptsLeft--; // reduce attempt
    if (attemptsLeft > 0) {
      if (guess > secret) {
        resultText = `📉 Too high! Attempts left: ${attemptsLeft}`;
      } else {
        resultText = `📈 Too low! Attempts left: ${attemptsLeft}`;
      }
    } else {
      resultText = `💀 Game Over! The number was ${secret}`;
      checkBtn.disabled = true; // stop the game
    }
  }

  result.textContent = resultText;
}

checkBtn.addEventListener('click', guessNum);
