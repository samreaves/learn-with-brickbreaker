export interface IMatrix {
    rows: number;
    columns: number;
    data: any[];
    randomWeights();
}

export interface INeuralNetwork {
    inputs: number;
    hidden: number;
    outputs: number;
    weights0: IMatrix;
    weights1: IMatrix;
}
