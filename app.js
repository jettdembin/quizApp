var currentQuestion = 0;
var score = 0;
var totalQuestionCount = 0;



var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var question2 = document.getElementById("question-cntr2");
var question3 = document.getElementById("question-cntr3");

//function
function totalScore() {
    var selectedOption = document.querySelector('input[type=radio]:checked');
    for (var question of questions) {
        var answer = selectedOption.value;
        if (answer === question[answer]) {
            score++
        }
        return score
    }
};

var questions = [{
    "question" : "Which of the following is not a real eCommerce platform?",
    "option1" : "Shopify",
    "option2" : "WooCommerce",
    "option3" : "ShopCommerce",
    "option4" : "BigCommerce",
    "answer" : "3"
}, {
    "question" : "If Shopify is so good, why are Shopify developers necessary?",
    "option1" : "To save time on things like store setups and migrations",
    "option2" : "To extend the limited design options and functionalities of themes with custom code",
    "option3" : "To provide support with a deep understanding of how the platform works and what its limitations are",
    "option4" : "All the above",
    "answer" : "4"
}, {
    "question" : "Which of the following is true about Shopify developers?",
    "option1" : "They are paid extremely well",
    "option2" : "There is a high demand for them",
    "option3" : "They need to know web development, the platform itself, and the liquid template language",
    "option4" : "All the above",
    "answer" : "4"
}];

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
function setNewActive1() {
    totalScore();
    var hiddenQuestions = document.getElementsByClassName('hide');
    for (var hiddenQuestion of hiddenQuestions) {
        hiddenQuestion.classList.remove('q-active');
    }
        // set q-active on active quesiton
    question2.classList.add('q-active');
    btn2.classList.add('q-active');
};

      //function onclick for button one to change to next question
btn1.addEventListener('click', function() {
    setNewActive1()
});

function setNewActive2() {
    totalScore();
    var hiddenQuestions = document.getElementsByClassName('hide');
    for (var hiddenQuestion of hiddenQuestions) {
        hiddenQuestion.classList.remove('q-active');
    }
        // set q-active on active quesiton
    question3.classList.add('q-active');
    btn3.classList.add('q-active');
};

      //function onclick for button one to change to next question
btn2.addEventListener('click', function() {
    setNewActive2()
    btn3.textContent = "Submit";
});

btn3.addEventListener('click', function() {
    totalScore();
    document.getElementById("container").style.cssText = "opacity:.4";
    document.getElementById('result').style.cssText = "display:block";
    document.getElementById("scored").textContent = score;
})