var words =
  'agony lunatic apocalypse Lurking armageddon massacre assault meltdown backlash menacing beating beware mistake blinded murder blood nightmare bloodbath painful bloodcurdling pale bloody panic blunder peril bomb piranha buffoon pitfall bumbling plague cadaver played catastrophe plummet caution plunge collapse poison corpse poor crazy prison cripple pummel crisis pus danger reckoning dark refugee deadly revenge death risky deceiving scary destroy scream devastating searing disastrous shame doom shatter drowning dumb shocked embarrass silly fail slaughter feeble slave fired strangle fool stupid fooled suicide frantic tailspin frightening tank gambling targeted gullible teetering hack terror hazardous terrorist hoax torture holocaust toxic horrific tragedy hurricane trap injure vaporize insidious victim epidemic cataclysmic bufoon	suffering reckoning trauma dangerous annihilate invasion volatile vulnerable jail warning jeopardy nerd lawsuit wounded looming cringeworthy last fugacious worry havoc';

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

var wordsArray = words.split(' ');
console.log(wordsArray);

function randomWord() {
  answer = wordsArray[Math.floor(Math.random() * wordsArray.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .map(
      (letter) =>
        `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` +
        letter +
        `'
        onClick="handleGuess('` +
        letter +
        `')"
      >
        ` +
        letter +
        `
      </button>
    `
    )
    .join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML =
      'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer
    .split('')
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : ' _ '))
    .join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
