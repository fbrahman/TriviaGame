var quiz = {
    correct: 0,
    incorrect:0,
    totalQuestions: 5,
    questionArray: [],
    answerArray: [],
    choicesArray: [],

    displayRandQuestion: function() {

        $(".questionSection").remove();
        $(".answerSection").remove();

        let vQuestion;
        let vIndex = quiz.random(0, quiz.questionArray.length-1);

        vQuestion = quiz.questionArray[vIndex].qtext

        var $elem = $(".mainSection");

        $elem.append(
            $("<div>", { "class": "questionSection" }).append(
                $("<p>", { "class": "questionText", text: vQuestion, "qIndex":vIndex})
            )
        );

        quiz.chooseAnswerOptions();
    },

    displayAnswers: function(){

    	//prevent repeating choices -- still to do!

    	$(".answerSection").remove();

    	let vIndex = $(".questionText").attr("qIndex");
    	let vCorrectAnsdone = 0;
    	let vIncorrectAnsdone = 0;
    
    	var $elem = $(".mainSection");

    	$elem.append(
    		$("<div>", {"class": "answerSection"})
    	);

    	// for(i = 0; i < 4; i++){

    	// 	$(".answerSection").append(
    	// 		$("<div>", {"class": "answer", "id":"answer"+i, text:quiz.answerArray[vIndex].atextarray[i]})
    	// 	)
    	// }

    	for (i = 0; i < 8; i++){
    		
    		let vRandTF = quiz.random(0,1);
    		let vCorrectRand = quiz.random(0, quiz.choicesArray.atextarray.length-1);
    		let vIncorrectRand = quiz.random(0, Object.keys(quiz.choicesArray).length - 3);
    		let vIncorrectTextRand = quiz.random(0, quiz.choicesArray[vIncorrectRand].atextarray.length-1);

    		console.log("this is the incorrect rand", vIncorrectRand);
    		console.log("this is the incorrect text rand", vIncorrectTextRand);

    		if (vRandTF == true && vCorrectAnsdone === 0){
    			$(".answerSection").append(
    				$("<div>", {"class": "answer", "id":"answer"+i,"status":"correct", text: quiz.choicesArray.atextarray[vCorrectRand]})
    			)
    			vCorrectAnsdone = 1;
    		}else if (vIncorrectAnsdone < 3){
    			$(".answerSection").append(
    				$("<div>", {"class": "answer", "id":"answer"+i,"status":"incorrect", text: quiz.choicesArray[vIncorrectRand].atextarray[vIncorrectTextRand]})
    			);
    			vIncorrectAnsdone++;
    		} 
    	}

    	quiz.checkUserInput(); 
    	
    },
    
    chooseAnswerOptions: function() {

    	let vIndex = $(".questionText").attr("qIndex");
    	let vQType = quiz.questionArray[vIndex].qtype;
    	let vCorrectAnswers = [];
    	let vIncorrectAnswers = [];

    	//find correct answers array and push to vCorrectAnswers
    	$.each(quiz.answerArray, function (index,value){
    		// console.log(value);
    		if(vCorrectAnswers.length !== 1){
	    		if(quiz.answerArray[index].atype === vQType){
	    			//vCorrectAnswers.push(value)
	    			vCorrectAnswers = $.extend(true, {}, value);
	    			return false;
	    		};
	    	}
	    	else{
	    		// extra protection to leave the each loop
	    		console.log("I'm in the else loop boo!")
	    		return false;
	    	}
       	});

       	$.each(quiz.answerArray, function (index,value){
       		if(quiz.answerArray[index].atype !== vQType){
       			 var vIncorrectAnswerholder = $.extend(true,{}, value);
       			 vIncorrectAnswers.push(vIncorrectAnswerholder);
       		};
       	});
		
		console.log(vCorrectAnswers);
		console.log(vIncorrectAnswers);

		quiz.choicesArray = $.extend(true, vCorrectAnswers,vIncorrectAnswers);

		quiz.displayAnswers();

    },

    checkUserInput: function() {

    	$(".answer").click(function(){
    		console.log($(this).attr("status"));
    		if ($(this).attr("status") === "correct"){
    			quiz.correct++;
    		}else{
    			quiz.incorrect++;
    		}
    	console.log(quiz.correct, quiz.incorrect);
    	});

    	
    },

    calculateScore: function(correct, totalQuestions) {

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
