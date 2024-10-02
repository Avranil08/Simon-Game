var buttonColours = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];
var FirstKeyPress = 0;
var level = 0;

$(document).on('keypress', function () {
  if (FirstKeyPress === 0) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    FirstKeyPress = 1;
  }
});

$('.btn').on('click', function () {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('wrong');
    var audio = new Audio('./sounds/wrong.mp3');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $('#' + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio('./sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $('.' + currentColour).addClass('pressed');
  setTimeout(function () {
    $('.' + currentColour).removeClass('pressed');
  }, 100);
}
function startOver() {
  gamePattern = [];
  FirstKeyPress = 0;
  level = 0;
}
