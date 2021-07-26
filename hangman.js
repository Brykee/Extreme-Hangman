var words =
  'Agony Lunatic Apocalypse Lurking Armageddon Massacre Assault Meltdown Backlash Menacing Beating Mired Beware Mistake Blinded Murder Blood Nightmare Bloodbath Painful Bloodcurdling Pale Bloody Panic Blunder Peril Bomb Piranha Buffoon Pitfall Bumbling Plague Cadaver Played Catastrophe Plummet Caution Plunge Collapse Poison Corpse Poor Crazy Prison Cripple Pummel Crisis Pus Danger Reckoning Dark Refugee Deadly Revenge Death Risky Deceiving Scary Destroy Scream Devastating Searing Disastrous Shame Doom Shatter Drowning Shellacking Dumb Shocked Embarrass Silly Fail Slaughter Feeble Slave Fired Strangle Fool Stupid Fooled Suicide Frantic Tailspin Frightening Tank Gambling Targeted Gullible Teetering Hack Terror Hazardous Terrorist Hoax Torture Holocaust Toxic Horrific Tragedy Hurricane Trap Injure Vaporize Insidious Victim epidemic cataclysmic bufoon	suffering reckoning trauma dangerous annihilate invasion volatile vulnerable jail warning jeopardy nerd lawsuit wounded looming cringeworthy last fugacious worry havoc';

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

var wordsArray = words.split(' ');
console.log(wordsArray);

function randomWord() {
  answer = words[Math.floor(Math.random() * words.length)];
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
