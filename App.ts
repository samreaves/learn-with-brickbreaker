import Game from './src/game/Game';
import NeuralNetwork from './src/neural-net/NeuralNet';

const neuralNet = new NeuralNetwork(2, 5, 1);

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const canvas = document.getElementById('game-screen') as HTMLCanvasElement;
const context = canvas.getContext('2d');
context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

const game = new Game(GAME_WIDTH, GAME_HEIGHT, context, true, neuralNet);
