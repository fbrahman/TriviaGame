var quiz = {
    correct: 0,
    totalQuestions: 5,
    time: 90,
    timevar: "",


    displayQuestion: function(question) {

    },

    checkUserInput: function(question, userAnswer) {

    },

    calculateScore: function(correct, totalQuestions) {

    },

    timer: function(time) {
        let timer = time;
        timevar = setInterval(function() {
            
            timer--;
           
            $("#timer").html(timer);

            if (timer === 0){
            	quiz.stoptimer();
            };
        }, 1000);

    },

    stoptimer: function (){
    	clearInterval(timevar);
    },

}
