import { ISpreadRenderer, Spread, RenderedSpread } from "../types";

export class SpreadLayoutRenderer implements ISpreadRenderer {
    renderSpread(spread: Spread): RenderedSpread {
        const cardWidth = 150; // Approximate card width
        const gap = 20; // Space between cards
        const totalSpreadWidth = spread.cards.length * (cardWidth + gap) - gap; // Total width of the spread

        return spread.cards.map((card, index) => ({
            layoutPosition: card.position,
            x: index * (cardWidth + gap) - totalSpreadWidth / 2 + cardWidth / 2, // Centered layout
            y: 200, // Fixed Y position for all cards
            z: index + 1, // Stack order (not necessary here but retained for extensibility)
            rotation: 0, // No rotation
        }));
    }
}