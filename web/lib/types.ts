// Represents a tarot card
export interface Card {
    name: string;
    description: string;
    position: "past" | "present" | "future";
  }
  
  // Represents a tarot spread
  export interface Spread {
    type: string;
    cards: Card[];
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