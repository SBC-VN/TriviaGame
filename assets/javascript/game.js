populateQuestionArray();

var startQuestion;
var questionCount = 0;
var currentQuestion;

function setQuestion() {
    // Just a double check - we should keep track of the number of questions asked
    // elsewhere, but it's always good to prevent issues.
    if (questionCount > questionArray.length) {
        return;
    }

    // first time through, pick a random question to start with.  Then sequentially 
    // walk the question array.
    if (startQuestion === undefined) {
        startQuestion = Math.floor(Math.random() * questionArray.length);
    }

    var curQuestionIndex = (startQuestion + questionCount) % questionArray.length;
    currentQuestion = questionArray[curQuestionIndex];
    $("#question-field").text(currentQuestion.question);
    var questArray = currentQuestion.getAnswerSet();
    console.log(questArray);
    for (var i=0; i<questArray.length; i++) {
        $("#answer-"+i).text(questArray[i]);
    }
}

setQuestion();