import Paddle from './components/Paddle';
import Ball from './components/Ball';
import InputHandler from './utils/Input';

export default class Game {

    private context: CanvasRenderingContext2D;
    private lastTime: number;

    public paddle: Paddle;
    public ball: Ball;
    public ballSpeed: number;
    public width: number;
    public height: number;

    constructor(gameWidth: number, gameHeight: number, context: CanvasRenderingContext2D) {
        this.width = gameWidth;
        this.height = gameHeight;
        this.context = context;
        this.lastTime = 0;
        this.ballSpeed = 100;
    }

    start() {
        this.paddle = new Paddle(this);
        const inputHandler = new InputHandler(this.paddle);

        this.ball = new Ball(this);

        this.draw();

        requestAnimationFrame(this.gameLoop.bind(this));
    }


    gameLoop(timestamp: number) {
        const deltaTime = timestamp - this.lastTime;

        this.lastTime = timestamp;

        this.context.clearRect(0, 0, this.width, this.height);
        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    update(deltaTime: number) {
        this.paddle.update(deltaTime);
        this.ball.update(deltaTime);
    }

    draw() {
        this.paddle.draw(this.context);
        this.ball.draw(this.context);
    }
}
