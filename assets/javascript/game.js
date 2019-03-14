populateQuestionArray();

var startQuestion;
var questionCount = 0;
var currentQuestion;
var timerId;
const startRemainingTime=10;
var remainingTime=0;

var questionRightAudio = new Audio('assets/images/tada.wav');
var questionWrongAudio = new Audio('assets/images/Windows Critical Stop.wav');
var goodGameAudio;
var badGameAudio;

function displayQuestionResult() {
    // console.log("displayQuestionResult");

    // Disable handing a click event on an answer..
    $(".answer").off("click");
    $("#question-results-block").empty();
    $("#game-block").css("display","none");
    $("#question-results-block").css("display","block");

    if (currentQuestion.timeOut === true) {
        $("#question-results-block").append($("<h1 class='question-result'>").text("Time's Up!"));
    }
    else if (currentQuestion.wasCorrectlyAnswered) {
        $("#question-results-block").append($("<h1 class='question-result'>").text("Correct!"));
        questionRightAudio.play();
    }
    else {
        $("#question-results-block").append($("<h1 class='question-result'>").text("Incorrect!"));
        questionWrongAudio.play();
    }
 
    setTimeout(setQuestion,1000);
}

function displayGameResults() {
    //console.log("displayGameResults");

    clearInterval(timerId);
    $("#question-results-block").empty();
    $("#game-block").css("display","none");
    $("#game-results-block").css("display","block");

    var correct = 0;
    var incorrect = 0;
    var timeout = 0;

    for (var i=0; i<questionArray.length; i++) {
        if (questionArray[i].timeOut === true) {
            timeout++;
        }
        else if (questionArray[i].wasCorrectlyAnswered === true) {
            correct++;
        }
        else {
            incorrect++;
        }
    }

    $("#question-count").text(questionArray.length);
    $("#correct-count").text(correct);
    $("#wrong-count").text(incorrect + timeout);
    $("#play-again-button").on("click",playAgainClickHandler);
}

function playAgainClickHandler() {
    //console.log("playAgainClickHander");
    $("#play-again-button").off("click");
    questionCount =0;
    startQuestion = undefined;
    currentQuestion = undefined;
    $("#game-results-block").css("display","none");
    setQuestion();
}

function answerClickHandler(evt) {
    //console.log("answerClickHandler");
 
    clearInterval(timerId);
    var checkAns = currentQuestion.isCorrectAnswer(evt.target.textContent);
    displayQuestionResult();
}

function timerTickHandler() {
    //console.log("timerTick");
    if (--remainingTime <= 0) {
        clearInterval(timerId);
        currentQuestion.timeOut = true;
        displayQuestionResult();
    }
    else {
        $("#remaining-time-field").text(remainingTime);

        if (remainingTime > startRemainingTime / 2) {
             $("#remaining-time-field").css("color","lime");
        }
        else if (remainingTime > startRemainingTime / 4) {
           $("#remaining-time-field").css("color","yellow");
        }
        else {
            $("#remaining-time-field").css("color","red");
        }
    }
}

function setQuestion() {
    //console.log("setQuestion");
    // When we run out of questions, game is over...
    if (questionCount >= questionArray.length) {
        displayGameResults();
        return;
    }

    // first time through, pick a random question to start with.  Then sequentially 
    // walk the question array.
    if (startQuestion === undefined) {
        startQuestion = Math.floor(Math.random() * questionArray.length);
    }

    var curQuestionIndex = (startQuestion + questionCount) % questionArray.length;
    currentQuestion = questionArray[curQuestionIndex];

    // Set to the game display block and reset the timer.
    $("#question-results-block","none");
    $("#question-results-block").empty();
    $("#game-block").css("display","block");
    remainingTime=startRemainingTime;
    $("#remaining-time-field").text(remainingTime);
    $("#remaining-time-field").css("color","lime");
    
    $("#question-field").text(currentQuestion.question);
    var questArray = currentQuestion.getAnswerSet();

    for (var i=0; i<questArray.length; i++) {
        $("#answer-"+i).text(questArray[i]);
    }

    questionCount++;
    clearInterval(timerId);
    timerId = setInterval(timerTickHandler,1000);
    $(".answer").on("click",answerClickHandler);
    $(".answer").on("mouseenter",function(evt) {
        this.style.color = "blue";
    });
    $(".answer").on("mouseleave",function() {
        this.style.color = "black";
    });
}

setQuestion();