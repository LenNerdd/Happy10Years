//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let userResults = document.getElementById("user-results");
let finalImage = document.getElementById("PrincessandPeanut")
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array
const quizArray = [
    {
        id: "0",
        question: "Who said 'I love you' first?",
        options: ["Len-Nerd", "Julie"],
        correct: "Len-Nerd",
    },
    {
        id: "1",
        question: "Who became part of the family first?",
        options: ["Princess","Peanut"],
        correct: "Peanut",
    },
    {
        id: "2",
        question: "Which Hogwarts House is Julie particularly fond of? ",
        options: ["Gryffindor", "Ravenclaw", "Slytherin", "Hufflepuff"],
        correct: "Slytherin",
    },
    {
        id: "3",
        question: "What is Len-Nerd's favorite video game?",
        options: ["Call of Duty: Modern Warfare", "From the NBA 2K Series", "Tom Clancy's Rainbow Six Siege", "Call of Duty: Warzone"],
        correct: "Tom Clancy's Rainbow Six Siege",
    },
    {
        id: "4",
        question: "What's the most frequently discussed destination for a couple's getaway?",
        options: ["Japan", "Paris", "Hawaii", "New York City"],
        correct: "Japan",
    },
    {
        id: "5",
        question: "What was the first played video game as a couple?",
        options: ["Grand Theft Auto V", "Call of Duty: Black Ops", "Call of Duty: Black Ops II", "Call of Duty: Modern Warfare 2"],
        correct: "Call of Duty: Black Ops II",
    }, {
        id: "6",
        question: "As of December 28, 2023, how many years will Len-Nerd and Julie have been in a relationship?",
        options: ["2", "6", "10", "12"],
        correct: "10",
    },
    {
        id: "7",
        question: "Select the correct eye colors for Len-Nerd and Julie:",
        options: ["'Shit' Brown, Brown", "Brown, Black", "Black, Brown ", "Brown, 'Shit' Brown"],
        correct: "'Shit' Brown, Brown",
    },
    {
        id: "8",
        question: "Which vacation destination stands out as the most unforgettable for Len-Nerd?",
        options: ["Isle of Palms Beach", "LA", "Georgia", "Charlotte"],
        correct: "LA",
    },
    {
        id: "9",
        question: "Which vacation spot holds the best memories for Julie?",
        options: ["LA", "Georgia", "Isle of Palms Beach", "Charlotte"],
        correct: "Isle of Palms Beach",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.style.display = "block";
    scoreContainer.classList.add("hide");
});

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

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.style.display = "none";
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML = "Your score is " + scoreCount + " out of " + questionCount;
            if (scoreCount == 10){
                playConfettiAnimation();
                userResults.innerHTML = "Princess and Peanut are proud!";
                finalImage.innerHTML = "<img class ='finishing-img' src='assets/ProudDogs.png'>";
                document.getElementById("PrincessandPeanut").style.marginBottom = "-50px";
            } else{
                userResults.innerHTML = "Princess and Peanut are disappointed.";
                finalImage.innerHTML = "<img class ='finishing-img' src='assets/DisappointedDogs.png'>";
            }
                
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Questions";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        // options
        let numOfOptions = i.options.length
        if (numOfOptions == 2) {
            div.innerHTML += `
            <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
             <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
            `;
        } else {
            div.innerHTML += `
            <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
             <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
              <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
               <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
            `;
        }
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    quizContainer.innerHTML = "";
    displayContainer.style.display = "block";
    initial();
});

//display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
};