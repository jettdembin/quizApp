//Making code dynamic to prevent reused code

//Array of correct scores by user
let currentQuestion = 0;
let score = 0;
const totalQuestionCount = questions.length;


//Selecting all containers to input data into
const container = document.querySelector(".container");
const resultsCntr = document.querySelector(".results-cntr");
const questionCntr = document.querySelector(".question-cntr");
const questionNumber = document.querySelector("#question-number");
const question = document.querySelector("#question");
const btnCntr = document.querySelector(".btn");
const nextButton = document.querySelector(".next-btn");
const backButton = document.querySelector(".back-btn");
let hiddenQuestionsCounter = 0;
let hiddenQuestions = document.querySelectorAll(".hide");


//Creating Container for questions and answers to go into
function createQuestions() {
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

//function to show correct question on load
window.addEventListener('load', () => {
    createQuestions();
    currentInputs();
});

//function to listen for submission on question answer and to continue to next question
function next() {
    nextButton.classList.remove("active");
    if (currentQuestion + 1 == totalQuestionCount) {
        results();
        return
    }
    currentQuestion++
    currentInputs();
    //check if on first question for back button
    if (currentQuestion) {
        backButton.classList.add("active");
    }
    showQuestion();
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
}

//function to go to previus question 
function back() {
    currentQuestion--
     //check if on first question for back button
     if (!currentQuestion) {
         backButton.classList.remove("active");
     }
    showQuestion();
}

let answerContainer = [];

//funciton to check value to allow to contine
function check() {
    nextButton.classList.add("active");
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
                    answerContainer.push(object)
                });
            })
        };
    }
}





