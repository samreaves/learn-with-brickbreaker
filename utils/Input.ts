import Paddle from '../components/Paddle';

export default class InputHandler {
    paddle: Paddle;

    constructor(paddle: Paddle) {
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

    stop() {
        this.paddle.stop();
    }
}
