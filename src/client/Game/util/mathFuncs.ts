/**
 * Finds the lowest positive remainder of the dividend divided by the divisor.
 * @param dividend
 * @param divisor
 * @returns The lowest positive remainder of the dividend divided by the divisor.
 */
export function absValueModulo(dividend: number, divisor: number): number {
    return ((dividend % divisor) + divisor) % divisor;
}
