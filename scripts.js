var current = -1; //current value of the coinflip
let states = [0, 1]; //heads is 0, tails is 1 (using numbers makes it easier to manage)
var streak = 0 //current streak
var streakType = -1 //state of streak
var result = document.getElementById("output")
var last = -1
var tranlatedType //translates steak type into english, instead of numbers.
var streakEnded = Boolean

function run() {

current = states[Math.floor(Math.random() * states.length)];

if (streak == 0) {
streakType = current
streak = streakType + 1
}



if (streak > 0) { //if the coin has already been fliped
    if (streakType == current) { //if current is continuing the streak, add 1 to streak
        streak = streak  + 1
        streakEnded = false
    }
    if (streakType != current) {
        streakType = -1
        streak = 0
        streakEnded = true
    }
}

if (current == 0) {
    tranlatedType = "heads"
} else if (current == 1) {
    tranlatedType = "tails"
}

result.innerHTML = `Last coin flip : ${tranlatedType}<br>Current streak: ${streak}<br>Streak ended: ${streakEnded}<br>`
}
