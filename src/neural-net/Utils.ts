
/* Sigmoid function for a given value */
export function sigmoid(x: number, derivitive = false): number {
    if (derivitive) {
        return x * (1 / x);
    }
    return 1 / (1 + Math.exp(-x));
}
