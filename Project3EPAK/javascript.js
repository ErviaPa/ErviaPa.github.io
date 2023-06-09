let h4ScoreNumber;
let guessMyNumber;
let guessHistoryList;
let guessHistoryArray;
let guessMessageArea;
let inputEnterGuess;
let scoreVariable;
let highScoreVariable;

initialLoading = () => {
  guessHistoryList = document.getElementById('ulGuessHistory');
  guessMessageArea = document.getElementById('midScreenMessageArea');
  inputEnterGuess = document.getElementById('midScreenInputText');
  h4ScoreNumber = document.getElementById('h4ScoreNumber');

  resetGame(1);

  h4ScoreNumber.innerHTML = scoreVariable;
};

detectEnterKey = (event) => {
  if (event.keyCode === 13) {
    validateInput();
  }
};

assignHighScore = () => {
  const bestScore = document.getElementsByClassName('bestScore');
  for (let i = 0; i < bestScore.length; i++) {
    bestScore[i].textContent = highScoreVariable;
  }
};

assignSecretNumber = () => {
  const secretNumber = document.getElementsByClassName('secretNumber');

  for (let i = 0; i < secretNumber.length; i++) {
    secretNumber[i].textContent = guessMyNumber;
  }
};

generateRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

resetGame = (val = 0) => {
  val === 1 ? (highScoreVariable = 0) : null;

  guessMyNumber = generateRandomNumber();
  scoreVariable = 10;
  h4ScoreNumber.innerHTML = scoreVariable;
  resetInputAndMessage();
  assignHighScore();
  assignSecretNumber();

  guessHistoryArray = [];

  while (guessHistoryList.firstChild) {
    guessHistoryList.removeChild(guessHistoryList.firstChild);
  }

  console.log(`The secret number is ${guessMyNumber}`);
};

validateInput = () => {
  if (inputEnterGuess.value.trim() === '') {
    guessMessageArea.innerHTML = getResponseMessage();
    return;
  } else if (isNaN(inputEnterGuess.value.trim())) {
    guessMessageArea.innerHTML = getResponseMessage();
    return;
  } else {
    const parsedInput = parseInt(inputEnterGuess.value.trim());
    if (parsedInput < 1 || parsedInput > 100) {
      guessMessageArea.innerHTML = getResponseMessage();
      return;
    }

    if (guessHistoryArray.includes(parsedInput)) {
      guessMessageArea.innerHTML = getResponseMessage(4);
      return;
    }

    if (parsedInput > guessMyNumber) {
      guessMessageArea.innerHTML = getResponseMessage(1);
      guessHistory(parsedInput);
      updateScore();
    }
    if (parsedInput < guessMyNumber) {
      guessMessageArea.innerHTML = getResponseMessage(2);
      guessHistory(parsedInput);
      updateScore();
    }
    if (parsedInput === guessMyNumber) {
      guessMessageArea.innerHTML = 'You guessed it right!';
      youWin();
    }
    return;
  }
};

getResponseMessage = (val = 0) => {
  switch (val) {
    case 0:
      return 'Please enter a number between 1 and 100';
    case 1:
      return 'Your guess is high';
    case 2:
      return 'Your guess is low';
    case 3:
      return 'Guess a Number';
    default:
      return 'You already guessed this number';
  }
};

updateScore = () => {
  if (scoreVariable > 0) {
    scoreVariable--;
    h4ScoreNumber.innerHTML = scoreVariable;
  }
  if (scoreVariable === 0) {
    gameOver();
  }
};

guessHistory = (guess) => {
  guessHistoryArray.push(guess);

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(inputEnterGuess.value.trim()));
  guessHistoryList.appendChild(li);
};

youWin = () => {
  const yourScore = document.getElementById('yourScore');
  yourScore.textContent = scoreVariable;

  if (highScoreVariable < scoreVariable) {
    highScoreVariable = scoreVariable;
    assignHighScore();
  }

  gameProgress(0);
};

gameOver = () => {
  gameProgress(1);
};

playAgain = () => {
  gameProgress(2);
};

gameProgress = (val = 0) => {
  const topRowContainer = document.getElementById('topRowContainer');
  const midRow_start = document.getElementById('midRow_start');
  const midRow_mid = document.getElementById('midRow_won');
  const midRow_lost = document.getElementById('midRow_lost');
  const h4Reset = document.getElementById('h4Reset');

  switch (val) {
    case 0:
      midRow_start.className = 'startScreenContainer hide_this';
      midRow_mid.className = 'startScreenContainer you_won';
      topRowContainer.className = 'topRowContainer unvisible_this';
      return;
    case 1:
      midRow_start.className = 'startScreenContainer hide_this';
      midRow_lost.className = 'startScreenContainer you_lost';
      h4Reset.className = 'disable-select unvisible_this';
      return;
    case 2:
      midRow_start.className = 'startScreenContainer';
      midRow_mid.className = 'startScreenContainer you_won hide_this';
      midRow_lost.className = 'startScreenContainer you_lost hide_this';
      h4Reset.className = 'disable-select';
      topRowContainer.className = 'topRowContainer';
      resetGame();
      return;
    default:
      return;
  }
};

resetInputAndMessage = () => {
  guessMessageArea.innerHTML = getResponseMessage(3);
  inputEnterGuess.value = '';
};
