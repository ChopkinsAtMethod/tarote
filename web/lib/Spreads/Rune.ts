import { Card, SpreadLayout, Spread, Deck } from "@lib/types";
import { ISpread } from "@lib/interfaces";

// Define rune-specific spread layouts
export const threeRuneLayout: SpreadLayout = {
    type: "ThreeRuneSpread",
    positions: ["past", "present", "future"],
};

// Base class for rune spreads
export class RuneSpread implements ISpread<Card> {
    layout: SpreadLayout;

    constructor(layout: SpreadLayout) {
        this.layout = layout;
    }

    draw(deck: Deck): Spread {
        const shuffledDeck = [...deck.cards].sort(() => Math.random() - 0.5);
        const drawnCards = shuffledDeck.slice(0, this.layout.positions.length);

        return {
            layout: this.layout,
            cards: drawnCards.map((rune, index) => ({
                ...rune,
                position: this.layout.positions[index],
            })),
        };
    }
}

// Factory methods
export function createThreeRuneSpread(): RuneSpread {
    return new RuneSpread(threeRuneLayout);
}