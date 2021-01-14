import Paddle from './components/Paddle';
import Ball from './components/Ball';
import InputHandler from './utils/Input';

export default class Game {
    constructor(gameWidth: number, gameHeight: number, context: any) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.context = context;
        this.lastTime = 0;
    }

    start() {
        this.paddle = new Paddle(this);
        let inputHandler = new InputHandler(this.paddle);

        this.ball = new Ball(this));

        this.paddle.draw(this.context);
        this.ball.draw(this.context);

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(timestamp: number) {
        let deltaTime = timestamp - this.lastTime;

        this.lastTime = timestamp;

        this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.paddle.update(deltaTime);
        this.paddle.draw(this.context);
        this.ball.update(deltaTime);
        this.ball.draw(this.context);

        requestAnimationFrame(this.gameLoop.bind(this));
    }
}
