import Game from './src/game/Game';
import NeuralNetwork from './src/neural-net/NeuralNet';

const automated = true;

const neuralNet = new NeuralNetwork(5, 5, 3);

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const canvas = document.getElementById('game-screen') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;
context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

if (automated) {
    const game = new Game(GAME_WIDTH, GAME_HEIGHT, context, automated, neuralNet);
    neuralNet.train([0, 1], [1]);
}
else {
    const game = new Game(GAME_WIDTH, GAME_HEIGHT, context, false)
}

