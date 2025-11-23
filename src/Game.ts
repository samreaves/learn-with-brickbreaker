import {
    IGame,
    IBrick,
    IPaddle,
    IBall,
    GameState
} from './interfaces';
import Paddle from './components/Paddle';
import Ball from './components/Ball';
import InputHandler from './utils/Input';
import {
    buildLevel,
    level1
} from './levels/level1';
import { renderState } from './utils/RenderState';


export default class Game implements IGame {

    private lastTime: number;

    public context: CanvasRenderingContext2D;
    public paddle: Paddle;
    public ball: Ball;
    public ballSpeed: number;
    public width: number;
    public height: number;
    public gameObjects: (IPaddle|IBall)[];
    public bricks: IBrick[] = [];
    public gameState: GameState;

    constructor(gameWidth: number, gameHeight: number, context: CanvasRenderingContext2D) {
        this.width = gameWidth;
        this.height = gameHeight;
        this.context = context;
        this.lastTime = 0;
        this.ballSpeed = 30;
        this.gameState = GameState.MENU;
        this.gameObjects = [];

        this.paddle = new Paddle(this);
        const inputHandler = new InputHandler(this);
        this.ball = new Ball(this);
        this.draw();
    }

    start() {
        this.bricks = buildLevel(this, level1);
        this.ball.reset();
        this.gameObjects = [this.paddle, this.ball];
        this.gameState = GameState.RUNNING;

        this.draw();

        requestAnimationFrame(this.gameLoop.bind(this));
    }


    gameLoop(timestamp: number) {

        const deltaTime = timestamp - this.lastTime;

        this.lastTime = timestamp;

        this.context.clearRect(0, 0, this.width, this.height);
        this.update(deltaTime);
        this.draw();

        if (this.gameState === GameState.MENU) {
            return;
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    update(deltaTime: number) {
        if (
            this.gameState === GameState.PAUSED ||
            this.gameState === GameState.MENU ||
            this.gameState === GameState.GAMEOVER ||
            this.gameState === GameState.WIN
        ) { return; }

        [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));
        this.bricks = this.bricks.filter(object => !object.markedForDeletion);
        if (this.bricks.length === 0) {
            this.gameState = GameState.WIN;
        }
    }

    draw() {
        renderState(this);
    }

    togglePause() {
        this.gameState = this.gameState === GameState.PAUSED ? GameState.RUNNING : GameState.PAUSED;
    }
}
