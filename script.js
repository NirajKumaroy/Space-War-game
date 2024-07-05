const player = document.getElementById("player");
const game = document.getElementById("game");
const alien = document.getElementById("alien");

// result section
let result = document.getElementById("result");
const score = document.getElementById("score");
let counter = 0;

//sound
const shoot = document.getElementById("shoot");
const gameOverSound = document.getElementById('gameover');

// fighter jet movement
window.addEventListener("keydown", function(e){
    if(e.keyCode == "39") {
        let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        if (playerLeft < 260) {
            player.style.left = (playerLeft + 130) + "px";
        }
    }

    if(e.keyCode == "37") {
        let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        if (playerLeft > 0) {
            player.style.left = (playerLeft - 130) + "px";
        }
    }
})

//fire bullet
window.addEventListener("keydown", function(e) {
    if (e.keyCode == "32") {
        let canon = document.createElement("div");
        let img = document.createElement("img");
        img.src = "./game/fire.png";
        img.classList.add("bulletImg");
        canon.classList.add("bullet");
        canon.style.left = player.style.left;
        canon.appendChild(img);
        game.appendChild(canon);
        shoot.play();

     //when bullet hit alien
     setInterval(function collision() {
        let canonLeft = parseInt(window.getComputedStyle(canon).getPropertyValue("left"));
        let canonTop = parseInt(window.getComputedStyle(canon).getPropertyValue("top"));
        let alienLeft = parseInt(window.getComputedStyle(alien).getPropertyValue("left"));
        let alienTop = parseInt(window.getComputedStyle(alien).getPropertyValue("top"));

        if (((canonTop - alienTop) < 100) && (alienTop < canonTop) && (alienLeft === canonLeft)) {
            canon.style.display = 'none';
            alien.style.display = 'none';
        }

    }, 10);
    setTimeout(function(){canon.remove()},1000);
    }
});

//alien move

function alienMove() {
    alien.style.display = 'block';
    let random = ((Math.floor(Math.random() * 3)) * 130);
    alien.style.left = random + "px";
    alien.classList.add("alienMove");
    counter++;
    if (counter > 20) {
        alien.style.animationDirection = '0.9s';
    }
}

setInterval(alienMove, 1000);

//game over

function gameOver() {
    let alienTop = parseInt(window.getComputedStyle(alien).getPropertyValue("top"));
    if (alienTop > 400) {
        result.style.display = 'block';
        game.style.display = 'none';
        score.innerHTML =`score: ${counter}`;
        counter = 0;
        gameOverSound.play();
    }
}
setInterval(gameOver, 10);

