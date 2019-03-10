class GameQuestion {
    constructor(question, correctAnswer, answer2, answer3, answer4) {
        this.question = question;
        this.answers = [];
        this.answers[0] = correctAnswer;
        this.answers[1] = answer2;
        this.answers[2] = answer3;
        this.answers[4] = answer4;
        this.asked = false;
        this.wasCorrectlyAnswered = false;
    }

    // checks an answer to see if it's right.  Keeps track if this question was
    // answered correctly.
    isCorrectAnswer (answer) {
        if (this.answers[0] === answer) {
            this.wasCorrectlyAnswered = true;
        }
        else {
            this.wasCorrectlyAnswered = true;
        }
        return this.wasCorrectlyAnswered;
    }

    // returns the answers in a somewhat random order, as the first element in the 
    // answer array is the correct answer - an astute player would pick out this if
    // the order wasn't changed.
    getAnswerSet() {
        this.asked = true;
        var startIndex = Math.floor(Math.random * this.answers.length);
        var returnArray = [];

        for (var i=0; i<this.answers.length; i++) {
            returnArray[i] = this.answers[(startIndex + i) % this.answers.length];
            console.log("i",i);
            console.log("ans",(startIndex + i) % this.answers.length);
        }
        return returnArray;
    }
};

var questionArray = [];

function populateQuestionArray() {
    questionArray[0] = new GameQuestion ("Which city is the home of Batman?",
                                         "Gotham City",
                                         "Metropolis",
                                         "New York",
                                         "Atlantis");

    questionArray[1] = new GameQuestion ("In which sport would you perform the Fosbury Flop?",
                                         "High Jump",
                                         "Cricket",
                                         "Akido",
                                         "Korfball");

    questionArray[3] = new GameQuestion ("What’s the total number of dots on a pair of dice?",
                                         "42",
                                         "16",
                                         "32",
                                         "48");                                  

    questionArray[4] = new GameQuestion ("How many strings does a violin have?",
                                         "4",
                                         "3",
                                         "6",
                                         "5");
                                         
    questionArray[5] = new GameQuestion ("What is the name of the city where the cartoon family The Simpsons live?",
                                         "Springfield",
                                         "South Park",
                                         "Quahog",
                                         "Riverdale"); 
}