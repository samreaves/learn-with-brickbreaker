import Paddle from './components/Paddle';
import Ball from './components/Ball';
import InputHandler from './utils/Input';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let canvas = document.getElementById('game-screen');
let context = canvas.getContext('2d');
context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let inputHandler = new InputHandler(paddle);

let ball = new Ball(GAME_WIDTH, GAME_HEIGHT));

paddle.draw(context);
ball.draw(context);


let lastTime = 0;

function gameLoop(timestamp: number) {
    let deltaTime = timestamp - lastTime;

    lastTime = timestamp;

    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    paddle.update(deltaTime);
    paddle.draw(context);
    ball.update(deltaTime);
    ball.draw(context);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
