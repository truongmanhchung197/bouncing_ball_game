let ball;
let bar;
let score=0;

let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 500;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 1000 / 60);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function Ball(radius, color, x, y, dx, dy) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.updateBall = function () {
        let ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.font="30px Arial"
        ctx.fillText("Score = "+score,10,50);
    }
    this.newPos = function () {
        this.x += this.dx;
        this.y -= this.dy;
    }
    this.impact = function () {
        if (this.x + this.radius >= myGameArea.canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        } else {
            if (this.y - this.radius < 0) {
                this.dy = -this.dy;
            } else {
                if (this.y + this.radius >= bar.y) {
                    if (this.x + this.radius > bar.x && this.x < bar.x + bar.width) {
                        this.dy = -this.dy;
                        score++;
                    }
                }
            }
        }
        if ((ball.y + ball.radius) >= myGameArea.canvas.height) {
            clearInterval(myGameArea.interval);
            alert("GAME OVER!!!");
            location.reload();
        }
    }
}

let Bar = function (width, height, x, y, color, speed) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = color;
    this.updateBar = function () {
        let ctx = myGameArea.context;
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.closePath();
    }
    this.newPos = function () {
        this.x += this.speed;
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x >= myGameArea.canvas.width - this.width) {
            this.x = myGameArea.canvas.width - this.width;
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    ball.updateBall();
    ball.newPos();
    ball.impact();
    if (!myGameArea.key) {
        bar.speed = 0;
    }
    if (myGameArea.key && myGameArea.key === 37) {
        bar.speed = -5;
    }
    if (myGameArea.key && myGameArea.key === 39) {
        bar.speed = 5;
    }
    bar.updateBar();
    bar.newPos();
}

function startGame() {
    ball = new Ball(10, "red", 250, 400, 5, 5);
    bar = new Bar(120, 10, 200, 590, "red", 0);
    myGameArea.start();
}


