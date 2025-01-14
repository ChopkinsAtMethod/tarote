import {
    Deck,
    Spread,
    SpreadLayout,
    ISpread,
    DrawnCard,
    Card,
} from "./types";

// Define common spread layouts
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

// Base class for spreads
export class TarotSpread implements ISpread {
    layout: SpreadLayout;

    constructor(layout: SpreadLayout) {
        this.layout = layout;
    }

    draw(deck: Deck): Spread {
        // Shuffle deck
        const shuffledCards: Card[] = [...deck.cards].sort(() => Math.random() - 0.5);

        // Draw cards based on layout positions
        const drawnCards = shuffledCards.slice(0, this.layout.positions.length);

        // Assign position and orientation
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

// Specialized class for Celtic Cross
export class CelticCrossSpread extends TarotSpread {
    constructor() {
        super(celticCrossLayout);
    }

    // You could override `draw` here if Celtic Cross needed additional custom behavior
    draw(deck: Deck): Spread {
        return super.draw(deck);
    }
}

// Factory methods for creating spreads
export function createPastPresentFutureSpread(): TarotSpread {
    return new TarotSpread(pastPresentFutureLayout);
}

export function createCelticCrossSpread(): CelticCrossSpread {
    return new CelticCrossSpread();
}