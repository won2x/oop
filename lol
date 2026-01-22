class Bird{
    constructor()
    {
        this.bird=document.getElementById("bird");
        this.jumping=false;
    }

    get top(){
        return parseInt(getComputedStyle(this.bird).top);
    }
    gravity(){
        this.bird.style.top=this.top+3+"px";
    }
    jump(){
        if(this.jumping=true)
            return null;
        this.jumping=true;
        let jumpCount = 0;
        const jumpInterval = setInterval(()=>{
        if(this.top>6&&jumpCount<15){
            this.bird.style.top = (this.top-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
            }
        jumpCount++;
        },10);
    }   
    reset(){
        this.bird.style.top = 100 + "px";
        }
    }


class Pipe{
    constructor(){
        this.pipe=document.getElementById("pipe");
        this.hole=document.getElementById("hole");
    }
    get holeTop(){
        return parseInt(getComputedStyle(this.hole).top);
    }

    get pipeLeft(){
        return parseInt(getComputedStyle(this.hole).left);
    }


    randomHole(){
        const randomHoleTop=-((Math.random()*500)+150);
        this.hole.style.top = randomHoleTop + "px";
    }
}




const pipe=new Pipe;
const bird=new Bird;

let counter=0;
let highscores = [];
let gameStarted = false;


document.getElementById("hole").addEventListener('animationiteration',()=>{
    pipe.randomHole();
    counter++;

document.getElementById("score").textContent="Score = "+ (counter-1);
});

    document.getElementById("startScreen").style.display = "none";

    setInterval(()=>{
    bird.fall;
    
    const bTop = -(600-characterTop);
    if((bird.top>560)||((pipe.left<60)&&(pipe.left>-90)&&((bTop<pipe.holeTop)||(cTop+38>pipe.holeTop+200)))){
        highscores.push(counter-1);
        highscores.sort((a,b)=>b-a);
        if(highscores.length > 5) 
            highscores.pop();
        updateHighscores();
        alert("Game over. Score: "+(counter-1));
        
        bird.reset;
        counter=0;
    }
},10);

document.addEventListener("click",()=>bird.jump());
document.addEventListener("keydown",()=>bird.jump());


function updateHighscores(){
    const list = document.getElementById("highscoresList");
    list.innerHTML = "";
    highscores.forEach(score => {
        const li = document.createElement("li");
        li.textContent = score;
        list.appendChild(li);
    });
}
