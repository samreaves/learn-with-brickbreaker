import {
    GameState,
    IGame
} from "../interfaces"

export function renderState(game: IGame): void  {
    switch (game.gameState) {
        case GameState.PAUSED:
            fillScreenWithMessage(game, 'rgba(0, 0, 0, 0.5)', 'PAUSED')
            break;
        case GameState.MENU:
            fillScreenWithMessage(game, 'rgb(0, 0, 0)', 'Press SPACEBAR to begin');
            break;
        case GameState.GAMEOVER:
            fillScreenWithMessage(game, 'rgb(0, 0, 0)', 'GAME OVER', 'Press enter to return to menu');
            break;
        case GameState.WIN:
            fillScreenWithMessage(game, 'rgb(0, 255, 0', 'A WINNER IS YOU!', 'Press enter to return to menu');
            break;
        case GameState.RUNNING:
            [...game.gameObjects, ...game.bricks].forEach(object => object.draw(game.context));
            break;
        default:
            console.error('GameState configured incorrectly');
    }
}

function fillScreenWithMessage(game: IGame, color: string, title: string, message?: string) {
    /* Fill the screen with a color */
    game.context.fillStyle = color;
    game.context.fillRect(0, 0, game.width, game.height);
    game.context.fill();

    /* Set text in the middle */
    game.context.font = '30px Arial';
    game.context.fillStyle = 'white';
    game.context.textAlign = 'center';
    game.context.fillText(title, game.width / 2, game.height / 2);

    /* If message, put message below */
    if (message) {
        game.context.font = '30px Arial';
        game.context.fillStyle = 'white';
        game.context.textAlign = 'center';
        game.context.fillText(message, game.width / 2, game.height / 2 + 50);
    }
}
