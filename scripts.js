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
var allBest = 0

function refreshVersion () {
  document.getElementById("javascriptVer").innerHTML = "JavaScript Version: 1.1.2"
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

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
  translatedType = Boolean(current) ? "heads" : "tails";
  if (current == 0) {
    outputImage.src = "https://gamr5.github.io/coin-flip/images/heads.png"
  } else if (current == 1) {
    outputImage.src = "https://gamr5.github.io/coin-flip/images/tails.jpg"
  }

  if (streak > maxStreak) {
    maxStreak = streak;
  }

  setAllBest(streak);

  result.innerHTML = `Last coin flip : ${tranlatedType}<br>Current streak: ${streak}<br>Longest session streak: ${maxStreak}<br>All time longest streak: ${allBest}<br>Odds of getting current streak: 1/${odds}`;
}
function setAllBest(cvalue) {
  allBest = getCookie("allTimeBest");
  var cookieDur = 365
  const dateSetCookie = new Date();
  if (allBest == 0 || streak > allBest) {
  dateSetCookie.setTime(dateSetCookie.getTime() + (cookieDur*24*60*60*1000));
  let expires = "expires="+ dateSetCookie.toUTCString();
  document.cookie = "allTimeBest =" + cvalue + ";" + expires + ";path=/";
  }
}
function resetAllBest(cvalue) {
  allBest = getCookie("allTimeBest");
  var cookieDur = 365
  const dateSetCookie = new Date();

  dateSetCookie.setTime(dateSetCookie.getTime() + (cookieDur*24*60*60*1000));
  let expires = "expires="+ dateSetCookie.toUTCString();
  document.cookie = "allTimeBest = 0 ;" + expires + ";path=/";

}
//multi-run
function multiRun() {
  var now1 = new Date();
  var milliseconds1 = now1.getTime();


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
var now2 = new Date();
var milliseconds2 = now2.getTime();
console.log(`Total time taken: ${milliseconds2 - milliseconds1}`)
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

}

function resetAllStreak() {
  if (confirm("Are you sure you want to reset your all-time best streak?\nTHIS CANNOT BE UNDONE")) {
    maxStreak = 0;
    result.innerHTML = `Last coin flip : ${tranlatedType}<br>Current streak: ${streak}<br>Longest streak: ${maxStreak}<br>All-time longest streak: none<br>Odds of getting current streak: 1/${odds}`;
    
    // Update the cookie value
    var cookieDur = 365;
    const dateSetCookie = new Date();
    dateSetCookie.setTime(dateSetCookie.getTime() + cookieDur * 24 * 60 * 60 * 1000);
    let expires = "expires=" + dateSetCookie.toUTCString();
    document.cookie = "allTimeBest=0; " + expires + "; path=/";
    
    document.getElementById("reset-box").innerHTML = "All-time best successfully reset!";
    document.getElementById("reset-box").classList = "green";
    const myTimeout = setTimeout(clearAll, 3000, "reset-box");
  } else {
    document.getElementById("reset-box").innerHTML = "All-time best reset canceled";
    document.getElementById("reset-box").classList = "red";
    const myTimeout = setTimeout(clearAll, 3000, "reset-box");
  }
}


function clearAll(id) {
  document.getElementById(id).classList = ""
  document.getElementById(id).innerHTML = ""
}
