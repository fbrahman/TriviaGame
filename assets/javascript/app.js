var quiz = {
    correct: 0,
    totalQuestions: 5,

    displayQuestion: function(question) {

        var $elem = $("#mainSection");

        $elem.append(
            $("<div>", {"class": "questionSection"}).append(
                $("<p>", {"class":"questionText"})
                )
        );
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