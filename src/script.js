class Bird {
    constructor() {
        
        this.bird = document.getElementById("bird");
        this.jumping = false;
    }

    get top() {
        return parseInt(getComputedStyle(this.bird).top);
    }

    gravity() {
        this.bird.style.top = this.top + 3 + "px";
    }

    jump() {
    let jumpCount = 0;

    const interval = setInterval(() => {
        if (this.top > 6 && jumpCount < 15) {
            this.bird.style.top = this.top - 8 + "px";
        }

        if (jumpCount > 20) {
            clearInterval(interval);
        }

        jumpCount++;
    }, 10);
}


    reset() {
        this.bird.style.top = "100px";
    }
}


class Pipe {
    constructor() {
        
        this.pipe = document.getElementById("pipe");
        this.hole = document.getElementById("hole");
    }

    get left() {
        return parseInt(getComputedStyle(this.pipe).left);
    }

    get holeTop() {
        return parseInt(getComputedStyle(this.hole).top);
    }

    randomizeHole() {
        const random = -((Math.random() * 400) + 150);
        this.hole.style.top = random + "px";
    }
}


const bird = new Bird();
const pipe = new Pipe();

let counter = 0;
let highscores = [];
let gameStarted = false;


document.getElementById("hole").addEventListener("animationiteration", () => {
    pipe.randomizeHole();
    counter++;
    document.getElementById("score").textContent = "Score: " + (counter - 1);
});


document.getElementById("startScreen").addEventListener("click", () => {
    if (gameStarted) return;

    gameStarted = true;
    document.getElementById("startScreen").style.display = "none";

    setInterval(() => {
        bird.gravity();

        const bTop = -(600 - bird.top);

        if (
            bird.top > 560 ||
            (
                pipe.left < 60 &&
                pipe.left > -90 &&
                (bTop < pipe.holeTop || bTop + 38 > pipe.holeTop + 200)
            )
        ) {
            highscores.push(counter - 1);
            highscores.sort((a, b) => b - a);
            if (highscores.length > 5) highscores.pop();

            updateHighscores();
            alert("Game over. Score: " + (counter - 1));

            bird.reset();
            counter = 0;
            document.getElementById("score").textContent = "Score: 0";
        }
    }, 10);
});


document.addEventListener("click", () => bird.jump());
document.addEventListener("keydown", () => bird.jump());


function updateHighscores() {
    const list = document.getElementById("highscoresList");
    list.innerHTML = "";

    highscores.forEach(score => {
        const li = document.createElement("li");
        li.textContent = score;
        list.appendChild(li);
    });
}
