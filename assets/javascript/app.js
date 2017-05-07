var quiz = {
	correct:0,
	totalQuestions:5,
	time: 90,
	

	displayQuestion: function(question){

	},

	checkUserInput: function(question, userAnswer){

	},

	calculateScore: function(correct, totalQuestions){

	},

	timer: function(time){
		let timer = time;
		console.log("this is the timer",timer)

		setInterval(function(){
			timer--;
			return timer;
		},1000);
	}
}