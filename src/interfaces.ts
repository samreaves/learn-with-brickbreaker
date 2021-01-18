export interface Position {
    x: number;
    y: number;
}

export interface BallSpeed {
    x: number;
    y: number;
}

export enum GameState {
    PAUSED = 0,
    RUNNING = 1,
    MENU = 2,
    GAMEOVER = 3,
    WIN = 4
}

export interface IGame {
    context: CanvasRenderingContext2D
    paddle: IPaddle;
    ball: IBall;
    bricks: IBrick[];
    ballSpeed: number;
    width: number;
    height: number;
    gameObjects: (IPaddle|IBall)[];
    gameState: GameState;

    start(): void,
    gameLoop(timestamp: number): void;
    update(deltaTime: number): void;
    draw(): void;
    togglePause(): void;
}

export interface IBall {
    radius: number;
    currentPosition: Position;
    maxSpeed: number;
    currentSpeed: BallSpeed;

    draw(context: CanvasRenderingContext2D): void;
    update(deltaTime: number): void;
    reset(): void;
}

export interface IPaddle extends IGameObject {
    width: number;
    height: number;
    position: Position;
    currentSpeed: number;
    speed: number

    draw(context: CanvasRenderingContext2D): void;
    update(deltaTime: number): void;
    moveLeft(): void;
    moveRight(): void;
    stop(): void;
    reset(): void;
}

export interface IBrick extends IGameObject {
    width: number;
    height: number;
    position: Position;
    markedForDeletion: boolean;

    update(deltaTime: number): void;
    draw(context: CanvasRenderingContext2D);
}

export interface IGameObject {
    boundaries: Boundaries;
}

export interface Boundaries {
    top: number;
    left: number;
    bottom: number;
    right: number;
}
