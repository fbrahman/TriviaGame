var quiz = {
    correct: 0,
    totalQuestions: 5,
    questions: [
    "question 1",
    "question 2", 
    "question 3", 
    "question 4",
    "question 5",
    "question 6", 
    "question 7",
    "question 8",
    "question 9",
    "question 10"],

    displayRandQuestion: function() {

        $(".questionSection").remove();

        let vQuestion;

        vQuestion = quiz.questions[quiz.random(0, quiz.questions.length-1)]

        var $elem = $(".mainSection");

        $elem.append(
            $("<div>", { "class": "questionSection" }).append(
                $("<p>", { "class": "questionText", text: vQuestion})
            )
        );
    },

    displayAnswers: function(answer){
    	var $elem = $(".mainSection");

    	$elem.append(
    		$("<div>", {"class": "answerSection"})
    	)

    	for(i = 0; i < 4; i++){

    		$(".answerSection").append(
    			$("<div>", {"class": "answer", "id":"answer"+i, text: answer+i})
    		)
    	}
    	
    },
    
    checkUserInput: function(question, userAnswer) {

    },

    calculateScore: function(correct, totalQuestions) {

    },

    chooseQuestion: function() {

    },

    random: function(min, max) {
        let vnum;

        vnum = Math.floor(Math.random() * (max - min + 1) + min);

        return vnum;
    },

    timer: {

        time: 90,
        timeInter: "",

        startTimer: function(time, loc) {
            let vtimer = time;
            timeInter = setInterval(function() {

                vtimer--;

                quiz.timer.displayTimer(loc, vtimer);

                if (vtimer === 0) {
                    quiz.timer.stopTimer();
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

}

// Testing randomization of array.
// var objResults = {} 
// 	for(var i = 0; i < 1000000; i++){ 
// 		var randomElement = quiz.questions[quiz.random(0, quiz.questions.length-1)] 
// 		if (objResults[randomElement]){ 
// 			objResults[randomElement]++ 
// 		}
// 		else{ 
// 			objResults[randomElement] = 1 } } console.log(objResults)
