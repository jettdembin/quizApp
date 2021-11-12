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
let answerContainer = [];
const totalQuestionCount = questions.length;
let score= 0;

//Selecting all containers to input data into
const questionCntr = document.querySelector(".question-cntr");
const questionNumber = document.querySelector("#question-number");
const question = document.querySelector("#question");
const nextButton = document.querySelector(".next-btn");
const backButton = document.querySelector(".back-btn");


//Creating Container for questions and answers to go into
function showQuestion() {
    questions.forEach((question, i) => {
        const questionContent = document.createElement('div');
        questionContent.innerHTML = `
        <h2 id="question-number">Question ${i+ 1} of ${totalQuestionCount}</h2>
        <h4 id="question">${questions[i].question}</h4>
        
        <div class="question-content">
            <div class="question-style">
                <input type="radio" name="matrix" value="1" onclick="check()">${questions[i].option1}</input><br />
            </div>
            <div class="question-style">
                <input type="radio" name="matrix" value="2" onclick="check()">${questions[i].option2}</input><br />
            </div>
                <div class="question-style">
                <input type="radio" name="matrix" value="3" onclick="check()">${questions[i].option3}</input><br />
            </div>
            <div class="question-style">
                <input type="radio" name="matrix" value="4" onclick="check()">${questions[i].option4}</input>
            </div>
        </div> 
    `;
        questionContent.classList.add("question-content", "hide");
        if (currentQuestion == i) {
            questionContent.classList.add("q-active");
            questionCntr.appendChild(questionContent);
        }
    });
}

//function to show correct question on load
window.addEventListener('load', () => {
    if (!currentQuestion) {
        showQuestion();
    }
});



//function to listen for submission on question answer and to continue to next question
function next() {
    const selectedOption = document.querySelector('input[type=radio]:checked');
    if (selectedOption.value == questions[currentQuestion].answer) {
        score++
    }
    currentQuestion++
    console.log(currentQuestion)
    showQuestion();
}

//funciton to check value to allow to contine
function check() {
    console.log('whats good');
    nextButton.style.cssText = "pointer-events: auto; cursor: pointer;opacity: 1; background-color: #4caf50;";
}


