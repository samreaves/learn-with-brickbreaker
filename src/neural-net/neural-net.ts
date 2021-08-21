export default class Matrix {

    public rows: number;
    public columns: number;
    public data: any;

    constructor(rows: number, columns: number, data: any) {
        this.rows = rows;
        this.columns = columns;
        this.data = data;

        /* Initialize data with zeroes if not passed */
        if (this.data == null || data.length === 0) {
            this.data = [];
            for (let i = 0; i < this.rows; i++) {
                this.data[i] = [];
                for (let it = 0; it < this.columns; it++) {
                    
                    this.data[i][it] = 0;
                }
            }
        }
        /* Handle invalid data passed */
        else if (data.length != rows || data[0].length !== columns) {
            throw new Error('Incorrect data dimensions');
        }
    }
}
