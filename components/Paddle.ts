import Game from "../Game";

export default class Paddle {
    private game: Game;

    width = 100;
    height = 20;
    position: Position
    currentSpeed = 0;
    speed = 80;

    constructor(game: Game) {
        this.game = game;
        this.position = {
            x: (this.game.width / 2) - (this.width / 2),
            y: this.game.height - this.height - 10
        };
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = '#000';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        this.position.x += this.currentSpeed / deltaTime;
         
        if (this.position.x < 0) { this.position.x = 0; }
        if ((this.position.x + this.width) > this.game.width) { this.position.x = this.game.width - this.width; }
    }

    moveLeft() {
        this.currentSpeed = -this.speed;
    }

    moveRight() {
        this.currentSpeed = this.speed;
    }

    stop() {
        this.currentSpeed = 0;
    }
}
