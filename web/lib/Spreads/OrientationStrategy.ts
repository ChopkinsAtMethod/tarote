/**
 * Strategy for determining the orientation of a spread.
 */
export class OrientationStrategy {
    private readonly threshold: number;

    /**
     * Creates a new OrientationStrategy instance.
     * @param threshold - The probability threshold for upright orientation (defaults to 0.5)
     */
    constructor(threshold = 0.5) {
        this.threshold = threshold;
    }

    /**
     * Determines whether a card should be upright or reversed.
     * @returns "upright" if random value is less than threshold, "reversed" otherwise
     */
    orient(): "upright" | "reversed" {
        return Math.random() < this.threshold ? "upright" : "reversed";
    }
}