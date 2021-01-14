import Paddle from './components/Paddle';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let canvas = document.getElementById('game-screen');
let context = canvas.getContext('2d');
context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);

paddle.draw(context);
