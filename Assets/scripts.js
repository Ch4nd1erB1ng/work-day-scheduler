let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton =document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//     These are the quiz questions
    var quizArray = [
       
       {
        id: "0",
            question: "What is the correct syntax to declare a JavaScript variable?",
            options: ["var x = 10;", 
            "variable x = 10;", "x = 10;", 
            "let x = 10;"],
            correct: "var x = 10;"
        },
        {
            id: "1",
            question: "What does the '===' operator in JavaScript do?",
            options: ["Compares the values of two variables, but not their types.", "Compares the values and types of two variables.", "Assigns a value to a variable.", "None of the above."],
            correct: "Compares the values and types of two variables."
        },
        {
            id: "2",
            question: "Which of the following methods can be used to add a new element to the end of an array in JavaScript?",
            options: ["array.pop()", "array.shift()", "array.push()", "array.unshift()"],
            correct: "array.push()"
        },
        {
            id: "3",
            question: "What is the output of the following code snippet?\n\nconsole.log(3 + 4 + '5');",
            options: ["345", "12", "75", "NaN"],
            correct: "75"
        },
        {
            id: "4",
            question: "What is the output of the following code snippet?\n\nlet a = 5;\nlet b = 7;\n[a, b] = [b, a];\nconsole.log(a, b);",
            options: ["5 7", "7 5", "undefined undefined", "TypeError"],
            correct: "7 5"
        }
        
        
    ];
//     these are the event listeners for the quiz buttons
    restart.addEventListener("click",() => {
        initial();
        displayContainer.classList.remove("hide");
        scoreContainer.classList.add("hide");
    });

    nextBtn.addEventListener("click", (displayNext = () => {
        questionCount += 1;

        if (questionCount == quizArray.length) {
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            userScore.innerHTML = "Your score is " + scoreCount + " out of " + questionCount; 
        }
        else {
            countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " question";

            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);
// this is the timer for the quiz
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.textContent = count;
        if (count === 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};
    
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");

    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
}

function quizCreater() {
   quizArray.sort(() => Math.random() - 0.5);

   for(let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);

    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">
    ${i.options[0]}</button>
    <button class="option-div" onclick="checker(this)">
    ${i.options[1]}</button>
    <button class="option-div" onclick="checker(this)">
    ${i.options[2]}</button>
    <button class="option-div" onclick="checker(this)">
    ${i.options[3]}</button>
    
    `;
   
     quizContainer.appendChild(div);
    
   }
}
 // this code make it clear if you get the question right or wrong by showing red if wrong, and green if right
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct){
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
         });
    }
    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreater();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
}

