export default class Ball {

    radius = 6;
    originalPosition = {
        x: (game.gameWidth / 2 ) - (this.radius),
        y: 30
    }
    position = {
        x: Number(this.originalPosition.x),
        y: Number(this.originalPosition.y)
    };
    maxSpeed = game.maxSpeed;
    currentSpeed = { x: this.maxSpeed, y: this.maxSpeed };

    constructor(game: any) {
        this.game = game;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = '#F00';
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
        context.fill();
        context.stroke();
    }

    update(deltaTime) {
        this.position.y += this.currentSpeed.y / deltaTime;
        this.position.x += this.currentSpeed.x / deltaTime;

        if (this.position.x < 0 + this.radius) {
            this.position.x = 0 + this.radius;
            this.currentSpeed.x = this.maxSpeed;
        }
        if ((this.position.x + this.radius) > this.game.gameWidth) {
            this.position.x = this.game.gameWidth - this.radius;
            this.currentSpeed.x = -this.maxSpeed;
        }
        if ((this.position.y + this.radius) > this.game.gameHeight) {
            this.position.y = this.originalPosition.y;
        }
        if ((this.position.y + this.radius) > this.game.paddle.position.y &&
            this.position.x + this.radius >= this.game.paddle.position.x &&
            this.position.x + this.radius <= this.game.paddle.position.x + this.game.paddle.width) {
            this.currentSpeed.y = -this.maxSpeed;
        }
        if ((this.position.y - this.radius) < 0) {
            this.position.y = 0 + this.radius;
            this.currentSpeed.y = this.maxSpeed;
        }
    }
}
