import {
    Boundaries,
    IBall,
    IGameObject,
    Position,
} from '../interfaces';


export function detectCollision(ball: IBall, gameObject: IGameObject) {
    const topOfBall = ball.currentPosition.y - ball.radius;
    const bottomOfBall = ball.currentPosition.y + ball.radius;
    const leftOfBall = ball.currentPosition.x - ball.radius;
    const rightOfBall = ball.currentPosition.x + ball.radius;

    if (
        bottomOfBall >= gameObject.boundaries.top &&
        topOfBall <= gameObject.boundaries.bottom &&
        leftOfBall >= gameObject.boundaries.left &&
        rightOfBall <= gameObject.boundaries.right
    ) {
        return true;
    } 
    else {
        return false;
    }
}

export function calculateBoundaries(position: Position, width: number, height: number): Boundaries {
    return {
        top: position.y,
        left: position.x,
        bottom: position.y + height,
        right: position.x + width
    };
}
