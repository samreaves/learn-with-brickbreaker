import Constants from '../utils/Constants';

export default class Ball {

    radius = 6;
    position = {
        x: (gameWidth / 2 ) - (this.radius),
        y: 30
    };
    maxSpeed = 100;
    currentSpeed = -this.maxSpeed;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = '#00F';
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true);
        context.fill();
        context.stroke();
    }

    update(deltaTime) {
        if (!deltaTime) { return; }

        this.position.y += this.currentSpeed / deltaTime;

        if (this.position.x < 0) { this.position.x = 0; }
        if ((this.position.x + (this.radius * 2)) > this.gameWidth) { this.position.x = this.gameWidth - (this.radius * 2); }
        if ((this.position.y + this.radius) > this.gameHeight) {
            this.position.y = this.gameHeight - this.radius;
            this.currentSpeed = -this.maxSpeed;
        }
        if ((this.position.y - this.radius) < 0) {
            this.position.y = 0 + this.radius;
            this.currentSpeed = this.maxSpeed;
        }
    }
}
