$(document).ready(function() {
    
    // hide main content and show only start button
    $(".main").hide();

    var questionNum = 0;
    var correct = 0;
    var incorrect = 0;
    var score = 0;

    // variables for storing setTimeout and setInterval
    var display;
    var impendingDoom;

    // timer object
    var timer = {

        time: 30,
        
        reset: function() {
            clearTimeout(impendingDoom);
            clearInterval(display);
            timer.time = 30;
        },

        countdown: function() {
            timer.time--;
            console.log(timer.time);
            $("#time-left").text(timer.time);
        }
    };

    // objects for all the questions
    var q1 = {
        number: 1,
        questionStr: "Which of the following is absolutely, positively, DEFINITELY not classified as a 'planet'?",
        choice1: "Earth",
        choice2: "Uranus",
        choice3: "Gliese 581 C",
        choice4: "Pluto",
        choice5: "Random brown dwarf floating in interstellar space",
        correctChoice: "Pluto",
        correctMsg: "Pluto was demoted to dwarf planet status in 2006 when planets were formally defined as including the requirement of having achieved gravitational independence within its orbit.",
        incorrectMsg: "Silly you, Pluto is not a planet! Pluto was demoted to dwarf planet status in 2006 when planets were formally defined as including the requirement of having achieved gravitational independence within its orbit."
    };

    var q2 = {

        number: 2,
        questionStr: "test question",
        choice1: "test1",
        choice2: "test2",
        choice3: "test3",
        choice4: "test4",
        choice5: "test5",
        correctChoice: "test3",
        correctMsg: "testmsg1",
        incorrectMsg: "testmsg2",    
    };

    var q3 = {

        number: 3,
        questionStr: "Which of the following fundamental forces of physics is included in Grand Unification theories but not in any Theory of Everything?",
        choice1: "Gravity",
        choice2: "Electromagnetic",
        choice3: "Strong",
        choice4: "Weak",
        choice5: "Higgs",
        correctChoice: "Gravity",
        correctMsg: "The reconciliation of gravity with the other three forces is a difficult one; Grand Unification tends to deal with quantum coupling of the other three forces whereas understanding gravity is usually within the domain of relativity.",
        incorrectMsg: "Gravity is the elephant in the room when it comes to fundamental physics. Electromagnetic, Strong, and Weak forces are being understood through quantum mechanics, whereas gravity is understood through relativity.",    
    };

    var questionArr = [q1, q2, q3];

    // when start button clicked, hide start button and starts with 1st question
    $("#start").on("click", function() {

        $("#start").hide();
        nextQuestion(questionNum);
    });

    // displays next question content onto html
    var nextQuestion = function(questionNum) {

        $(".main").show();
        $(".main-screen").show();
        $(".result-screen").hide();

        timer.reset();
        $("#time-left-msg").text("Time Remaining: ");
        $("#time-left").text(timer.time);

        $("#question-num").text(questionArr[questionNum].number);
        $("#question").text(questionArr[questionNum].questionStr);
        $("#choice1").html(questionArr[questionNum].choice1);
        $("#choice2").html(questionArr[questionNum].choice2);
        $("#choice3").html(questionArr[questionNum].choice3);
        $("#choice4").html(questionArr[questionNum].choice4);
        $("#choice5").html(questionArr[questionNum].choice5);

        // timer.time = timer.time + 5 * questionNum;
        impendingDoom = setTimeout(resultScreen, timer.time * 1000, "timeup");
        display = setInterval(timer.countdown, 1000);
    };

    // screen for showing correct/incorrect answer
    var resultScreen = function(result) {

        timer.reset();
        timer.time = 10;
        $("#time-left-msg").text("Next Question in: ");
        $("#time-left").text(timer.time);

        $(".main-screen").hide();
        $(".result-screen").show();
        
        if (result === "correct") {
            $("#announcement").text("CORRECT!");
            $("#message").text(questionArr[questionNum].correctMsg);
        
        } else {
            if (result === "incorrect") {
                $("#announcement").text("INCORRECT!");
            } else {
                $("#announcement").text("TIME'S UP!");
            };
            $("#message").text(questionArr[questionNum].incorrectMsg);
        };

        display = setInterval(timer.countdown, 1000);

        questionNum++
        if (questionNum === questionArr.length) {

            timer.reset();

            impendingDoom = setTimeout(function() {
                $(".main").hide();
                $("#start").show();
                $("#start").text("Play Again!");
                questionNum = 0;
                correct = 0;
                incorrect = 0;
                score = 0;
            }, 10000);

        } else {
            impendingDoom = setTimeout(function() {
                nextQuestion(questionNum);
            }, 10000);
        };
    };

    // when an answer choice is chosen, call resultScreen with true or false depending on choice
    $(".choices").on("click", function() {

        timer.reset();
        var answer = $("span", this).text();

        if (answer === questionArr[questionNum].correctChoice) {
            score += 100;
            correct++;
            resultScreen("correct");

        } else {
            incorrect++;
            resultScreen("incorrect");
        };
    });
})