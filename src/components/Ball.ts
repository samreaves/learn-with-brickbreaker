import {
    Position,
    BallSpeed,
    IGame,
    IBall
} from '../interfaces';
import { detectCollision } from '../utils/CollisionDetection';

export default class Ball implements IBall {
    private game: IGame;
    private originalPosition: Position;

    public radius = 6;
    public currentPosition: Position;
    public maxSpeed: number;
    public currentSpeed: BallSpeed;

    constructor(game: IGame) {
        this.game = game;
        this.originalPosition = {
            x: (this.game.width / 2) - this.radius,
            y: 30
        };
        this.currentPosition = {
            x: Number(this.originalPosition.x),
            y: Number(this.originalPosition.y)
        };
        this.maxSpeed = this.game.ballSpeed;
        this.currentSpeed = {
            x: this.maxSpeed,
            y: this.maxSpeed
        }; 
        
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = '#F00';
        context.beginPath();
        context.arc(this.currentPosition.x, this.currentPosition.y, this.radius, 0, Math.PI * 2, true);
        context.fill();
        context.stroke();
    }

    update(deltaTime) {
        this.currentPosition.y += this.currentSpeed.y / deltaTime;
        this.currentPosition.x += this.currentSpeed.x / deltaTime;

        if (this.currentPosition.x < 0 + this.radius) {
            this.currentPosition.x = 0 + this.radius;
            this.currentSpeed.x = this.maxSpeed;
        }
        if ((this.currentPosition.x + this.radius) > this.game.width) {
            this.currentPosition.x = this.game.width - this.radius;
            this.currentSpeed.x = -this.maxSpeed;
        }
        if ((this.currentPosition.y + this.radius) > this.game.height) {
            this.currentPosition.y = this.originalPosition.y;
        }
        if ((this.currentPosition.y - this.radius) < 0) {
            this.currentPosition.y = 0 + this.radius;
            this.currentSpeed.y = this.maxSpeed;
        }
        if (detectCollision(this, this.game.paddle)) {
            this.currentSpeed.y = -this.maxSpeed;
        }
    }
}
