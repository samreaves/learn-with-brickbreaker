export interface Position {
    x: number,
    y: number
}

export interface BallSpeed {
    x: number,
    y: number
}

export interface IGame {
    paddle: IPaddle;
    ball: IBall;
    ballSpeed: number;
    width: number;
    height: number;
    gameObjects: any[];

    start(): void,
    gameLoop(timestamp: number): void,
    update(deltaTime: number): void
    draw(): void
}

export interface IBall {
    radius: number;
    currentPosition: Position;
    maxSpeed: number;
    currentSpeed: BallSpeed;

    draw(context: CanvasRenderingContext2D): void,
    update(deltaTime: number): void,
}

export interface IPaddle extends IGameObject {
    width: number;
    height: number;
    position: Position
    currentSpeed: number;
    speed: number

    draw(context: CanvasRenderingContext2D): void,
    update(deltaTime: number): void,
    moveLeft(): void,
    moveRight(): void,
    stop(): void
}

export interface IBrick extends IGameObject {
    width: number,
    height: number,
    position: Position
}

export interface IGameObject {
    boundaries: Boundaries
}

export interface Boundaries {
    top: number,
    left: number,
    bottom: number,
    right: number
}
