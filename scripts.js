var current = -1; //current value of the coinflip
let states = [0, 1]; //heads is 0, tails is 1 (using numbers makes it easier to manage)
var streak = 0; //current streak
var streakType = -1; //state of streak
var result = document.getElementById("output");
var last = -1;
var tranlatedType; //translates steak type into english, instead of numbers.
var maxStreak = 0;
var onRuns = 0;
var maxRuns = 0;
var odds = 1; //odds of getting that streak
const flips = [];
var outputImage = document.getElementById("coin-img")

function run() {
  current = states[Math.floor(Math.random() * states.length)];

  if (streak > 0) {
    //if the coin has already been fliped
    if (streakType == current) {
      //if current is continuing the streak, add 1 to streak
      streak = streak + 1;
    }
    if (streakType != current) {
      streakType = current;
      streak = 0;
      odds = 1;
    } else {
      odds = odds * 2;
    }
  }

  if (streak == 0) {
    streakType = current;
    streak = streak + 1;
  }

  if (current == 0) {
    tranlatedType = "heads";
    outputImage.src = "https://gamr5.github.io/coin-flip/images/heads.png"
  } else if (current == 1) {
    tranlatedType = "tails";
    outputImage.src = "https://gamr5.github.io/coin-flip/images/tails.jpg"
  }

  if (streak > maxStreak) {
    maxStreak = streak;
  }

  result.innerHTML = `Last coin flip : ${tranlatedType}<br>Current streak: ${streak}<br>Longest streak: ${maxStreak}<br>Odds of getting this streak: 1/${odds}`;
}

//multi-run
function multiRun() {
  const flips = []
  maxRuns = document.getElementById("times").value;
  if (maxRuns == null || maxRuns == 0) {
    result.innerHTML = "error: put a number in the multi run box"
  } else {
  onRuns = 0;
  while (onRuns < maxRuns) {
    current = states[Math.floor(Math.random() * states.length)];

    if (streak > 0) {
      //if the coin has already been fliped
      if (streakType == current) {
        //if current is continuing the streak, add 1 to streak
        streak = streak + 1;
      }
      if (streakType != current) {
        streakType = current;
        streak = 0;
      }
    }

    if (streak == 0) {
      streakType = current;
      streak = streak + 1;
    }

    if (current == 0) {
      tranlatedType = "heads";
    } else if (current == 1) {
      tranlatedType = "tails";
    }

    if (streak > maxStreak) {
      maxStreak = streak;
    }
    flips.push(current);
    onRuns = onRuns + 1;
  }

  var flipsLen = flips.length;
  var flipsOn = 0;
  var flipedHeads = 0;
  var flipedTails = 0;
  while (flipsOn < flipsLen) {
    var flipsCheck = flips[flipsOn];
    if (flipsCheck == 0) {
      flipedHeads = flipedHeads + 1
    } else if (flipsCheck == 1) {
      flipedTails = flipedTails + 1
    }

    flipsOn = flipsOn + 1
  }
  if (flipedHeads > flipedTails || flipedHeads == flipedTails) {
    var flipPercentHeads = flipedHeads/flipsLen * 100
  }
  if (flipedTails > flipedHeads) {
    var flipPercentHeads = flipedTails/flipsLen * 100
  }

  var flipPercentTails = 100 - flipPercentHeads
  flipPercentHeads = Math.round(flipPercentHeads * 100) / 100
  flipPercentTails = Math.round(flipPercentTails * 100) / 100

  result.innerHTML = `Last coin flip : ${tranlatedType}<br>Current streak: ${streak}<br>Longest streak: ${maxStreak}<br>Percentage of flips that were heads: ${flipPercentHeads}%<br>Percentage of flips that were tails: ${flipPercentTails}%`;
}
}

function resetStreak() { //reseting streak
  if (confirm("Are you sure you want to reset your session best?")) {
    maxStreak = 0
      result.innerHTML = `Last coin flip : ${tranlatedType}<br>Current streak: ${streak}<br>Longest streak: none`;
    document.getElementById("reset-box").innerHTML = "Session best sucsessfully reset!"
    document.getElementById("reset-box").classList = "green"
    const myTimeout = setTimeout(clearAll, 3000, "reset-box");
  } else {
    document.getElementById("reset-box").innerHTML = "Session best reset canceled"

document.getElementById("reset-box").classList = "red"

    const myTimeout = setTimeout(clearAll, 3000, "reset-box");
  }

  function clearAll(id) {
    document.getElementById(id).classList = ""
    document.getElementById(id).innerHTML = ""
  }
}
