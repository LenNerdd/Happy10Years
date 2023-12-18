const gridContainer = document.querySelector(".grid-container");
let cards = [];
let finalMessageElement;
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let flippedPairs = [];

const pairMessages = {
  "1": "First visit at a zoo together!",
  "2": "Our first beach trip to Isle of Palms Beach, SC!",
  "3": "Len-Nerd graduated!",
  "4": "Our first trip to Georgia together!",
  "5": "Our first time at Universal Studios!",
  "6": "First family dinner on a rooftop in Charlotte, NC!",
  "7": "Random photo of us I decided to use!",
  "8": "Our overused picture that looks like it can be from Pinterest!",
  "9": "Our first time flying together!",
};

document.querySelector(".score").textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  let message = pairMessages[firstCard.dataset.name];
  
  console.log(message)

  if (isMatch) {
    disableCards();    
    displayMatchMessage(message);
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  flippedPairs.push(firstCard, secondCard);

  if (flippedPairs.length === cards.length) {
    displayFinalMessage("You did it! Now let's make more memories together!");
  }

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();

  if (finalMessageElement) {
    finalMessageElement.style.display = 'none';
    finalMessageElement = null;
  }
}

function displayMatchMessage(message) {
  const matchMessage = document.createElement('div');
  matchMessage.className = 'match-message';
  matchMessage.textContent = message;

  const closeButton = document.createElement('button');
  closeButton.textContent = 'x';
  closeButton.addEventListener('click', () => {
    matchMessage.style.display = 'none';
  });

  matchMessage.appendChild(closeButton);
  document.body.appendChild(matchMessage);

  setTimeout(() => {
    matchMessage.style.display = 'none';
  }, 5000);
}

function displayFinalMessage(message) {
  playConfettiAnimation();

  if (finalMessageElement) {
    finalMessageElement.style.display = 'none';
  }

  const finalMessage = document.createElement('div');
  finalMessage.className = 'final-message';
  finalMessage.textContent = message;

  document.body.appendChild(finalMessage);

  finalMessageElement = finalMessage;
}

function playConfettiAnimation() {
  const confettiScript = document.createElement('script');
  confettiScript.src = 'Confetti.js';

  const startStopScript = document.createElement('script');
  startStopScript.textContent = `
    const start = () => { setTimeout(function() { confetti.start() }, 1000); };
    const stop = () => { setTimeout(function() { confetti.stop() }, 5000); };

    start();
    stop();
  `;

  document.head.appendChild(confettiScript);
  document.head.appendChild(startStopScript);
}

