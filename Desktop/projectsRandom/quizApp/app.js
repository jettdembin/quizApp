//Making code dynamic to prevent reused code

//Array of correct scores by user
let currentQuestion = 0;
let highestQuestion = 0;
let highestQuestionHolder = [];
let score = 0;
const totalQuestionCount = questions.length;
let answerContainer = [];


//Selecting all containers to input data into
const container = document.querySelector(".container");
const resultsCntr = document.querySelector(".results-cntr");
const questionCntr = document.querySelector(".question-cntr");
const question = document.querySelector("#question");
const btnCntr = document.querySelector(".btn");
const nextButton = document.querySelector(".next-btn");
const backButton = document.querySelector(".back-btn");
let hiddenQuestionsCounter = 0;
let hiddenQuestions = document.querySelectorAll(".hide");


//Creating Container for questions and answers to go into
function createQuestions() {
    while (questionCntr.firstChild) {
        questionCntr.removeChild(questionCntr.firstChild);
    }
    questions.forEach((question, i) => {
        const questionContent = document.createElement('div');
        questionContent.innerHTML = `
            <h2 id="question-number">Question ${i+ 1} of ${totalQuestionCount}</h2>
            <h4 id="question">${questions[i].question}</h4>
            
            <div class="question-options">
                <div class="question-style">
                    <input type="radio" name="group${i}" value="1" onclick="check()">${questions[i].option1}</input><br />
                </div>
                <div class="question-style">
                    <input type="radio" name="group${i}" value="2" onclick="check()">${questions[i].option2}</input><br />
                </div>
                    <div class="question-style">
                    <input type="radio" name="group${i}" value="3" onclick="check()">${questions[i].option3}</input><br />
                </div>
                <div class="question-style">
                    <input type="radio" name="group${i}" value="4" onclick="check()">${questions[i].option4}</input>
                </div>
            </div> 
        `;
        questionContent.classList.add("question-content", "hide");
        questionCntr.appendChild(questionContent);
        hiddenQuestionsCounter++
        if (hiddenQuestionsCounter === 1) {
            questionContent.classList.add("q-active");
        }
    });
}

//function to show current question 
function showQuestion() {
    let questionContents = document.querySelectorAll('.question-content');
    for (let question of questionContents) {
        question.classList.remove("q-active");
    }
    // if first question
    if (!currentQuestion) {
        questionContents[0].classList.add("q-active");
    } else {
        for (let i = 1; i < questionContents.length; i++) {
            if (i == currentQuestion) {
                questionContents[i].classList.add("q-active");
            }
        }
    }
}

//function to add event listener to only inputs shown 
function currentInputs() {
    const inputs = document.querySelectorAll("input");
    for (let i = 0; i < questions.length; i++) {
        let j = (3 * i) + i;
        if (currentQuestion == i) {
            let questionInputs = ([...([...inputs].slice(j, j + 4))]);
            questionInputs.forEach(input => {
                input.addEventListener("click", (e) => {
                    let object = {
                        name: this.name,
                        value: this.value
                    };
                    object.name = `${e.target.name}`;
                    object.value = `${e.target.value}`;
                    // console.log(object)
                    answerContainer.push(object);
                });
            })
        };
    }
}

//funciton to check value to allow to contine
function check() {
    highestQ();
    console.log(highestQuestion)
    // check if answered final question 
    if (highestQuestion == totalQuestionCount) {
        nextButton.classList.add("permanent-active");
    } else {
        nextButton.classList.add("active");
    }
}

//function to listen for submission on question answer and to continue to next question
function next() {
    // check whether to change text content of next button
    if (currentQuestion == totalQuestionCount - 2) {
        nextButton.classList.remove("back-active");
        nextButton.classList.remove("active");
        nextButton.textContent = "Submit >";
    } else if (currentQuestion + 1 == highestQuestion) {
        nextButton.classList.remove("active");
        nextButton.classList.remove("back-active");
    } else {
        nextButton.textContent = "Next >";
        nextButton.classList.remove("active");
    }
    currentQuestion++
    if (currentQuestion == totalQuestionCount) {
        results();
        //function to check if on final question to change buttons and allow for submit and retake
        return
    }
    currentInputs();

    //check if on first question for back button
    if (currentQuestion) {
        backButton.classList.add("active");
    }
    showQuestion();
}

//function to check highest question
 function highestQ() {
    if (highestQuestionHolder.length == currentQuestion) {
        highestQuestionHolder.push(++highestQuestion);
        console.log(highestQuestionHolder, highestQuestion);
    };
 } 

//function to go to previus question 
function back() {
    nextButton.classList.add("back-active");
    currentQuestion--
     //check if on first question for back button
     if (!currentQuestion) {
         backButton.classList.remove("active");
     } 
     if (currentQuestion) {
        nextButton.textContent = "Next >";
     }
    showQuestion();
}

// event listener for retry on back button
function restart() {
    backButton.textContent = "< Back";
    highestQuestion = 0;
    currentQuestion = 0;
    score = 0;
    highestQuestionHolder = [];
    answerContainer = [];
    container.style.cssText = "opacity: 1";
    resultsCntr.style.display = "none";
    resultsCntr.innerHTML = ``;
    randomArrayShuffle(questions);
    createQuestions();
    showQuestion();
    currentInputs();
    const inputsChecked = document.querySelectorAll("input[type=radio]:checked")
    inputsChecked.forEach(input => {
        input.checked = false;
    });
    backButton.classList.remove("active");
    nextButton.classList.remove("permanent-active");
    backButton.removeEventListener("click", restart, false);
};

//function for backbutton event on retry 
function backButtonRetry() {
    backButton.addEventListener("click", restart);
}

//function to clear all containers and restart quiz
function retry() {
    backButtonRetry();
}

function results() { 
    //function to remove duplicates with same property
    function removeDuplicatesBy(keyFn, array) {
        const mySet = new Set();
        return array.filter(function(x) {
            const key = keyFn(x), isNew = !mySet.has(key);
            if (isNew) mySet.add(key);
            return isNew
        });
    }
    //reverse container to only count most recent checked radio
    const withoutDuplicates = removeDuplicatesBy(x => x.name, answerContainer.reverse());
    const finalContainer = withoutDuplicates.reverse();
    for (let i = 0; i < finalContainer.length; i++) {
        if (finalContainer[i].value == questions[i].answer) {
            score++
        }
    }

    //darken quiz and show results
    container.style.cssText = "opacity: 0.4";
    resultsCntr.style.display = "flex";
    resultsCntr.innerHTML = `
        <div>You scored a ${score} out of ${questions.length}</div>
    `;
    nextButton.classList.remove("permanent-active");
    backButton.textContent = "< Retry";
    retry();
}


//function to show correct question on load
window.addEventListener('load', () => {
    randomArrayShuffle(questions);
    createQuestions();
    currentInputs();
    backButton.addEventListener("click", back);
    nextButton.addEventListener("click", next);
});





