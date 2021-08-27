var currentQuestion = 0;
var score = 0;
var totalQuestionCount = questions.length;



var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var back1 = document.getElementById('back-1');
var back2 = document.getElementById('back-2');
var question2 = document.getElementById("question-cntr2");
var question3 = document.getElementById("question-cntr3");



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
};


/*
Title: eCommerce Quiz

Question 1: Which of the following is not a real eCommerce platform?
- Shopify 
- WooCommerce
- ShopCommerce [correct]
- BigCommerce

Question 2: If Shopify is so good, why are Shopify developers necessary?
- To save time on things like store setups and migrations
- To extend the limited design options and functionalities of themes with custom code
- To provide support with a deep understanding of how the platform works and what its limitations are
- All the above [correct]

Question 3: Which of the following is true about Shopify developers?
- They are paid extremely well
- There is a high demand for them
- They need to know web development, the platform itself, and the liquid template language
- All the above [correct]

*/ 

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
        back1.classList.add('q-active');
    }
    if (currentQuestion == 1) {
        question3.classList.add('q-active');
        btn3.classList.add('q-active');
    }
};

      //function onclick for button one to change to next question
btn1.addEventListener('click', function() {
    totalScore();
});

/*
function setNewActive2() {
    var hiddenQuestions = document.getElementsByClassName('hide');
    for (var hiddenQuestion of hiddenQuestions) {
        hiddenQuestion.classList.remove('q-active');
    }
        // set q-active on active quesiton
    question3.classList.add('q-active');
    btn3.classList.add('q-active');
};*/

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
})
