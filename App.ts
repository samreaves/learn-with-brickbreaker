import Game from './src/game/Game';
import Matrix from './src/neural-net/Matrix';

const neuralNet = new Matrix(2, 3, []);
neuralNet.randomWeights();
console.table(neuralNet.data);

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const canvas = document.getElementById('game-screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');
context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

const game = new Game(GAME_WIDTH, GAME_HEIGHT, context);
