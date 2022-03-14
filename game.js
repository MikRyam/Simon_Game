const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;

//Keeping track of whether if the game has started or not, so we only call nextSequence() on the first keypress.
let started = false;

//Detecting when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //The h1 title starts out saying "Press A Key to Start", when the game has started, we change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  // let userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // let currentLevel = userClickedPattern.lastIndexOf(userChosenColour)
  // checkAnswer(currentLevel);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        //your code to be executed after 1 second
      }, 1000);
    }
  } else {
    playSound("wrong");
    animateWrong();
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  setTimeout(function () {
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }, 600);
}


function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function() {
    $(`#${currentColour}`).removeClass("pressed");
  //your code to be executed after 0.1 second
}, 100);
}

function animateWrong() {
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  setTimeout(function() {
    $("body").removeClass("game-over");
  //your code to be executed after 0.2 second
  }, 200);
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
