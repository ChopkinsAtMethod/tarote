// --- DOMAIN TYPES ---

/** Represents a single card or rune, without assigned position or orientation */
export type Card = {
  name: string;        // Name of the card
  description: string; // Description or meaning of the card
};

/** Represents a drawn card with position and orientation assigned */
export type DrawnCard = Card & {
  position: string;                     // Assigned position in the spread
  orientation?: "upright" | "reversed"; // Orientation (specific to tarot)
};

/** Represents a deck containing cards or items */
export type Deck = {
  name: string;        // Name of the deck
  description: string; // Description of the deck or its theme
  cards: Card[];       // Array of cards in the deck
};

/** Represents a layout for a spread */
export type SpreadLayout = {
  type: string;        // Type of the spread, e.g., "CelticCross"
  positions: string[]; // Logical positions, e.g., ["past", "present", "future"]
};

/** Represents a completed spread with drawn cards */
export type Spread = {
  layout: SpreadLayout; // Layout used for the spread
  cards: DrawnCard[];   // Cards drawn for this spread
};

// --- AI TYPES ---

export type OllamaReadingServiceConfig = {
  endpoint?: string;         // The API endpoint for Ollama
  model: string;             // The model name (required)
  suffix?: string;           // Optional text to append after the response
  stream?: boolean;          // Whether to stream the response (default: false)
  options?: Record<string, string>; // Additional model parameters (e.g., temperature)
};

// --- UI RENDERING TYPES ---

/** Represents a single card's placement in the UI */
export type CardPlacement = {
  layoutPosition: string; // Position name from the spread layout
  x: number;              // X-coordinate for positioning
  y: number;              // Y-coordinate for positioning
  z?: number;             // Optional stacking order (z-index)
  rotation?: number;      // Optional rotation angle (degrees or radians)
};

/** Represents the fully rendered spread for UI purposes */
export type RenderedSpread = CardPlacement[];

/** Props for the UserInput component */
export type UserInputProps = {
  onSubmit: (intention: string) => void;   // Callback for handling user submission
  placeholder?: string;                   // Optional custom placeholder text
  defaultValue?: string;                  // Optional default value for the input
  validateInput?: (input: string) => boolean; // Optional validation function for the input
};