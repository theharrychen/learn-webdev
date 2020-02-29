var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () { // Used for starting the game
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$("#level-title").click(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else { //User got the sequence wrong, game over
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("GAMEOVER! PRESS any KEY or this TEXT to RESTART!");

        startOver();
    }
}

function nextSequence() { //Adds random color to the game pattern and plays sound
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); // 0 - 3
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSequence();

}

async function playSequence() {
    await sleep(500);
    for (var x = 0; x < gamePattern.length; x++) {
        soundAndAnimate(gamePattern[x]);
        await sleep(500);
    }
}

function sleep(ms) { // Synchronous Delay
    return new Promise(resolve => setTimeout(resolve, ms));
}

function soundAndAnimate(color) {
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100); //Flashes a button
    playSound(color);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100); //100ms delay
}

function startOver() { //Resets game variables
    level = 0;
    gamePattern = [];
    started = false;
}