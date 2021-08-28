var currentQuestion = 0;
var score = 0;
var totalQuestionCount = questions.length;

var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var back1 = document.getElementById('back-1');
var back2 = document.getElementById('back-2');
var question1 = document.getElementById("question-cntr1")
var question2 = document.getElementById("question-cntr2");
var question3 = document.getElementById("question-cntr3");

//function onclick for button one to change to next question
btn1.addEventListener('click', function() {
    totalScore();
});

//function onclick for button one to change to next question
btn2.addEventListener('click', function() {
    totalScore();
    btn3.textContent = "Submit";
});

btn3.addEventListener('click', function() {
    totalScore();
    document.getElementById("container").style.cssText = "opacity:.4";
    document.getElementById("heading").style.cssText = "text-align:center";
    document.getElementById('result').style.cssText = "display:block";
    document.getElementById("scored").textContent = score;
});

back1.addEventListener('click', function() {
    previousQuestion();
});
back2.addEventListener('click', function() {
    previousQuestion();
});


//function
function totalScore() {
    var selectedOption = document.querySelector('input[type=radio]:checked');
    if (!selectedOption) {
        alert("Please select an answer before proceeding");
        return
    }
    var answer = selectedOption.value;
    if (questions[currentQuestion].answer == answer) {
        score++;
    }
    selectedOption.checked = false;
    setNewActive();
    currentQuestion++;
    if (currentQuestion === totalQuestionCount) {
        document.getElementById("container").style.cssText = "opacity:.4";
        document.getElementById("heading").style.cssText = "text-align:center";
        document.getElementById('result').style.cssText = "display:block";
        document.getElementById("scored").textContent = score;
    }
};

function previousQuestion() {
    var hiddenQuestions = document.getElementsByClassName('hide');
    for (var hiddenQuestion of hiddenQuestions) {
        hiddenQuestion.classList.remove('q-active');
    }
    if (currentQuestion == 1) {
        question1.classList.add('q-active');
        btn1.classList.add('q-active');
    }
    if (currentQuestion == 2) {
        question2.classList.add('q-active');
        btn2.classList.add('q-active');
    }
};

// funciton to remove q-active from all hide classes and set q-active on active quesiton
function setNewActive() {
    var hiddenQuestions = document.getElementsByClassName('hide');
    for (var hiddenQuestion of hiddenQuestions) {
        hiddenQuestion.classList.remove('q-active');
    }
        // set q-active on active quesiton
    if (currentQuestion == 0) {
        question2.classList.add('q-active');
        btn2.classList.add('q-active');
        //back1.classList.add('q-active');
    }
    if (currentQuestion == 1) {
        question3.classList.add('q-active');
        btn3.classList.add('q-active');
        //back2.classList.add('q-active');
    }
};
