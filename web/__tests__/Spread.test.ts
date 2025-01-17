import { createCelticCrossSpread } from '@lib/Spreads/Tarot';

describe('Spread', () => {
    const dummyDeckEmpty = {
        name: 'Dummy Deck',
        description: 'A deck for testing purposes',
        cards: [],
    };

    const dummyDeck = {
        name: 'Dummy Deck',
        description: 'A deck for testing purposes',
        cards: Array.from({ length: 100 }, (_, i) => ({
            name: `Card ${i + 1}`,
            description: `Description of card ${i + 1}`,
            image: `card-${i + 1}.jpg`,
        })),
    };

    test('Celtic Cross spread has 10 cards', () => {
        const spread = createCelticCrossSpread().draw(dummyDeck);
        expect(spread.cards).toHaveLength(10);
    });

    test('Celtic Cross spread has correct positions', () => {
        const spread = createCelticCrossSpread().draw(dummyDeck);
        expect(spread.layout.positions).toEqual([
            'significator',
            'crossing',
            'crowning',
            'foundation',
            'past',
            'future',
            'self',
            'environment',
            'hopesOrFears',
            'outcome',
        ]);
    });

    test('Empty deck returns empty spread', () => {
        const spread = createCelticCrossSpread().draw(dummyDeckEmpty);
        expect(spread.cards).toHaveLength(0);
    });

    test('Drawn cards are unique', () => {
        const spread = createCelticCrossSpread().draw(dummyDeck);
        const cardNames = spread.cards.map((card) => card.name);
        const uniqueCardNames = new Set(cardNames);
        expect(uniqueCardNames.size).toBe(cardNames.length);
    });

    test('Drawn cards have positions', () => {
        const spread = createCelticCrossSpread().draw(dummyDeck);
        const hasPositions = spread.cards.every((card) => spread.layout.positions.includes(card.position));
        expect(hasPositions).toBe(true);
    });

    test('Drawn cards have orientations', () => {
        const spread = createCelticCrossSpread().draw(dummyDeck);
        const hasOrientations = spread.cards.every((card) => card.orientation === 'upright' || card.orientation === 'reversed');
        expect(hasOrientations).toBe(true);
    });

    test('Redrawn spread has different cards', () => {
        const spread = createCelticCrossSpread().draw(dummyDeck);
        const newSpread = createCelticCrossSpread().draw(dummyDeck);
        const thirdSpread = createCelticCrossSpread().draw(dummyDeck);
        const isDifferent = spread.cards.some((card, i) => card.name !== newSpread.cards[i].name);
        const isDifferent2 = spread.cards.some((card, i) => card.name !== thirdSpread.cards[i].name);
        const isDifferent3 = newSpread.cards.some((card, i) => card.name !== thirdSpread.cards[i].name);
        expect(isDifferent || isDifferent2 || isDifferent3).toBe(true);
    });

    test('Drawn cards have unique positions', () => {
        const spread = createCelticCrossSpread().draw(dummyDeck);
        const positions = spread.cards.map((card) => card.position);
        const uniquePositions = new Set(positions);
        expect(uniquePositions.size).toBe(positions.length);
    });
});