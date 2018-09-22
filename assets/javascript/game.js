$(document).ready(function() {
    
    $(".main").hide();

    var questionNum = 0;
    var correct = 0;
    var incorrect = 0;
    var score = 0;

    var countdown;
    var impendingDoom;

    var timer = {

        time: 30,

        decrement: function() {
            timer.time--;
        },
        
        reset: function() {
            clearTimeout(impendingDoom);
            clearInterval(countdown);
            $(".time-left").text("0:00");
        },

        countdown: function() {
            timer.decrement();
            $(".time-left").text(timer.time);
        }
    };

    var q1 = {

        number: 1,
        questionStr: "test question",
        choice1: "test1",
        choice2: "test2",
        choice3: "test3",
        choice4: "test4",
        choice5: "test5",
        correctChoice: "test4",
        correctMsg: "testmsg1",
        incorrectMsg: "testmsg2",    
    };

    var questionArr = [q1];

    $("#start").on("click", function() {

        $("#start").hide();
        nextQuestion(questionNum);
    });

    var nextQuestion = function(questionNum) {

        $(".result-screen").hide();
        $(".main-screen").show();

        $("#question-num").html(questionArr[questionNum].number);
        $("#question").text(questionArr[questionNum].questionStr);
        $("#choice1").html(questionArr[questionNum].choice1);
        $("#choice2").html(questionArr[questionNum].choice2);
        $("#choice3").html(questionArr[questionNum].choice3);
        $("#choice4").html(questionArr[questionNum].choice4);
        $("#choice5").html(questionArr[questionNum].choice5);

        timer.time = timer.time + 2 * questionNum;
        impendingDoom = setTimeout(resultScreen(false), timer.time * 1000);
        display = setInterval(timer.countdown(), timer.time * 1000);
    };

    var resultScreen = function(bool) {

        $(".main-screen").hide();
        $(".result-screen").show();
        
        if (bool === true) {
            $("#announcement").text("CORRECT!");
            $("#message").text(questionArr[questionNum].correctMsg);
        
        } else {
            $("#announcement").text("INCORRECT!");
            $("#message").text(questionArr[questionNum].incorrectMsg);
        };

        questionNum++
        if (questionNum === 10) {

            gameEnd = setTimeout(function() {
                $(".main").hide();
                $("#start").show();
                questionNum = 0;
                correct = 0;
                incorrect = 0;
                score = 0;
            }, 10000);

        } else {
            gameCont = setTimeout(function() {
                nextQuestion(questionNum);
            }, 10000);
        };
    };

    $(".choices").on("click", function() {

        timer.reset();
        var answer = $("span", this).attr("id");

        if (answer === questionArr[questionNum].correctChoice) {
            score += 100;
            correct++;
            resultScreen(true);

        } else {
            incorrect++;
            resultScreen(false);
        };
    });
})