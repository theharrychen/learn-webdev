let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let started = false;
let score = 0;
let highScore;

document.addEventListener("DOMContentLoaded", function() { 
    highScore = localStorage.getItem("highScore") ? localStorage.getItem("highScore") : 0;
    if (highScore) {
        $("#high-score").text("High Score:" + highScore);
    }
});

$("#score-title").click(function () { // Used for starting the game
    if (!started) {
        $("#score-title").text("Score:" + score);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentScore) {
    if (userClickedPattern[currentScore] === gamePattern[currentScore]) {
        if (userClickedPattern.length === gamePattern.length) {
            score++;
            setTimeout(nextSequence, 1000);
        }
    } else { //User got the sequence wrong, game over
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#score-title").html("GAMEOVER!</br>Click here to RESTART!");

        startOver();
    }
}

function nextSequence() { //Adds random color to the game pattern and plays sound
    userClickedPattern = [];
    $("#score-title").text("Score:" + score);

    let randomNumber = Math.floor(Math.random() * 4); // 0 - 3
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSequence();

}

async function playSequence() {
    await sleep(500);
    for (let x = 0; x < gamePattern.length; x++) {
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
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100); //100ms delay
}

function startOver() { //Resets game letiables
    if (score > highScore) {
        highScore = score;
        $("#high-score").text("High Score:" + highScore);
        localStorage.setItem('highScore', highScore);
    }
    score = 0;
    gamePattern = [];
    started = false;
}