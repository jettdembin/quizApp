// var currentQuestion = 0;
// //array of correct scores by user
// var scoreContainer = [];
// var totalQuestionCount = questions.length;
// var score= 0;

// var btn1 = document.getElementById('btn1');
// var btn2 = document.getElementById('btn2');
// var btn3 = document.getElementById('btn3');
// var back1 = document.getElementById('back-1');
// var back2 = document.getElementById('back-2');
// var question1 = document.getElementById("question-cntr1")
// var question2 = document.getElementById("question-cntr2");
// var question3 = document.getElementById("question-cntr3");

// //function to add up scoreContainer total correct
// var scoreCount = () => {
//     for (let i = 0; i < scoreContainer.length; i++) {
//         score++
//     }
// };

// //function onclick for button one to change to next question
// btn1.addEventListener('click', function() {
//     next();
//     totalScore();
// });

// //function onclick for button one to change to next question
// btn2.addEventListener('click', function() {
//     totalScore();
//     btn3.textContent = "Submit";
// });

// btn3.addEventListener('click', function() {
//     totalScore();
//     scoreCount();
//     document.getElementById("container").style.cssText = "opacity:.4";
//     document.getElementById("heading").style.cssText = "text-align:center";
//     document.getElementById('result').style.cssText = "display:block";
//     document.getElementById("scored").textContent = score;
// });

// back1.addEventListener('click', function() {
//     previousQuestion();
//     //reduce question count
//     currentQuestion--;
//     //take previous answer out of score array
//     scoreContainer.pop();
// });
// back2.addEventListener('click', function() {
//     previousQuestion();
//     //reduce question count
//     currentQuestion--;
//     //take previous answer out of score array
//     //if final question
//     /*
//     if (currentQuestion === totalQuestionCount) {

//     }
//     */
// });


// //function
// function totalScore() {
//     var selectedOption = document.querySelector('input[type=radio]:checked');
//     var answer = selectedOption.value;
//     if (questions[currentQuestion].answer == answer) {
//         scoreContainer.push(questions[currentQuestion].answer);
//     }
//     setNewActive();
//     selectedOption.checked = false;
//     currentQuestion++;
//     if (currentQuestion === totalQuestionCount) {
//         document.getElementById("container").style.cssText = "opacity:.4";
//         document.getElementById("heading").style.cssText = "text-align:center";
//         document.getElementById('result').style.cssText = "display:block";
//         document.getElementById("scored").textContent = score;
//     }
// };

// function next() {
//     var selectedOption = document.querySelector('input[type=radio]:checked');
//     if (!selectedOption) {
//         alert("Please select an answer before proceeding");
//         return
//     } 
//     if (selectedOption) {
//         return btn1.classList.add('opacity');
//     }
// }


// function previousQuestion() {
//     var hiddenQuestions = document.getElementsByClassName('hide');
//     for (var hiddenQuestion of hiddenQuestions) {
//         hiddenQuestion.classList.remove('q-active');
//     }
//     if (currentQuestion == 1) {
//         question1.classList.add('q-active');
//         btn1.classList.add('q-active');
//     }
//     if (currentQuestion == 2) {
//         question2.classList.add('q-active');
//         back1.classList.add('q-active');
//         btn2.classList.add('q-active');
//     }
// };

// // funciton to remove q-active from all hide classes and set q-active on active quesiton

// function setNewActive() {
//     var hiddenQuestions = document.getElementsByClassName('hide');
//     for (var hiddenQuestion of hiddenQuestions) {
//         hiddenQuestion.classList.remove('q-active');
//     }
//         // set q-active on active quesiton
//     if (currentQuestion == 0) {
//         question2.classList.add('q-active');
//         btn2.classList.add('q-active');
//         back1.classList.add('q-active');
//     }
//     if (currentQuestion == 1) {
//         question3.classList.add('q-active');
//         btn3.classList.add('q-active');
//         back2.classList.add('q-active');
//     }
// };

//Making code dynamic to prevent reused code

//Array of correct scores by user
let currentQuestion = 0;
const totalQuestionCount = questions.length;


//Selecting all containers to input data into
const questionCntr = document.querySelector(".question-cntr");
const questionNumber = document.querySelector("#question-number");
const question = document.querySelector("#question");
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
        var mySet = new Set();
        return array.filter(function(x) {
            var key = keyFn(x), isNew = !mySet.has(key);
            if (isNew) mySet.add(key);
            return isNew;
        });
    }
    const withoutDuplicates = removeDuplicatesBy(x => x.name, answerContainer);
    console.log(withoutDuplicates.length)
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
            console.log(questionInputs)
            questionInputs.forEach(input => {
                input.addEventListener("click", (e) => {
                    let object = {
                        name: this.name,
                        value: this.value
                    };
                    object.name = `${e.target.name}`;
                    object.value = `${e.target.value}`;
                    // console.log(object)
                    //condition to check if answer is correct
                    if (questions[currentQuestion].answer == e.target.value) {
                        answerContainer.push(object)
                    }
                    // console.log(answerContainer)
                });
            })
        };
    }
}





