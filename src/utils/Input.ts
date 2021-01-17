import { IPaddle } from '../interfaces';

export default class InputHandler {
    private paddle: IPaddle;

    constructor(paddle: IPaddle) {
        this.paddle = paddle;

        document.addEventListener('keydown', this.move.bind(this));
        document.addEventListener('keyup', this.stop.bind(this));
    }

    move(event: KeyboardEvent) {
        const key = event.keyCode;
        switch (key) {
            case 37:
                this.paddle.moveLeft();
                break;
            case 39:
                this.paddle.moveRight();
                break;
        }
    }

    stop(event: KeyboardEvent) {
        const key = event.keyCode;
        switch (key) {
            case 37:
                if (this.paddle.currentSpeed < 0) {
                    this.paddle.stop();
                }
                break;
            case 39:
                if (this.paddle.currentSpeed > 0) {
                    this.paddle.stop();
                }
                break;
        }
    }
}
