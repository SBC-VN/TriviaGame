// Constructor takes the information from the API call and massages it a bit into
// an internal object that contains tracking information and questions in a 
// specific order.

class GameQuestion {
    constructor(question, correctAnswer, incorrectAnswers) {
        this.question = question.replace(/&quot;/g, '"').replace(/&#039;/g,"'");
        this.answers = [];
        this.answers[0] = correctAnswer;
        for (var i=0; i<3; i++) {
            this.answers[i+1] = incorrectAnswers[i];
        }
        this.asked = false;
        this.wasCorrectlyAnswered = false;
        this.timeOut = false;
    }

    // function checks an answer to see if it's right.  Keeps track if this question was
    // answered correctly.
    isCorrectAnswer (userAnswer) {
        if (this.answers[0] === userAnswer) {
            this.wasCorrectlyAnswered = true;
        }
        else {
            this.wasCorrectlyAnswered = false;
        }
    }

    // function returns the answers in a somewhat random order, as the first element in the 
    // answer array is the correct answer - an astute player would pick out this if
    // the order wasn't changed.
    getAnswerSet() {
        this.asked = true;
        var startIndex = Math.floor(Math.random() * this.answers.length);
        var returnArray = [];

        for (var i=0; i<this.answers.length; i++) {
            returnArray[i] = this.answers[(startIndex + i) % this.answers.length];
        }

        return returnArray;
    }
};  

var questionArray = [];

function processApiResponse(response) {
    for (var i=0; i<response.results.length; i++) {
        questionArray[i] = new GameQuestion (response.results[i].question,
                                             response.results[i].correct_answer,
                                             response.results[i].incorrect_answers);
    }

    // Attach the start button *after* the api query is done...
    var startButton=$("<button type='button' class='btn btn-primary btn-block' id='start-button'>");
    startButton.text("Start Game");
    startButton.css("text-align","center");
    $("#instructions-block").append(startButton);
    $("#start-button").on("click",startGame);
}