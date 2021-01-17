import {
    Position,
    IBrick,
    IGame,
    Boundaries
} from '../interfaces';
import {
    calculateBoundaries,
    detectCollision
} from '../utils/CollisionDetection';

export default class Brick implements IBrick {
    private game: IGame;
    public width = 80;
    public height = 20;
    public position: Position
    public boundaries: Boundaries
    public markedForDeletion: boolean = false;

    constructor(game: IGame, position: Position) {
        this.game = game;
        this.position = position;
        this.boundaries = calculateBoundaries(this.position, this.width, this.height);
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = '#00F';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        if (detectCollision(this.game.ball, this)) {
            this.game.ball.currentSpeed.y = -this.game.ball.currentSpeed.y
            this.markedForDeletion = true;
        }
    }
}
