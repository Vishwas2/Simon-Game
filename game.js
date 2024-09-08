// empty array to store the random number selected by the computer
gamePattern = [];

// array of all possible colours
buttonColours = ["red","blue","green","yellow"];

// empty array to store which colour is clicked by the user
userClickedPattern = [];

var num = 0;
var level = 0;
function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor((Math.random())*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // using jQuery to select the button with the same id as randomChosenColour
    var selectedColourId = "#" + randomChosenColour;
    // adding the flashing animation to the randomly selected button
    $(selectedColourId).fadeIn(100).fadeOut(100).fadeIn(100);
    // playing the audio for the randomly selected button
    playAudio(randomChosenColour);
    level++;
 $("h1").text("Level " + level);

}

// using jquery to detect if any of the buttons are clicked by the user
    $(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        playAudio(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    });

function playAudio(colour){
        var audio = new Audio("sounds/"+colour+".mp3");
        audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

$("body").keydown(function(){
    num +=1;
    if(num == 1){
        nextSequence();
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playAudio("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key To Restart.");
        startOver();
    }
}

// creating a function that will be called if the user gets the answer wrong
function startOver(){
    level = 0;
    gamePattern = [];
    num = 0;
    $("body").keydown(function(){
        num +=1;
        if(num == 1){
            nextSequence();
        }
    });
}