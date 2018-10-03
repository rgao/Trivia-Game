$(document).ready(function() {

    document.getElementById("bg-audio").play();
    
    // hide main content and show only start button
    $(".main").hide();
    $(".final-screen").hide();
    $("#final").hide();

    var questionNum = 0;
    var correct = 0;
    var incorrect = 0;
    var score = 0;

    // variables for storing setTimeout and setInterval
    var display;
    var impendingDoom;

    // timer object
    var timer = {

        time: 45,
        
        reset: function() {
            clearTimeout(impendingDoom);
            clearInterval(display);
            timer.time = 45;
        },

        countdown: function() {
            timer.time--;
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
        choice5: "Random sub-brown dwarf floating in interstellar space",
        correctChoice: "Pluto",
        correctMsg: "Pluto was demoted to dwarf planet status in 2006 when planets were formally defined as including the requirement of having achieved gravitational independence within its orbit.",
        incorrectMsg: "The correct choice is 'Pluto.' Silly you, Pluto is not a planet! Pluto was demoted to dwarf planet status in 2006 when planets were formally defined as including the requirement of having achieved gravitational independence within its orbit.",
        reward: 9,
        bg: "science.jpg",
    };

    var q2 = {

        number: 2,
        questionStr: "The cosmic microwave background (CMB) and its homogeneity and isotropy are strong evidence for which of the following?",
        choice1: "Dark Matter",
        choice2: "Quantum Chromodynamics",
        choice3: "The Big Bang",
        choice4: "The eventual cosmic 'Crunch'",
        choice5: "Supermassive black holes",
        correctChoice: "The Big Bang",
        correctMsg: "The rapid expansion of the universe --of spacetime itself-- at the onset of the Big Bang left a lingering radiation and some uncanny similarity in every direction of the universe.",
        incorrectMsg: "The correct choice is 'The Big Bang.' The CMB can be explained by an event that suddenly caused rapid universal expansion. The uniformity of the CMB, and objects in general, in every direction, including at opposite ends of the universe, imply causality at one point.",
        reward: 33,
        bg: "science.jpg",
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
        incorrectMsg: "The correct choice is 'Gravity.' Gravity is the elephant in the room when it comes to fundamental physics. Electromagnetic, Strong, and Weak forces are being understood through quantum mechanics, whereas gravity is understood through relativity.",    
        reward: 27,
        bg: "science.jpg",
    };

    var q4 = {

        number: 4,
        questionStr: "What is the idea of the ketosis diet?",
        choice1: "Limit the amount of fat that your body processes",
        choice2: "Convert fat into carbs",
        choice3: "Fat, instead of carbs, is metabolized for energy",
        choice4: "Convert carbs into fat",
        choice5: "Metabolize carbs into energy faster",
        correctChoice: "Fat, instead of carbs, is metabolized for energy",
        correctMsg: "Maintaining ketosis is actually a pretty healthy diet practice. Recent research shows that excessive amounts of carbs lead to many health complications whereas fat is not at all unhealthy, like previously thought.",
        incorrectMsg: "The correct choice is 'Fat, instead of carbs, is metabolized for energy.' Ketosis is the process of converting fat into energy; a keto diet consists of high-fat and low-carb foods. By consuming very little amount of carbs, the body seeks fat as a source of energy. This is very effective at losing fat.",    
        reward: 39,
        bg: "nutrition.jpg",
    };

    var q5 = {
        number: 5,
        questionStr: "What is the strength of gravity compared to electromagnetism?",
        choice1: "Gravity is about 10 times stronger",
        choice2: "Gravity is about 10^8 times stronger",
        choice3: "Electromagnetic force is about 10 times stronger",
        choice4: "Electromagnetic force is about 10^33 times stronger",
        choice5: "They're about the same in strength",
        correctChoice: "Electromagnetic force is about 10^33 times stronger",
        correctMsg: "Imagine a small piece of metal and a piece of magnet. The magnet exerts a stronger force on the metal compared to the entirety of Earth!",
        incorrectMsg: "The correct choice is 'Electromagnetic force is about 10^33 times stronger.' Gravity is by far the weakest of the fundamental forces. We are not crushed by Earth's gravity whereas we would die instantly from a stream of loose electricity.",
        reward: 940,
        bg: "science.jpg",
    };

    var q6 = {

        number: 6,
        questionStr: "Standard fox and gray squirrels employ which of the following tactics to attempt to protect their food?",
        choice1: "Store food deep underground",
        choice2: "Hide them in their cheeks",
        choice3: "Stack nuts in their drey",
        choice4: "Keep poisonous nuts to deter thieves",
        choice5: "Pretend to bury nuts",
        correctChoice: "Pretend to bury nuts",
        correctMsg: "Yup; they pretend to bury nuts to trick observers into thinking there's food but there really isn't. They will then actually bury the nut elsewhere.",
        incorrectMsg: "The correct choice is 'Pretend to bury nuts.' Squirrels are deceptive little beasts; they frequently pretend to be burying nuts to fool observers into searching for nonexistent food.",    
        reward: 5515,
        bg: "forest3.jpg",
    };

    var q7 = {

        number: 7,
        questionStr: "Which of the following best describes the theorized interior of Jupiter and Saturn?",
        choice1: "Gas all the way through",
        choice2: "Primarily gas with a small solid core with a surface",
        choice3: "Star-like with deuterium fusion at the core",
        choice4: "Primarily gas with a molten metallic hydrogen core",
        choice5: "Primarily gas with a plasma iron core",
        correctChoice: "Primarily gas with a molten metallic hydrogen core",
        correctMsg: "Immense pressure exists within the interior of gas giants; the unique pressure and temperature combinations give rise to rare materials; liquid metallic hydrogen may be mixing with a small rocky core.",
        incorrectMsg: "The correct choice is 'Primarily gas with a molten metallic hydrogen core.' Hydrogen changes state at such unique temperatures and pressure, giving rise to a liquid metallic form, possibly mixing with a small rocky core.",    
        reward: 64718,
        bg: "science.jpg",
    };

    var q8 = {

        number: 8,
        questionStr: "Electron degeneracy pressure is the primary support in hydrostatic equilibrium for which of the following astronomical objects?",
        choice1: "Average main sequence stars, such as the Sun",
        choice2: "Red Supergiant",
        choice3: "White Dwarf",
        choice4: "Pulsars",
        choice5: "Active Galactic Nuclei",
        correctChoice: "White Dwarf",
        correctMsg: "The ultimate fate of our Sun is to become a white dwarf after its red giant phase ends in a nova explosion. White dwarves are forever condemned to a dark, cold end as it does not produce nuclear fusion.",
        incorrectMsg: "The correct choice is 'White Dwarf.' Average main sequence stars such as our Sun is primarily supported by gas and radiation pressure. White dwarves are much smaller and denser, relying on electron degeneracy to counteract against its inward gravity.",    
        reward: 258716,
        bg: "science.jpg",
    };

    var q9 = {

        number: 9,
        questionStr: "Jupiter is significant to the Sun in which of the following ways?",
        choice1: "It exerts a noticeable tidal force onto the Sun",
        choice2: "It is primarily responsible for causing the Solar System center of mass to lie outside of the Sun",
        choice3: "It accretes solar discharges into its ring system",
        choice4: "It will eventually be consumed by the Sun, causing the Sun to inflate further into a Red Hypergiant",
        choice5: "Its formation derailed the Sun from initializing as an O-type main sequence star",
        correctChoice: "It is primarily responsible for causing the Solar System center of mass to lie outside of the Sun",
        correctMsg: "Technically, we live in a 2-body system consisting of Jupiter and the Sun because the Sun orbits a point of space outside of itself!",
        incorrectMsg: "The correct choice is 'It is primarily responsible for causing the Solar System center of mass to lie outside the Sun.' Jupiter's mass is more than 2.5 times that of all other planets combined, and is large enough to significantly affect the center of mass.",    
        reward: 38412097,
        bg: "science.jpg",
    };

    var q10 = {

        number: 10,
        questionStr: "Why is dark matter known as such?",
        choice1: "It is dark in color",
        choice2: "It doesn't interact with electromagnetic force",
        choice3: "They're gravitons",
        choice4: "They produce only gamma and cosmic radiation",
        choice5: "It sounds cool and mysterious",
        correctChoice: "It doesn't interact with electromagnetic force",
        correctMsg: "WIMPs (Weakly Interacting Massive Particles) are among the forefront of candidates for dark matter. Dark matter is pretty dense, but unfortunately they evade nearly all electromagnetic detection.",
        incorrectMsg: "The correct choice is 'It doesn't interact with electromagnetic force.' Dark matter is dark because they do not interact, or interact insignificantly, with the electromagnetic force. We and our instruments rely on electromagnetic detection (including light) to receive any form of information.",
        reward: 935972586,
        bg: "science.jpg",
    };

    var q11 = {

        number: 11,
        questionStr: "Dark Energy is best described as:",
        choice1: "Energy emitted by dark matter",
        choice2: "Gravitational energy",
        choice3: "Mass-energy of relativistic particles",
        choice4: "Energy permeating throughout space, hypothesized to initiate the Big Bang",
        choice5: "Energy permeating throughout space, hypothesized to accelerate universal expansion",
        correctChoice: "Energy permeating throughout space, hypothesized to accelerate universal expansion",
        correctMsg: "Dark Energy makes up nearly 70% of the universe, with the remaining ~30% belonging to the mass-energy of dark and ordinary matter.",
        incorrectMsg: "The correct answer is 'Energy permeating throughout space, hypothesized to accelerate universal expansion.' We do not know the nature of dark energy; it is the term we ascribe to the energy gradient that causes the accelerated expansion of the universe.",
        reward: 49586014536,
        bg: "science.jpg",
    };        
    
    var q12 = {

        number: 12,
        questionStr: "Of the following nuts, which is most likely to be buried (as opposed to eaten immediately) by a friendly fox squirrel?",
        choice1: "Almond",
        choice2: "Brazil Nut",
        choice3: "Cashew",
        choice4: "Peanut",
        choice5: "Ripe Acorn",
        correctChoice: "Almond",
        correctMsg: "Squirrels bury nuts to save them for later. For some reason, they tend to bury almonds even if they're not full, presumably because either almonds resemble raw nuts or have high nutritional value for winter.",
        incorrectMsg: "The correct choice is 'Almond.' Peanuts, cashews, and brazil nuts are all loved by squirrels. Raw acorns will be buried, but ripe ones tend to be eaten. For some reason, squirrels sometimes bury almonds even if they're not full.",
        reward: 1443982549692,
        bg: "forest3.jpg",
    };

    var q13 = {

        number: 13,
        questionStr: "Which of the following phrases is grammatically incorrect?",
        choice1: "'It's just that that person likes selling seashells by the seashore.",
        choice2: "'The reason is because Shelton likes selling seashells by the seashore.'",
        choice3: "'This is literally the easiest selling of seashells by the seashore ever.'",
        choice4: "'Shelton has been selling seashells by the seething seashore.'",
        choice5: "'This is a better idea than his selling seashells by the seashore.'",
        correctChoice: "'The reason is because Shelton likes selling seashells by the seashore.'",
        correctMsg: "Thank you for not saying and perpetuating this morbidly insulting phrase.",
        incorrectMsg: "The correct choice is 'The reason is because Shelton likes selling seashells by the seashore.' Reason' acts as a noun; a noun can't 'because.' Say 'the reason is that' instead!",
        reward: 1,
        bg: "nutrition.jpg",
    };

    var questionArr = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13];

    // when start button clicked, hide start button and starts with 1st question
    $("#start").on("click", function() {

        $("#btn-container").hide();
        $("#start-img").hide();
        $("#start-msg").hide();
        $(".final-screen").hide();
        $(".main").show();
        $("#time-container").show();
        $("#q-container").show()
        nextQuestion(questionNum);
    });

    // displays next question content onto html
    var nextQuestion = function(questionNum) {

        $("body").css("background-image", "url('assets/images/" + questionArr[questionNum].bg + "')");
        console.log("url('../images/" + questionArr[questionNum].bg + "')")
        $("body").css("background-size", "cover");

        $(".main-screen").show();
        $(".result-screen").hide();

        timer.reset();
        timer.time = timer.time + 5 * questionNum;
        $("#time-left-msg").text("Time Remaining: ");
        $("#time-left").text(timer.time);

        $("#question-num").text(questionArr[questionNum].number);
        $("#question").text(questionArr[questionNum].questionStr);
        $("#choice1").html(questionArr[questionNum].choice1);
        $("#choice2").html(questionArr[questionNum].choice2);
        $("#choice3").html(questionArr[questionNum].choice3);
        $("#choice4").html(questionArr[questionNum].choice4);
        $("#choice5").html(questionArr[questionNum].choice5);

        impendingDoom = setTimeout(resultScreen, timer.time * 1000, "timeup");
        display = setInterval(timer.countdown, 1000);
    };

    // screen for showing correct/incorrect answer
    var resultScreen = function(result) {

        timer.reset();
        timer.time = 999;
        $("#time-left").text(timer.time);
        display = setInterval(timer.countdown, 1000);

        $(".main-screen").hide();
        $(".result-screen").show();
        $("#btn-container").show()
        
        if (result === "correct") {
            document.getElementById("winning").play();
            score += questionArr[questionNum].reward;
            correct++;
            $("#announcement").css("color", "green");
            $("#announcement").css("background", "radial-gradient(green, white");
            $("#announcement").text("CORRECT!");
            $("#message").text(questionArr[questionNum].correctMsg);
            $("#message").css("color", "green")

        } else {
            document.getElementById("elephant").play();
            $("#announcement").css("color", "red");
            $("#announcement").css("background", "radial-gradient(orangered, white");
            incorrect++;
            if (result === "incorrect") {
                $("#announcement").text("INCORRECT!");
            } else {
                $("#announcement").text("TIME'S UP!");
            };
            $("#message").text(questionArr[questionNum].incorrectMsg);
            $("#message").css("color", "orangered")
        };

        // increment question number
        questionNum++

        // when all questions are asked
        if (questionNum === questionArr.length) {

            $("#start").hide();
            $("#final").show();
            $("#time-left-msg").text("Final Result in: ");

            if (correct === questionArr.length) {
                $("#score").text("$ 1 Vigintillion");
            } else {
                $("#score").text("Reward: $"+score);
            };

            impendingDoom = setTimeout(function() {
                $(".result-screen").hide();
                $("#time-container").hide();
                $("#q-container").hide();

                $(".final-screen").show();
                $("#correct").text("You answered " + correct + " questions correctly.");
                $("#incorrect").text("You answered " + incorrect + " questions incorrectly.");

                $("#final").hide();
                $("#start").show();
                $("#start").text("Play Again!");

                if (correct === questionArr.length) {
                    score = "1 Vigintillion";
                    $("#final-score").text("You answered all the questions correctly! Congratulations, you're a Vigintillionaire ($10^63)!");
                } else {
                    $("#final-score").text("Your final reward is $" + score + ". You did not get all questions correct, so you are not a Vigintillionaire.");
                };
                    
                questionNum = 0;
                correct = 0;
                incorrect = 0;
                $("#score").text("$0");
                score = 0;
            }, 999000);

        } else {
            
            $("#time-left-msg").text("Next Question in: ");
            $("#score").text("Reward: $"+score);

            impendingDoom = setTimeout(function() {
                nextQuestion(questionNum);
            }, 999000);
            $("#start").text("Next Question");
        };
    };

    // when an answer choice is chosen, call resultScreen with true or false depending on choice
    $(".choices").on("click", function() {

        timer.reset();
        var answer = $("span", this).text();

        if (answer === questionArr[questionNum].correctChoice) {
            resultScreen("correct");

        } else {
            resultScreen("incorrect");
        };
    });

    // displays final result screen when final result button is clicked
    $("#final").on("click", function() {

        $(".result-screen").hide();
        $("#time-container").hide();
        $("#q-container").hide();

        $(".final-screen").show();
        $("#correct").text("You answered " + correct + " questions correctly.");
        $("#incorrect").text("You answered " + incorrect + " questions incorrectly.");

        $("#final").hide();
        $("#start").show();
        $("#start").text("Play Again!");

        if (correct === questionArr.length) {
            document.getElementById("winning").play();
            score = "1 Vigintillion";
            $("#final-score").text("You answered all the questions correctly! Congratulations, you're a Vigintillionaire ($10^63)!");
        } else {
            document.getElementById("dying").play();
            $("#final-score").text("Your final reward is $" + score + ". You did not get all questions correct, so you are not a Vigintillionaire.");
        };

        questionNum = 0;
        correct = 0;
        incorrect = 0;
        $("#score").text(score);
        score = 0;
    });
})