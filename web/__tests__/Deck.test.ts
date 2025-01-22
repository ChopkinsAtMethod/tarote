import { defaultDeck, fullDeck } from '@lib/Decks';

describe('Deck', () => {
    test('initializes with correct number of cards', () => {
        expect(defaultDeck.cards).toHaveLength(22);
    });

    test('complete tarot deck has 78 cards', () => {
        expect(fullDeck.cards).toHaveLength(78);
    });
});