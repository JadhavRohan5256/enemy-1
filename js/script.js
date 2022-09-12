/** @type {HTMLCanvasElement} */

const CANVAS = document.querySelector('#canvas');
const CTX = CANVAS.getContext('2d');
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
CANVAS.width = CANVAS_WIDTH;
CANVAS.height = CANVAS_HEIGHT;
let timer;
let enemyCount = 100;
let allEnemy = [];

CANVAS.addEventListener('click', () => {
    enemyCount = prompt("Enter enemy you want to display!");
    allEnemy = [];
    enemyCreation();
})

class Enemy {
    constructor() {
        this.enemySpeed = Math.random() * 4 - 2;
        this.image = new Image();
        this.image.src = '../img/enemy1.png';
        this.spriteWidth = 1758 / 6;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 3;
        this.height = this.spriteHeight / 3;
        this.x = Math.floor(Math.random() * (CANVAS_WIDTH - this.width));
        this.y = Math.floor(Math.random() * (CANVAS_HEIGHT - this.height));
        this.frameX = 0;
        this.enemyAnimationSpeed = Math.floor(Math.random() * 3 + 2);
    }

    update(enemy) {
        this.x +=  Math.random() * 5 - 2.5;
        this.y +=  Math.random() * 5 - 2.5;
        if(timer % this.enemyAnimationSpeed === 0) {
            (this.frameX > 4)? this.frameX = 0 : this.frameX++;
        }
    }
    draw() {
        CTX.drawImage(this.image, (this.frameX * this.spriteWidth), 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

function enemyCreation() {
    for(let i = 0; i < enemyCount; ++i) {
        allEnemy.push(new Enemy());
    }
}
enemyCreation();

console.log(allEnemy);
function animateLoop() {
    CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    allEnemy.forEach((enemy) => {
        enemy.update();
        enemy.draw();
    });
    timer = requestAnimationFrame(animateLoop);
}

animateLoop();