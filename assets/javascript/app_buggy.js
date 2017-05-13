var quiz = {
    correct: 0,
    incorrect: 0,
    settingTotalQuestions: 5,
    totalQuestionsAsked: 0,
    questionArray: [],
    answerArray: [],
    choicesArray: [],

    displayScreen: function(call) {
        if (call === "startPage" || !$("#startPage").hasClass("invisible") && $("#gamePage").hasClass("invisible")) {
            $("#gamePage").toggleClass("invisible");
            $("#startPage").toggleClass("invisible");
            if($("#overPage").hasClass("invisible")){
            	$("#overPage").toggleClass("invisible");
            }
            return;
        };

        if (call === "correctPage" || !$("#correctPage").hasClass("invisible") && $("#gamePage").hasClass("invisible")) {
            $("#gamePage").toggleClass("invisible");
            $("#correctPage").toggleClass("invisible");
            return;
        };

        if (call === "incorrectPage" || !$("#incorrectPage").hasClass("invisible") && $("#gamePage").hasClass("invisible")) {
            $("#gamePage").toggleClass("invisible");
            $("#incorrectPage").toggleClass("invisible");
            return;
        };

        if (call === "timesUpPage" || $("#gamePage").hasClass("invisible") && !$("#timesUpPage").hasClass("invisible")) {
            $("#gamePage").toggleClass("invisible");
            $("#timesUpPage").toggleClass("invisible");
            return;
        };

        if (call === "overPage") {
	     	$("#gamePage").toggleClass("invisible");
	     	$("#overPage").toggleClass("invisible");   	
        };

    },

    displayRandQuestion: function() {
        quiz.displayScreen();

        $(".questionSection").remove();
        $(".answerSection").remove();

        let vQuestion;
        let vIndex = quiz.random(0, quiz.questionArray.length - 1);

        vQuestion = quiz.questionArray[vIndex].qtext

        var $elem = $(".mainSection");

        $elem.append(
            $("<div>", { "class": "questionSection" }).append(
                $("<p>", { "class": "questionText", text: vQuestion, "qIndex": vIndex })
            )
        );
        quiz.chooseAnswerOptions(); //go to function to create object of all possible correct and incorrect options
    },

    displayAnswers: function() {
        $(".answerSection").remove();

        let vIndex = $(".questionText").attr("qIndex");
        let vCorrectAnsdone = 0;
        let vIncorrectAnsdone = 0;
        let vChoiceArray = $.extend(true, {}, quiz.choicesArray);

        console.log("Copy of choice array", vChoiceArray);
        console.log(typeof(vChoiceArray));

        var $elem = $(".mainSection");

        $elem.append(
            $("<div>", { "class": "answerSection" })
        );

        for (i = 0; i < 16; i++) {
            let vRandTF = quiz.random(0, 1);
            let vCorrectRand = quiz.random(0, vChoiceArray.atextarray.length - 1);
            let vIncorrectRand = quiz.random(0, Object.keys(vChoiceArray).length - 3);
            let vIncorrectTextRand = quiz.random(0, vChoiceArray[vIncorrectRand].atextarray.length - 1);

            // console.log("this is the incorrect rand", vIncorrectRand);
            // console.log("this is the incorrect text rand", vIncorrectTextRand);

            if (vRandTF == true && vCorrectAnsdone === 0) {
                $(".answerSection").append(
                    $("<div>", { "class": "answer", "id": "answer" + i, "status": "correct", text: vChoiceArray.atextarray[vCorrectRand] })
                )
                vCorrectAnsdone = 1;
            } else if (vIncorrectAnsdone < 3) {
                $(".answerSection").append(
                    $("<div>", { "class": "answer", "id": "answer" + i, "status": "incorrect", "ipIndex": vIncorrectRand, "icIndex": vIncorrectTextRand, text: vChoiceArray[vIncorrectRand].atextarray[vIncorrectTextRand] })
                );

                delete vChoiceArray[vIncorrectRand].atextarray[vIncorrectTextRand];

                vIncorrectAnsdone++;
            }
        }

        quiz.timer.reset("#gpTimer"); //so the timer will not start with a zero and jump up to the beginning of the countdown.

        quiz.timer.startTimer(20, "#gpTimer", quiz.timesUpAnswer); //start timer for 15 seconds and once it runs out run the times up function.

        quiz.checkUserInput(); //turn on event listener after the answers are displayed to check user input
    },

    chooseAnswerOptions: function() {
        let vIndex = $(".questionText").attr("qIndex");
        let vQType = quiz.questionArray[vIndex].qtype;
        let vCorrectAnswers = [];
        let vIncorrectAnswers = [];

        //find correct answers array and push to vCorrectAnswers
        $.each(quiz.answerArray, function(index, value) {
            // console.log(value);
            if (vCorrectAnswers.length !== 1) {
                if (quiz.answerArray[index].atype === vQType) {
                    //vCorrectAnswers.push(value)
                    vCorrectAnswers = $.extend(true, {}, value);
                    return false;
                };
            } else {
                // extra protection to leave the each loop
                console.log("I'm in the else loop boo!")
                return false;
            }
        });

        $.each(quiz.answerArray, function(index, value) {
            if (quiz.answerArray[index].atype !== vQType) {
                var vIncorrectAnswerholder = $.extend(true, {}, value);
                vIncorrectAnswers.push(vIncorrectAnswerholder);
            };
        });

        console.log((vCorrectAnswers));
        console.log((vIncorrectAnswers));

        quiz.choicesArray = $.extend(true, vCorrectAnswers, vIncorrectAnswers);

        quiz.displayAnswers(); // using the created array of correct/incorrect options go to display answer functionality to randomly pick one correct answer and 3 incorrect answers.
    },

    checkUserInput: function() {
        $(".answer").click(function() {
            console.log($(this).attr("status"));
            if ($(this).attr("status") === "correct") {
                quiz.correct++;
                quiz.timer.reset("#gpTimer");
                quiz.correctAnswer();

            } else if ($(this).attr("status") === "incorrect") {
                quiz.incorrect++;
                quiz.timer.reset("#gpTimer");
                quiz.incorrectAnswer();
            }
            console.log(quiz.correct, quiz.incorrect);
        });

        ++quiz.totalQuestionsAsked;
        console.log("total questions asked ", quiz.totalQuestionsAsked);

        if (quiz.totalQuestionsAsked === 2) {
            console.log("done!");
            quiz.displayScreen("overPage");
        };
    },

    calculateScore: function(correct, totalQuestions) {},

    incorrectAnswer: function() {
        quiz.displayScreen("incorrectPage");
        quiz.timer.reset("#ipTimer");
        quiz.timer.startTimer(5, "#ipTimer", quiz.displayRandQuestion);
    },

    correctAnswer: function() {
        quiz.displayScreen("correctPage");
        quiz.timer.reset("#cpTimer");
        quiz.timer.startTimer(5, "#cpTimer", quiz.displayScreen, quiz.displayRandQuestion);
    },

    timesUpAnswer: function() {
        quiz.displayScreen("timesUpPage");
        quiz.timer.reset("#tpTimer");
        quiz.timer.startTimer(10, "#tpTimer", quiz.displayRandQuestion);
    },

    random: function(min, max) {
        let vnum;
        vnum = Math.floor(Math.random() * (max - min + 1) + min);
        return vnum;
    },

    timer: {
        timeInter: "",
        vtimer: 0,

        startTimer: function(time, loc, callback) {
            vtimer = time;
            timeInter = setInterval(function() {
                vtimer--;
                quiz.timer.displayTimer(loc, vtimer);
                if (vtimer === 0) {
                    quiz.timer.stopTimer();
                    callback();
                };
            }, 1000);
        },

        stopTimer: function() {
            clearInterval(timeInter);
        },

        displayTimer: function(loc, time) {
            $(loc).html(time);
        },

        reset: function(loc) {
            quiz.timer.stopTimer();
            vtimer = 0;
            $(loc).empty();
        }
    },

    questions: function(type, text, count) {
        this.qtype = type;
        this.qtext = text;
        this.qcount = count;
        quiz.questionArray.push(this);
    },

    answers: function(type, text) {
        this.atype = type;
        this.atextarray = text;
        quiz.answerArray.push(this);
    },

    reset: function() {
        quiz.timer.reset("#gpTimer");
        quiz.displayScreen("startPage");
        quiz.displayRandQuestion();
    },

    eventListener: function() {
        quiz.timer.startTimer(100, "#timer", quiz.displayRandQuestion);

        $("#startQuiz").click(quiz.reset);
        $("#replayQuiz").click(quiz.reset);
    }
}

quiz.eventListener();

// var testarray = [0, 1];

// // Testing randomization of array.
// var objResults = {} 
// 	for(var i = 0; i < 1000000; i++){ 
// 		var randomElement = testarray[quiz.random(0, testarray.length-1)] 
// 		if (objResults[randomElement]){ 
// 			objResults[randomElement]++ 
// 		}
// 		else{ 
// 			objResults[randomElement] = 1 } } console.log(objResults)
