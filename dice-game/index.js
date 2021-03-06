function diceRoll() { //Simulates a 6-sided dice roll
    return Math.floor(Math.random() * 6) + 1;
}

let randomNumber1 = diceRoll(); //Number from 1 to 6
let diceImage = "images/dice" + randomNumber1 + ".png" //dice1.png to dice6.png
document.querySelector(".img1").setAttribute("src", diceImage);

let randomNumber2 = diceRoll();
diceImage = "images/dice" + randomNumber2 + ".png"
document.querySelector(".img2").setAttribute("src", diceImage);

let h1 = document.querySelector("h1");
if (randomNumber1 > randomNumber2) {
    h1.innerHTML = "🚩Player 1 Wins!";
} else if (randomNumber1 < randomNumber2) {
    h1.innerHTML = "Player 2 Wins!🚩";
} else { //randomNumber1 == randomNumber2
    h1.innerHTML = "Draw!";
}

//Adding clickable reroll through reloading the page
let rerollText = document.querySelector(".reroll");
rerollText.addEventListener("click", function () {
     location.reload();
});