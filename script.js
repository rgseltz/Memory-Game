const gameContainer = document.getElementById("game");
let firstClick;
let secondClick;
let clickEnabled = true;
let c = 0;


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
  if(!clickEnabled) {
    return;
  }
  if (!firstClick) {
    firstClick = event.target;
    console.log('first click');
    const divColor = event.target.className;
  event.target.style.backgroundColor = divColor;
    return;
  }
  secondClick = event.target;
  const divColor = event.target.className;
  event.target.style.backgroundColor = divColor;
  console.log(secondClick);
  clickEnabled = false;
  if (firstClick.style.backgroundColor === secondClick.style.backgroundColor) {
    console.log('MATCH!!');
    firstClick = null;
    secondClick = null;
    clickEnabled = true;
    c++;
  }
  else {
    setTimeout(function(){
    firstClick.style.backgroundColor = "";
    secondClick.style.backgroundColor = "";
    firstClick = null;
    secondClick= null;
    clickEnabled = true;
    },1000);
  }
  if (c === matchPairs) {
    const h2 = document.createElement('h2');
    h2.innerText = "You Won!";
    const h1 = document.querySelector('h1');
    h1.appendChild(h2);
  }

}

// when the DOM loads
createDivsForColors(shuffledColors);
