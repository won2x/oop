var block=document.getElementById("block");
var hole=document.getElementById("hole");
var character=document.getElementById("character");
var jumping=0;
var counter=0;
var highscores = [];
var gameInterval = null;
var gameStarted = false;


hole.addEventListener('animationiteration',()=>{
    var random=-((Math.random()*500)+150);
    hole.style.top= random+"px";
    counter++;
});

function startGame(){
    if(gameStarted) 
        return;

    gameStarted = true;
    document.getElementById("startScreen").style.display = "none";

    gameInterval =setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping==0){
        character.style.top = (characterTop+3)+"px";
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(600-characterTop);
    if((characterTop>560)||((blockLeft<60)&&(blockLeft>-90)&&((cTop<holeTop)||(cTop+38>holeTop+200)))){
        highscores.push(counter-1);
        highscores.sort((a,b)=>b-a);
        if(highscores.length > 5) 
            highscores.pop();
        updateHighscores();
        alert("Game over. Score: "+(counter-1));
        
        character.style.top = 100 + "px";
        counter=0;
    }
},10);
}



function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){
            character.style.top = (characterTop-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}

function updateHighscores(){
    var list = document.getElementById("highscoresList");
    list.innerHTML = "";
    highscores.forEach(score => {
        var li = document.createElement("li");
        li.textContent = score;
        list.appendChild(li);
    });
}