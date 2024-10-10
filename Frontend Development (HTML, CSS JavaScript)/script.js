const bird = document.getElementById('bird');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const retryButton = document.getElementById('retry-button');
const instructions = document.getElementById('instructions');
const startButton = document.getElementById('start-btn');

const flapSound = document.getElementById('flap-sound');
const dieSound = document.getElementById('die-sound');
const hitSound = document.getElementById('hit-sound');
const pointSound = document.getElementById('point-sound');
const swooshSound = document.getElementById('swoosh-sound');

let birdTop = 250;
let birdLeft = 50;
let gravity = 1.5;
let gameSpeed = 2;
let isGameOver = false;
let score = 0;
let pipePassed = false;

const pipes = document.querySelectorAll('.pipe');

// Initialize the game
function initializeGame() {
    console.log("Game Initialized");
    instructions.style.display = "none";
    swooshSound.play();
    isGameOver = false;
    birdTop = 250;
    score = 0;
    scoreDisplay.innerText = `Score: ${score}`;
    pipePassed = false;
    pipes.forEach(pipe => {
        pipe.style.left = `${Math.random() * 500 + 800}px`;
        pipe.style.display = "block";
    });

    requestAnimationFrame(gameLoop);
}

// Jump the bird
function jump() {
    if (!isGameOver) {
        birdTop -= 50;
        flapSound.play();
    }
}

// Reset game
function resetGame() {
    gameOverScreen.style.display = "none";
    initializeGame();
}

// Apply the gravity
function applyGravity() {
    if (!isGameOver) {
        birdTop += gravity;
        bird.style.top = birdTop + "px";
    }
}

// Move the obstacles/pipes
function movePipes() {
    pipes.forEach(pipe => {
        let pipeLeft = parseInt(pipe.style.left);
        if (pipeLeft > -60) {
            pipe.style.left = (pipeLeft - gameSpeed) + "px";
        } else {
            pipe.style.left = `${Math.random() * 500 + 800}px`;
            pipePassed = false;
        }
    });
}

// Detect the collision
function detectCollision() {
    pipes.forEach(pipe => {
        let pipeLeft = parseInt(pipe.style.left);
        if (
            birdLeft + 40 > pipeLeft &&
            birdLeft < pipeLeft + 60 &&
            birdTop + 40 > parseInt(pipe.style.top) &&
            birdTop < parseInt(pipe.style.top) + parseInt(pipe.style.height)
        ) {
            gameOver();
        }
    });
    if (birdTop <= 0 || birdTop >= 560) {
        gameOver();
    }
}

// Game over
function gameOver() {
    isGameOver = true;
    gameOverScreen.style.display = "block";
    dieSound.play();
}

// Game loop
function gameLoop() {
    if (isGameOver) {
        return;
    }

    applyGravity(); 
    detectCollision(); 
    movePipes(); 

    pipes.forEach(pipe => {
        let pipeLeft = parseInt(pipe.style.left);
        if (!pipePassed && pipeLeft + 60 < birdLeft) {
            score++;
            pointSound.play();
            scoreDisplay.innerText = `Score: ${score}`;
            pipePassed = true;
        }
    });

    requestAnimationFrame(gameLoop);
}

//Event listeners
document.addEventListener("keydown", jump);
retryButton.addEventListener("click", resetGame);
startButton.addEventListener("click", initializeGame);