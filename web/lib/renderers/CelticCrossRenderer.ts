import { ISpreadRenderer, Spread, RenderedSpread } from "../types";

export class CelticCrossRenderer implements ISpreadRenderer {
    renderSpread(spread: Spread): RenderedSpread {
        if (spread.layout.type !== "CelticCross") {
            console.warn("CelticCrossRenderer received a non-CelticCross spread."); // Log a warning
            return []; // Return an empty rendered spread to prevent crashes
        }

        const minGap = 20; // Minimum gap between cards in pixels

        const positionMap: Record<string, { x: number; y: number; z?: number; rotation?: number }> = {
            significator: { x: 200, y: 200 },
            crossing: { x: 200 + minGap / 2, y: 200 + minGap / 2, z: 2, rotation: 45 },
            crowning: { x: 200, y: 100 - minGap },
            foundation: { x: 200, y: 300 + minGap },
            past: { x: 100 - minGap, y: 200 },
            future: { x: 300 + minGap, y: 200 },
            self: { x: 400 + minGap, y: 100 - minGap },
            environment: { x: 400 + minGap, y: 200 },
            hopesOrFears: { x: 400 + minGap, y: 300 + minGap },
            outcome: { x: 400 + minGap, y: 400 + minGap },
        };

        return spread.cards.map((card) => ({
            ...positionMap[card.position],
            layoutPosition: card.position,
        }));
    }
}