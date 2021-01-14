export default class Paddle {

    width = 150;
    height = 20;
    position = {
        x: (gameWidth / 2 ) - (this.width / 2),
        y: gameHeight - this.height - 10
    };
    currentSpeed = 0;
    maxSpeed = 80;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = '#000';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        if (!deltaTime) { return; }

        this.position.x += this.currentSpeed / deltaTime;
         
        if (this.position.x < 0) { this.position.x = 0; }
        if ((this.position.x + this.width) > this.gameWidth) { this.position.x = this.gameWidth - this.width; }
    }

    moveLeft() {
        this.currentSpeed = -this.maxSpeed;
    }

    moveRight() {
        this.currentSpeed = this.maxSpeed;
    }

    stop() {
        this.currentSpeed = 0;
    }
}
