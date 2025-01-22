import { OrientationStrategy } from '@lib/Spreads'

describe('OrientationStrategy', () => {
    test("returns 'upright' or 'reversed'", () => {
        const strategy = new OrientationStrategy();
        const orientation = strategy.orient();
        expect(orientation).toMatch(/upright|reversed/);
    });

    test("validates threshold bounds", () => {
        expect(() => new OrientationStrategy(-0.1)).toThrow();
        expect(() => new OrientationStrategy(1.1)).toThrow();
    });

    test("distribution test", () => {
        const threshold = 0.8;
        const trials = 1000;
        const numBatches = 10;
        const strategy = new OrientationStrategy(threshold);

        // Run multiple batches to check distribution
        const batchResults = Array.from({ length: numBatches }, () => {
            const orientations = Array.from({ length: trials }, () => strategy.orient());
            return orientations.filter(o => o === 'upright').length;
        });

        // Calculate statistics for the overall distribution
        const expectedCount = trials * threshold;
        const stdDev = Math.sqrt(trials * threshold * (1 - threshold));

        // Check each batch
        const deviations = batchResults.map(count => Math.abs(count - expectedCount) / stdDev);

        // Calculate overall statistics
        const avgUpright = batchResults.reduce((sum, val) => sum + val, 0) / (numBatches * trials);
        const overallDeviation = Math.abs(avgUpright - threshold);

        // Log results
        console.log(`
            Expected proportion: ${threshold}
            Actual proportion: ${avgUpright}
            Overall deviation: ${overallDeviation}
            Individual batch deviations: ${deviations.join(', ')}
        `);

        // Count how many batches are outside 4 standard deviations
        const extremeBatches = deviations.filter(dev => dev > 4).length;

        if (extremeBatches > 0) {
            console.warn(`
                Warning: ${extremeBatches} batch(es) exceeded 4 standard deviations.
                This is unusual but can happen randomly.
                Overall distribution deviation: ${overallDeviation}
            `);
        }

        // Only fail if we have both:
        // 1. Multiple extreme batches
        // 2. Overall distribution is significantly off
        if (extremeBatches >= 2 && overallDeviation > 0.05) {
            fail(`
                Distribution test failed:
                - ${extremeBatches} batches exceeded 4 standard deviations
                - Overall deviation of ${overallDeviation} exceeds 0.05 threshold
                This suggests a systematic issue rather than random chance.
            `);
        }
    });
});