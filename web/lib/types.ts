// Represents a tarot card with no assigned position/orientation yet.
export interface Card {
  name: string;
  description: string;
  position?: "past" | "present" | "future"; // optional until drawn
  orientation?: "upright" | "reversed";    // optional until drawn
}

// Represents a tarot deck containing neutral (undrawn) cards.
export interface Deck {
  name: string;
  description: string;
  cards: Card[];
}

// Represents the layout for a spread (e.g., which positions exist).
export interface SpreadLayout {
  type: string;           // e.g. "PastPresentFuture"
  positions: string[];    // e.g. ["past", "present", "future"]
}

// Represents a fully drawn card with assigned position and orientation.
export type DrawnCard = Card & {
  position: "past" | "present" | "future";
  orientation: "upright" | "reversed";
};

// Represents a completed spread: layout + drawn cards.
export interface Spread {
  layout: SpreadLayout;
  cards: DrawnCard[];
}

// An interface for any class/object that can draw a Spread from a Deck.
export interface ISpread {
  draw(deck: Deck): Spread;
}

// Props for the TarotDisplay component
export interface TarotDisplayProps {
  spread: Spread;
  intention: string;
}

// Props for the UserInput component
export interface UserInputProps {
  onSubmit: (intention: string) => void;
}