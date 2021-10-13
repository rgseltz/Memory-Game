const gameContainer = document.getElementById("game");
let card1;
let card2;
let isGameInProgress = true;
let c = 0;
let winCount = 0;
const reset = document.querySelector('#reset');


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
const matchPairs = COLORS.length / 2;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  if (!card1) {
    card1 = event.target;
    console.log('first click', card1);
    revealColor(event);
    return;
  } else if (!card2 && card1 !==event.target) {
    card2 = event.target;
    revealColor(event);
  }
  else {
    return;
  }
  checkMatch();
  //check if all cards matched, and if yes, throws win alert
  isWin();
}
//reveal element bg color
function revealColor(event) {
  const divColor = event.target.className;
  event.target.style.backgroundColor = divColor;
}

//called after card2 then calls functions if they match or dont match
function checkMatch() {
    let isMatch = (card1.style.backgroundColor === card2.style.backgroundColor);
    isMatch ? matched() : notMatched();
}
//called if second card matches, resetting cards and turning off event listener for the two cards that matched
function matched() {
    c++;
    console.log('MATCH!!');
    card1.removeEventListener('click', handleCardClick);
    card2.removeEventListener('click', handleCardClick);
    card1 = null;
    card2 = null;
}
//called when card1 does not match card2, turns cards back over and resets card1 and card 2
function notMatched() {
    setTimeout(function(){
    card1.style.backgroundColor = "";
    card2.style.backgroundColor = "";
    card1 = null;
    card2= null;
    },1000);
}

reset.addEventListener('click',resetCards);

function isWin() {
    if (c === matchPairs) alert('You Won!');
}

function resetCards(event) {
  const cards = gameContainer.querySelectorAll('div');
  for (card of cards) {
    card.style.backgroundColor = '';
    card.style.backgroundColor = null;
    card.addEventListener('click',handleCardClick);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
