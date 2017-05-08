var quiz = {
    correct: 0,
    totalQuestions: 5,
    questionArray: [],
    answerArray: [],

    displayRandQuestion: function() {

        $(".questionSection").remove();

        let vQuestion;
        let vIndex = quiz.random(0, quiz.questionArray.length-1);

        vQuestion = quiz.questionArray[vIndex].qtext

        var $elem = $(".mainSection");

        $elem.append(
            $("<div>", { "class": "questionSection" }).append(
                $("<p>", { "class": "questionText", text: vQuestion, "qIndex":vIndex})
            )
        );
    },

    displayAnswers: function(){

    	$(".answerSection").remove();

    	let vIndex = $(".questionText").attr("qIndex");
    
    	var $elem = $(".mainSection");

    	$elem.append(
    		$("<div>", {"class": "answerSection"})
    	)

    	for(i = 0; i < 4; i++){

    		$(".answerSection").append(
    			$("<div>", {"class": "answer", "id":"answer"+i, text:quiz.answerArray[vIndex].atextarray[i]})
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

    questions: function (type, text, count){
    	this.qtype = type;
    	this.qtext = text;
    	this.qcount = count;
    	quiz.questionArray.push(this);
    },

    answers: function (type, text){
    	this.atype = type;
    	this.atextarray = text;
    	quiz.answerArray.push(this);
    }

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
