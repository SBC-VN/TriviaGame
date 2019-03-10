populateQuestionArray();

var startQuestion;
var questionCount = 0;
var currentQuestion;
var timerId;
const startRemainingTime=10;
var remainingTime=0;

function displayQuestionResult() {
    $("#question-results-block").empty();
    $("#game-block").css("display","none");
    $("#question-results-block").css("display","block");

    if (currentQuestion.timeOut === true) {
        $("#question-results-block").append($("<h1 class='question-result'>").text("Time's Up!"));
    }
    else if (currentQuestion.wasCorrectlyAnswered) {
        $("#question-results-block").append($("<h1 class='question-result'>").text("Correct!"));
    }
    else {
        $("#question-results-block").append($("<h1 class='question-result'>").text("Incorrect!"));
    }
    //setTimeout(setQuestion,1000);
}

function displayGameResults() {
    clearInterval(timerId);
    $("#question-results-block").empty();
    $("#game-block").css("display","none");
    $("#game-results-block").css("display","block");

    var correct = 0;
    var incorrect = 0;
    var timeout = 0;

    console.log("final results");
    for (var i=0; i<questionArray.length; i++) {
        console.log("Question id",i);
        if (questionArray[0].timeOut === true) {
            timeout++;
            console.log("timed out");
        }
        else if (questionArray[0].wasCorrectlyAnswered === true) {
            correct++;
            console.log("correct");
        }
        else {
            incorrect++;
            console.log("incorrect");
        }
    }

    $("#question-count").text(questionArray.length);
    $("#correct-count").text(correct);
    $("#wrong-count").text(incorrect + timeout);
    $("#play-again-button").on("click",playAgainClickHandler);
}

function playAgainClickHandler() {
    questionCount =0;
    startQuestion = undefined;
    currentQuestion = undefined;
    $("#game-results-block").css("display","none");
    setQuestion();
}

function answerClickHandler(evt) {
    clearInterval(timerId);
    var checkAns = currentQuestion.isCorrectAnswer(evt.target.textContent);
    displayQuestionResult();
}

function timerTickHandler() {
    if (--remainingTime <= 0) {
        clearInterval(timerId);
        currentQuestion.timeOut = true;
        displayQuestionResult();
    }
    else {
        $("#remaining-time-field").text(remainingTime);
    }
}

function setQuestion() {
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
    
    $("#question-field").text(currentQuestion.question);
    var questArray = currentQuestion.getAnswerSet();

    for (var i=0; i<questArray.length; i++) {
        $("#answer-"+i).text(questArray[i]);
    }

    questionCount++;
    clearInterval(timerId);
    timerId = setInterval(timerTickHandler,1000);
    $(".answer").on("click",answerClickHandler);
}

setQuestion();