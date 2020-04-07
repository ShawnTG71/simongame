var buttonColours = ["red", "blue", "green", "yellow"]; // Array of colours to be chosen randomly.

var gamePattern = []; // game patern array, connected to next sequence.

var userClickedPattern = []; // user array connected to the click function and userChosenColour.

var started = false; // Default start state.

var level = 0; // Default start level.

$(document).keypress(function() { // Connected to start game and calls nextSequence.
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() { // Controls and populates userClickedPattern with userChosenColour.
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) { // Compares the gamePattern array and the userClickedPattern array based on set conditions.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // Note in the if conditional, you can compare array indexes
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else { // If patterns don't match, then the conditon is executed.
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() { // This is the main control cog of the levels, poplates gamePattern array, resets userClickedPattern.

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name) { // plays the sounds in the sound file respective to the file name which corresponds to colour array.

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) { // Animates the buttons when pressed.
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() { // Resets the game.
  level = 0;
  gamePattern = [];
  started = false;
}
