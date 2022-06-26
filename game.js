var gameStarted = false;
let level = 0;

var buttonColors = [
    "red",
    "blue",
    "green",
    "yellow"
];

var gamePattern = [];
var userClickedPattern = [];


$(document).keydown(function()
{
    if(gameStarted === false)
    {
        gameStarted = true;
        $("#level-title").text("Level "+level);
        setTimeout(() => {
            nextSequence();
        }, 250);
    }
});


function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        // console.log("success");
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game over. Press any key to restart.");
        startOver();
    }
}

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

$(".btn").click(function()
{ 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function playSound(arg)
{
    let s = new Audio("sounds/"+arg+".mp3");
    s.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}


function startOver()
{
    level = 0;
    gamePattern = [];
    gameStarted = false;
}