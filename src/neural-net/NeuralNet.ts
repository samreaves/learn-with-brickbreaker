import { IMatrix, INeuralNetwork } from "./interfaces";
import Matrix from "./Matrix";
import { sigmoid } from './Utils';

export default class NeuralNetwork implements INeuralNetwork {

    public inputs: number;
    public hidden: number;
    public outputs: number;

    public weights0: IMatrix;
    public weights1: IMatrix;


    constructor(inputs: number, hidden: number, outputs: number) {
        this.inputs = inputs;
        this.hidden = hidden;
        this.outputs = outputs;

        this.weights0 = new Matrix(this.inputs, this.hidden, []);
        this.weights1 = new Matrix(this.hidden, this.outputs, []);

        this.weights0.randomWeights();
        this.weights1.randomWeights();
    }

    feedForward(input: any[]) {
        let inputMatrix = Matrix.convertArrayToMatrix(input);
        let hidden = Matrix.dot(inputMatrix, this.weights0);
        hidden = Matrix.applyFunction(hidden, (x: number) => sigmoid(x));

        let outputs = Matrix.dot(hidden, this.weights1);
        outputs = Matrix.applyFunction(outputs, (x: number) => sigmoid(x));

        return outputs;
    }
}
