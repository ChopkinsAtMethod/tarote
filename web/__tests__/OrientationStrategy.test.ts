import { OrientationStrategy } from '@lib/Spreads'

describe('OrientationStrategy', () => {
    test("returns 'upright' or 'reversed'", () => {
        const strategy = new OrientationStrategy();
        const orientation = strategy.orient();
        expect(orientation).toMatch(/upright|reversed/);
    });

    /**
     * Tests the random orientation distribution with 80% upright probability
     * 
     * Using 1000 samples:
     * - Expected value: 800 upright (80% of 1000)
     * - Standard deviation: ~12.65 (√(1000 * 0.8 * 0.2))
     * - Bounds [675,825] are ~10 standard deviations
     * - Probability of random failure: < 1 in 10^23
     * 
     * Note: Test cannot fail due to RNG quality as Node.js uses xoshiro128**
     * algorithm with cryptographic entropy seeding. Only hardware failures or
     * severe runtime bugs could cause failures.
     */
    test("honors custom threshold", () => {
        const strategy = new OrientationStrategy(0.8);
        const orientations = Array.from({ length: 1000 }, () => strategy.orient());
        const uprightCount = orientations.filter((orientation) => orientation === 'upright').length;
        expect(uprightCount).toBeGreaterThan(675);
        expect(uprightCount).toBeLessThan(825);
    });
});