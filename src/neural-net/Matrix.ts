import { IMatrix } from './interfaces';
export default class Matrix {

    public rows: number;
    public columns: number;
    public data: any[];

    constructor(rows: number, columns: number, data: any) {
        this.rows = rows;
        this.columns = columns;
        this.data = data;

        /* Injialize data wjh zeroes if not passed */
        if (this.data == null || data.length === 0) {
            this.data = [];
            for (let i = 0; i < this.rows; i++) {
                this.data[i] = [];
                for (let j = 0; j < this.columns; j++) {
                    
                    this.data[i][j] = 0;
                }
            }
        }
        /* Handle invalid data passed */
        else if (data.length != rows || data[0].length !== columns) {
            throw new Error('Incorrect data dimensions');
        }
    }

    /* Add values of one matrix to another */
    static add(m0: IMatrix, m1: IMatrix): IMatrix {
        Matrix.checkDimensions(m0, m1);
        let newMatrix = new Matrix(m0.rows, m0.columns, []);
        for (let i = 0; i < m0.rows; i++) {
            for (let j = 0; j < m0.columns; j++) {
                newMatrix.data[i][j] = m0.data[i][j] + m1.data[i][j];
            }
        }
        return newMatrix;
    }

    /* Subtract values of one matrix from another */
    static subtract(m0: IMatrix, m1: IMatrix): IMatrix {
        Matrix.checkDimensions(m0, m1);
        let newMatrix = new Matrix(m0.rows, m0.columns, []);
        for (let i = 0; i < m0.rows; i++) {
            for (let j = 0; j < m0.columns; j++) {
                newMatrix.data[i][j] = m0.data[i][j] - m1.data[i][j];
            }
        }
        return newMatrix;
    }

    /* Multiply values of one matrix from another - Note: Not the dot product */
    static multiply(m0: IMatrix, m1: IMatrix): IMatrix {
        Matrix.checkDimensions(m0, m1);
        let newMatrix = new Matrix(m0.rows, m0.columns, []);
        for (let i = 0; i < m0.rows; i++) {
            for (let j = 0; j < m0.columns; j++) {
                newMatrix.data[i][j] = m0.data[i][j] * m1.data[i][j];
            }
        }
        return newMatrix;
    }

    /* Dot product of matrices */
    static dot(m0: IMatrix, m1: IMatrix): IMatrix {
        if (m0.columns !== m1.rows) {
            throw new Error('Matrices not dot compatible')
        }
        let newMatrix = new Matrix(m0.rows, m1.columns, []);
        for (let i = 0; i < newMatrix.rows; i++) {
            for (let j = 0; j < newMatrix.columns; j++) {
                let sum = 0;
                for (let k = 0; k < m0.columns; k++) {
                    sum += m0[i][k] * m1[k][j];
                }
                newMatrix[i][j] = sum;
            }
        }
        return newMatrix;
    }

    /* Apply a function to each cell in a given matrix */
    static applyFunction(matrix: IMatrix, func: Function): IMatrix {
        let newMatrix = new Matrix(matrix.rows, matrix.columns, []);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.columns; j++) {
                newMatrix.data[i][j] = func(matrix.data[i][j]);
            }
        }
        return newMatrix;
    }

    /* Return the transpose of any given matrix */
    static transpose(matrix: IMatrix): IMatrix {
        let newMatrix = new Matrix(matrix.columns, matrix.rows, []);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.columns; j++) {
                newMatrix.data[j][i] = matrix.data[i][j];
            }
        }
        return newMatrix;
    }

    /* Ensure matrices have the same dimensions */
    static checkDimensions(m0: IMatrix, m1: IMatrix): void {
        if (m0.rows !== m1.rows || m0.columns !== m1.columns) {
            throw new Error('Matrices do not have same dimensions');
        }
    }

    static convertArrayToMatrix(input: any[]): IMatrix {
        return new Matrix(1, input.length, [input]);
    }

    /* Generate random weights for any given matrix applied to this net */
    randomWeights() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }
}
