// Iteration 1: Declare variables required for this game
const gameBody = document.getElementById("game-body");

var seconds = document.getElementById("timer").textContent;
var zombieId = 0;
const img = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
];
// Iteration 1.2: Add shotgun sound
const expAudio = new Audio("./assets/shotgun.wav");
expAudio.volume = 0.2;
gameBody.onclick = () => {
  // expAudio.pause();
  // expAudio.currentTime = 0;//used for playing sound from the beginning
  expAudio.play();
};
// Iteration 1.3: Add background sound
const backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.play();
backgroundSound.loop = true;//it will replay automatically from the beginning when it reaches the end.

// Iteration 1.4: Add lives
//const maxlives = 4;
var lives = 4;

// Iteration 2: Write a function to make a zombie

function makeZombie() {
  randomImage = img[getRandomInt(0, img.length)];
  
  //here we are selcting random image in the array from 1 to arr.length image
  console.log(randomImage);
  gameBody.innerHTML += `<img src="./assets/${randomImage}" class="zombie-image" id="zombie${zombieId}">`;
  let zombie = document.getElementById("zombie" + zombieId);
  zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
  zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
  zombie.onclick = () => {
    zombieDestruct(zombie);
  };
 }

// Iteration 3: Write a function to check if the player missed a zombie

function checkCollision(zombie) {
  if (zombie.getBoundingClientRect().top <= 0) {//The distance from the top of the viewport to the top edge of the element.
    lives--;
    return true;
  }
  return false;
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed

function zombieDestruct(zombie) {
  zombie.style.display = "none";
  zombieId++;
  makeZombie();
}

// Iteration 5: Creating timer

var timer = setInterval(function () {
  seconds--;
  document.getElementById("timer").textContent = seconds;
  let zombie = document.getElementById("zombie" + zombieId);
  if (checkCollision(zombie) == true) {
    zombieDestruct(zombie);
    if (lives == 0) {
      clearInterval(timer);
      location.href = "./game-over.html";
    }
  }
  if (seconds == 0) {
    clearInterval(timer);
    location.href = "./win.html";
  }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie

makeZombie(zombieId);

// Iteration 7: Write the helper function to get random integer

function getRandomInt(min, max) {
  min = Math.ceil(min);//This line ensures that the min value is rounded up to the nearest integer using Math.ceil. This ensures that you don't get fractional or decimal values for min.
  max = Math.floor(max);//This line ensures that the max value is rounded down to the nearest integer using Math.floor. This ensures that you don't get a number greater than max.
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
