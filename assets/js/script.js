//declare variables

const startBtn = document.querySelector('#start-btn');
const nextBtn = document.querySelector('#next-btn');
const highScoreBtn = document.querySelector('#high-score-btn')
const questionContainerEl = document.querySelector("#question-container");
const questionEl = document.querySelector("#question");
const answerBtnEl = document.querySelector('#answer-buttons');
const resultEl = document.querySelector('#result');
const timerEl = document.querySelector('#timer');
const finalScoreEl = document.querySelector('#score');
const nameEl = document.querySelector('#name');
const submitEl = document.querySelector('#submit-btn')
const displayScoreEl = document.querySelector('#display-score');
const displayScoreListEl = document.querySelector('#display-result');

var score = 0;
var timeCounter = 45;
var bestScores = [];
var topScoreArray = [];
var playerName;

let shuffledQuestions, currentQuestionIndex;

// Array containing question and answers 

const questions = [
    {
        question: "Which of the following is not a JavaScript data type?",
        answers: [
            { text: "Number", correct: false},
            { text: "Undefined", correct: false},
            { text: "Float", correct: true},
            { text: "Boolean", correct: false}            
        ]
    },
    {
        question: " Which of the following function of String object combines the text of two strings and returns a new string?",
        answers: [
            { text: "add()", correct: false},
            { text: "merge()", correct: false},
            { text: "append()", correct: false},
            { text: "concat()", correct: true}        
        ]
    },
    {
        question: " Which of the following function of String object returns the characters in a string between two indexes into the string?",
        answers: [
            { text: "slice()", correct: false},
            { text: "split()", correct: false},
            { text: "substr()", correct: false},
            { text: "substring()", correct: true}        
        ]
    },
    {
        question: " Which of the following function of String object returns the calling string value converted to upper case while respecting the current locale?",
        answers: [
            { text: "toLocaleUpperCase()", correct: true},
            { text: "toUpperCase()", correct: false},
            { text: "toString()", correct: false},
            { text: "substring()", correct: false}        
        ]
    },
    {
        question: " Which of the following function of String object causes a string to be displayed in the specified size as if it were in a <font size = 'size'> tag?",
        answers: [
            { text: "fixed()", correct: false},
            { text: "fontcolor()", correct: false},
            { text: "fontsize()", correct: true},
            { text: "bold()", correct: false}        
        ]
    },
    {
        question: " JavaScript is a _____-side programming language?",
        answers: [
            { text: "Server", correct: false},
            { text: "Client", correct: false},
            { text: "Both", correct: true},
            { text: "None", correct: false}        
        ]
    }
]

// function for end of quiz

function quizOver() {
    startBtn.innerText = 'Restart';
    nextBtn.classList.add('hide');
    clearInterval(timer);
    questionContainerEl.classList.add('hide');
    timerEl.classList.add('hide');  
    startBtn.classList.remove('hide')
    nameEl.classList.remove('hide');
    finalScoreEl.classList.remove('hide');
    finalScoreEl.innerText = "Quiz Over! Your final score is " + score + "! \ Please enter your name.";
    console.log("final score= ", finalScoreEl.innerText);

  }

// function for countdown timer

function countDown() {
    timeCounter = 45;
    timer = setInterval(() => {
        timeCounter--;
        $("#time-left").text(timeCounter)
       
if (timeCounter <= 0) {
    quizOver();
}
    }, 1000) 
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

// function for starting the quiz

function startQuiz() {
    console.log("the game has started");
    score = 0;
    timerEl.classList.remove('hide');  
    countDown();
    $("#welcome").hide();
    nameEl.classList.add('hide');
    displayScoreEl.classList.add('hide');
    finalScoreEl.classList.add('hide');
    startBtn.classList.add('hide');
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    
    question.answers.forEach(answer => {
        const btnEl = document.createElement('button');
        btnEl.innerText = answer.text;
        btnEl.classList.add('btn');
        if (answer.correct) {
          btnEl.dataset.correct = answer.correct
        };
        btnEl.addEventListener('click', selectAnswer);
        answerBtnEl.appendChild(btnEl);
      });
}


    function resetState() {
  
        nextBtn.classList.add('hide')
        while (answerBtnEl.firstChild) {
          answerBtnEl.removeChild(answerBtnEl.firstChild)
        }
      }

 //evaluating the correct answer     

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
  
    if (questions.length <= currentQuestionIndex + 1){
        quizOver();

    }
    else {
        nextBtn.classList.remove('hide');
    }
    
  }

  // actions based on correct and wrong answers

function setStatusClass(element, correct){
 
    const resultEl = document.createElement('p');
    
    if (correct) {
        resultEl.classList.add('right');
        resultEl.innerText = "Right!";
        console.log("Right! ");
        score = score + 10;
        console.log("the score is ", score);
    }
    else {
        resultEl.classList.add('wrong');
        timeCounter = timeCounter - 10;
        resultEl.innerText = "Wrong!";
        console.log("Wrong Answer");
    }
    answerBtnEl.appendChild(resultEl);
}

// Storing the scores  in local storage

function showTopScores() {
    playerName = document.getElementById('fname').value;
    console.log("the player name is ", playerName);
    if (playerName == "") {
        playerName = "Anonymous";
    };
    
    topScoreArray = JSON.parse(localStorage.getItem("topScoreArray")) || [];

    topScoreArray.push({playerName, score});
    topScoreArray.sort((a,b) => b.score - a.score);
    localStorage.setItem('topScoreArray', JSON.stringify(topScoreArray));
};    

// displaying the top scores

highScoreBtn.addEventListener('click', function(event){
    event.preventDefault();
    finalScoreEl.classList.add('hide');
    displayScoreEl.classList.remove('hide');
    nameEl.classList.add('hide');

    // Top 3 scores to be printed
    noOfScores = Math.min(topScoreArray.length, 3);
    for (var i=0; i<noOfScores; i++){
        
        liItem = topScoreArray[i].playerName + " - " + topScoreArray[i].score;
        liEl = document.createElement('li');
        liEl.id = "scoreId";
        liEl.innerText = liItem;
        console.log("list item at the end= ", liItem);
        displayScoreListEl.appendChild(liEl);
    };
    
})