var quiz = {
    correct: 0,
    incorrect: 0,
    totalQuestions: 5,
    questionArray: [],
    answerArray: [],
    choicesArray: [],

    displayRandQuestion: function() {

    	if($("#gamePage").hasClass("invisible") && !$("#correctPage").hasClass("invisible")){
    		$("#gamePage").toggleClass("invisible");
    		$("#correctPage").toggleClass("invisible");
    	};

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
        let vChoiceArray = $.extend(true, {},quiz.choicesArray);

        console.log("Copy of choice array",vChoiceArray);
        console.log(typeof(vChoiceArray));

        var $elem = $(".mainSection");

        $elem.append(
            $("<div>", { "class": "answerSection" })
        );

        // for(i = 0; i < 4; i++){

        // 	$(".answerSection").append(
        // 		$("<div>", {"class": "answer", "id":"answer"+i, text:quiz.answerArray[vIndex].atextarray[i]})
        // 	)
        // }

        for (i = 0; i < 8; i++) {

            let vRandTF = quiz.random(0, 1);
            let vCorrectRand = quiz.random(0, vChoiceArray.atextarray.length - 1);
            let vIncorrectRand = quiz.random(0, Object.keys(vChoiceArray).length - 3);
            let vIncorrectTextRand = quiz.random(0, vChoiceArray[vIncorrectRand].atextarray.length - 1);
            
            console.log("this is the incorrect rand", vIncorrectRand);
            console.log("this is the incorrect text rand", vIncorrectTextRand);

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

        quiz.checkUserInput(); //turn on event listener after the answers are display to check user input

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

        quiz.displayAnswers(); // using the created array of correct/incorrect options go to display answer functionality

    },

    checkUserInput: function() {

        $(".answer").click(function() {
            console.log($(this).attr("status"));
            if ($(this).attr("status") === "correct") {
                quiz.correct++;
                quiz.correctAnswer();

            } else {
                quiz.incorrect++;
            }
            console.log(quiz.correct, quiz.incorrect);
        });


    },

    calculateScore: function(correct, totalQuestions) {

    },

    incorrectAnswer: function(){

    },

    correctAnswer: function(){
    	$("#gamePage").toggleClass("invisible");
    	$("#correctPage").toggleClass("invisible");
    	$("#cpTimer").empty();
    	quiz.timer.startTimer(5, "#cpTimer", quiz.displayRandQuestion);
    },

    random: function(min, max) {
        let vnum;

        vnum = Math.floor(Math.random() * (max - min + 1) + min);

        return vnum;
    },

    timer: {

        time: 90,
        timeInter: "",

        startTimer: function(time, loc, callback) {
            let vtimer = time;
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

    reset: function (){

    	quiz.timer.startTimer(90, "#timer");

    	$("#startQuiz").click(function(){
    		$("#startPage").toggleClass("invisible");
    		$("#gamePage").toggleClass("invisible");
    		quiz.displayRandQuestion();
    	})

    }

}

quiz.reset();


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
