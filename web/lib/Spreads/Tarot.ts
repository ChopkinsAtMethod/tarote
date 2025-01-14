import { Deck, Spread, SpreadLayout, ISpread, DrawnCard, Card } from "../types";

// Define tarot spread layouts
export const pastPresentFutureLayout: SpreadLayout = {
    type: "PastPresentFuture",
    positions: ["past", "present", "future"],
};

export const celticCrossLayout: SpreadLayout = {
    type: "CelticCross",
    positions: [
        "significator",
        "crossing",
        "crowning",
        "foundation",
        "past",
        "future",
        "self",
        "environment",
        "hopesOrFears",
        "outcome",
    ],
};

// Base class for tarot spreads
export class TarotSpread implements ISpread {
    layout: SpreadLayout;

    constructor(layout: SpreadLayout) {
        this.layout = layout;
    }

    draw(deck: Deck): Spread {
        const shuffledDeck: Card[] = [...deck.cards].sort(() => Math.random() - 0.5);
        const drawnCards = shuffledDeck.slice(0, this.layout.positions.length);

        const cardsWithAttributes: DrawnCard[] = drawnCards.map((card, index) => ({
            ...card,
            position: this.layout.positions[index],
            orientation: Math.random() > 0.5 ? "upright" : "reversed",
        }));

        return {
            layout: this.layout,
            cards: cardsWithAttributes,
        };
    }
}

// Factory methods for tarot spreads
export function createPastPresentFutureSpread(): TarotSpread {
    return new TarotSpread(pastPresentFutureLayout);
}

export function createCelticCrossSpread(): TarotSpread {
    return new TarotSpread(celticCrossLayout);
}