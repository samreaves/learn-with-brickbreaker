import { IMatrix, INeuralNetwork } from "./interfaces";
import Matrix from "./Matrix";

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
}
