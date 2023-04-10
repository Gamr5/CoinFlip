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
      odds = odds * 2
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

  result.innerHTML = `Last coin flip : ${tranlatedType}<br>Current streak: ${streak}<br>Longest streak: ${maxStreak}<br>Odds of getting this streak: 1/${odds}`;
}

//multi-run
function multiRun() {
  maxRuns = document.getElementById("times").value;
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



    result.innerHTML = `Last coin flip : ${tranlatedType}<br>Current streak: ${streak}<br>Longest streak: ${maxStreak}`;
    onRuns = onRuns + 1;
  }
}
