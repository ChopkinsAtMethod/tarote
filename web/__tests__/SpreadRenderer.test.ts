import { Spread, RenderedSpread, Card, Deck, DrawnCard } from "@lib/types";
import { ISpreadRenderer, ISpread } from "@lib/interfaces";

class MockRenderer implements ISpreadRenderer<Spread, RenderedSpread> {
    renderSpread(spread: Spread): RenderedSpread {
        return spread.cards.map((card, i) => ({
            layoutPosition: card.position,
            x: i * 100,
            y: 0,
        }));
    }
}

class MockSpread implements ISpread<Card> {
    layout = {
        type: "CelticCross",
        positions: [
            "significator",
            "crossing",
            "crowning",
            "foundation",
            "past",
            "future",
        ],
    };

    draw(deck: Deck): Spread {
        const drawnCards: DrawnCard[] = this.layout.positions.map((position, index) => ({
            ...deck.cards[index % deck.cards.length],
            position: position,
            orientation: "upright"
        }));

        return {
            layout: this.layout,
            cards: drawnCards
        };
    }
}

// Mock deck for testing
const dummyDeck: Deck = {
    name: "Test Deck",
    description: "Test deck for renderer",
    cards: [
        { name: "Card 1", description: "Test card 1" },
        { name: "Card 2", description: "Test card 2" },
        { name: "Card 3", description: "Test card 3" },
        { name: "Card 4", description: "Test card 4" },
        { name: "Card 5", description: "Test card 5" },
        { name: "Card 6", description: "Test card 6" },
    ]
};

describe("Spread rendering", () => {
    test("renders spread with mock renderer", () => {
        const mockSpread = new MockSpread();
        const spread = mockSpread.draw(dummyDeck);
        const renderer = new MockRenderer();
        const rendered = renderer.renderSpread(spread);

        expect(rendered).toHaveLength(spread.cards.length);
        expect(rendered[0]).toEqual({
            layoutPosition: "significator",
            x: 0,
            y: 0,
        });
        expect(rendered[1]).toEqual({
            layoutPosition: "crossing",
            x: 100,
            y: 0,
        });

        // Test remaining positions
        for (let i = 2; i < spread.cards.length; i++) {
            expect(rendered[i]).toEqual({
                layoutPosition: spread.cards[i].position,
                x: i * 100,
                y: 0,
            });
        }
    });
});