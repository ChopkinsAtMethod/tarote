import {
    Deck,
    Spread,
    SpreadLayout,
    ISpread,
    DrawnCard,
    Card,
} from "./types";

// A simple Past-Present-Future layout
const pastPresentFutureLayout: SpreadLayout = {
    type: "PastPresentFuture",
    positions: ["past", "present", "future"],
};

export class TarotSpread implements ISpread {
    layout: SpreadLayout;

    constructor(layout: SpreadLayout) {
        this.layout = layout;
    }

    // Draw cards from the deck and assign positions/orientations
    draw(deck: Deck): Spread {
        // Shuffle deck
        const shuffledCards: Card[] = [...deck.cards].sort(() => Math.random() - 0.5);

        // Draw as many cards as positions in the layout
        const drawnCards = shuffledCards.slice(0, this.layout.positions.length);

        // Assign position (strict) and orientation to each drawn card
        const cardsWithAttributes: DrawnCard[] = drawnCards.map((card, index) => ({
            ...card,
            position: this.layout.positions[index] as "past" | "present" | "future",
            orientation: Math.random() > 0.5 ? "upright" : "reversed",
        }));

        return {
            layout: this.layout,
            cards: cardsWithAttributes,
        };
    }
}

// We only have one layout for now
export function createPastPresentFutureSpread(): TarotSpread {
    return new TarotSpread(pastPresentFutureLayout);
}