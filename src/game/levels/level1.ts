import Game from '../Game';
import Brick from '../components/Brick';
import { Position } from '../interfaces';

export function buildLevel(game: Game, level): Brick[] {
    let bricks = [];
    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if (brick === 1) {
                const position: Position = {
                    x: 80 * brickIndex,
                    y: 75 + (20 * rowIndex)
                };
                bricks.push(new Brick(game, position));
            }
        });
    });

    return bricks;
}

export const level1 = [
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
];
