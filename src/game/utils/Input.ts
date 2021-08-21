import {
    GameState,
    IGame
} from '../interfaces';

export default class InputHandler {
    private game: IGame;

    constructor(game: IGame) {
        this.game = game;

        document.addEventListener('keydown', this.keyDown.bind(this));
        document.addEventListener('keyup', this.keyUp.bind(this));
    }

    keyDown(event: KeyboardEvent) {
        if (this.game.gameState === GameState.RUNNING) {
            const key = event.keyCode;
            switch (key) {
                case 37:
                    this.game.paddle.moveLeft();
                    break;
                case 39:
                    this.game.paddle.moveRight();
                    break;
            }
        }
    }

    keyUp(event: KeyboardEvent) {
        const key = event.keyCode;
        switch (key) {
            case 37:
                if (
                    this.game.gameState === GameState.RUNNING &&
                    this.game.paddle.currentSpeed < 0
                ) {
                    this.game.paddle.stop();
                }
                break;
            case 39:
                if (
                    this.game.gameState === GameState.RUNNING &&
                    this.game.paddle.currentSpeed > 0
                ) {
                    this.game.paddle.stop();
                }
                break;
            case 27:
                if (
                    this.game.gameState === GameState.RUNNING ||
                    this.game.gameState === GameState.PAUSED
                ) {
                    this.game.togglePause();
                }
                break;
            case 32:
                if (this.game.gameState === GameState.MENU) {
                    this.game.start();
                }
                break;
            case 13:
                if (
                    this.game.gameState === GameState.GAMEOVER ||
                    this.game.gameState === GameState.WIN
                ) {
                    this.game.gameState = GameState.MENU;
                }
            default:
                return;
        }
    }
}
