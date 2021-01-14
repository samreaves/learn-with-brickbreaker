export default class Paddle {
    constructor(gameWidth: number, gameHeight: number) {}

    width = 150;
    height = 20;
    position = {
        x: (gameWidth / 2 ) - (this.width / 2),
        y: gameHeight - this.height - 10
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = '#000';
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(deltaTime) {
        if (!deltaTime) { return; }
        this.position.x += 5 / deltaTime;
    }
}
