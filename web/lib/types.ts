// --- DOMAIN TYPES ---

// Represents a single card or rune, without assigned position or orientation
export interface Card {
  name: string;        // Name of the card
  description: string; // Description or meaning of the card
}

// Represents a drawn card with position and orientation assigned
export type DrawnCard = Card & {
  position: string;                      // Assigned position in the spread
  orientation?: "upright" | "reversed"; // Orientation (specific to tarot)
};

// Represents a deck containing cards or items
export interface Deck {
  name: string;        // Name of the deck
  description: string; // Description of the deck or its theme
  cards: Card[];       // Array of cards in the deck
}

// Represents a layout for a spread
export interface SpreadLayout {
  type: string;         // Type of the spread, e.g., "CelticCross"
  positions: string[];  // Logical positions, e.g., ["past", "present", "future"]
}

// Represents a completed spread with drawn cards
export interface Spread {
  layout: SpreadLayout; // Layout used for the spread
  cards: DrawnCard[];   // Cards drawn for this spread
}

// Interface for generating spreads
export interface ISpread {
  draw(deck: Deck): Spread; // Generates a spread based on the deck and layout
}

// --- AI & RAG TYPES ---

// Represents an AI reading service
export interface IReadingService {
  fetchReading(finalPrompt: string): Promise<string>; // Generates a reading from a prompt
}

// Represents a retrieval-augmented generation (RAG) service
export interface IRAGService {
  retrieveContext(userIntention: string): Promise<string[]>; // Retrieves external context
}

// Represents a service for building prompts
export interface IPromptEngineeringService {
  buildPrompt(
    userIntention: string,
    spread: Spread,
    toneType?: string
  ): string; // Builds the final prompt for the AI
}

// --- UI RENDERING TYPES ---

// Represents a single card's placement in the UI
export interface CardPlacement {
  layoutPosition: string; // Position name from the spread layout
  x: number;              // X-coordinate for positioning
  y: number;              // Y-coordinate for positioning
  z?: number;             // Optional stacking order (z-index)
  rotation?: number;      // Optional rotation angle (degrees or radians)
}

// Represents the fully rendered spread for UI purposes
export type RenderedSpread = CardPlacement[];

// Interface for rendering a spread into UI-ready data
export interface ISpreadRenderer {
  renderSpread(spread: Spread): RenderedSpread; // Converts a spread into UI placements
}

export interface UserInputProps {
  onSubmit: (intention: string) => void;   // Callback for handling user submission
  placeholder?: string;                   // Optional custom placeholder text
  defaultValue?: string;                  // Optional default value for the input
  validateInput?: (input: string) => boolean; // Optional validation function for the input
}