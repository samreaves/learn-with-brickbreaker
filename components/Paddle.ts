export default class Paddle {
    constructor(gameWidth: number, gameHeight: number) {}

    width = 150;
    height = 30;
    position = {
        x: (gameWidth / 2 ) - (this.width / 2),
        y: gameHeight - this.height - 10
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = '#000';

        console.log(this.position, this.width, this.height);
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
