import { randomBytes } from 'crypto';

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
        if (threshold < 0 || threshold > 1) {
            throw new Error('Threshold must be between 0 and 1');
        }
        this.threshold = threshold;
    }

    /**
     * Determines whether a card should be upright or reversed.
     * @returns "upright" if random value is less than threshold, "reversed" otherwise
     */
    orient(): "upright" | "reversed" {
        // Use Node's crypto.randomBytes for secure randomness
        const rand = randomBytes(4).readUInt32LE() / 0x100000000; // Convert to [0,1)
        return rand < this.threshold ? "upright" : "reversed";
    }
}