import { Deck, Spread, SpreadLayout, DrawnCard, Card } from "@lib/types";
import { ISpread } from "@lib/interfaces";
import { OrientationStrategy } from "./OrientationStrategy";

// Define tarot spread layouts
const pastPresentFutureLayout: SpreadLayout = {
    type: "PastPresentFuture",
    positions: ["past", "present", "future"],
};

const celticCrossLayout: SpreadLayout = {
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
class TarotSpread implements ISpread<Card> {
    layout: SpreadLayout;
    private readonly orientationStrategy: OrientationStrategy;

    constructor(layout: SpreadLayout) {
        this.layout = layout;
        this.orientationStrategy = new OrientationStrategy();
    }

    draw(deck: Deck): Spread {
        const shuffledDeck: Card[] = [...deck.cards].sort(() => Math.random() - 0.5);
        const drawnCards = shuffledDeck.slice(0, this.layout.positions.length);

        const cardsWithAttributes: DrawnCard[] = drawnCards.map((card, index) => ({
            ...card,
            position: this.layout.positions[index],
            orientation: this.orientationStrategy.orient(),
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