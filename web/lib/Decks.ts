import { Deck, Card } from "./types";

// Default tarot cards (major arcana)
const defaultCards: Card[] = [
    { name: "The Fool", description: "New beginnings, fresh starts." },
    { name: "The Magician", description: "Manifestation, resourcefulness." },
    { name: "The High Priestess", description: "Intuition, sacred knowledge." },
    { name: "The Empress", description: "Abundance, creation, fertility." },
    { name: "The Emperor", description: "Authority, structure, stability." },
    { name: "The Lovers", description: "Love, union, choices." },
    { name: "The Chariot", description: "Control, willpower, determination." },
    { name: "Strength", description: "Courage, inner strength, compassion." },
    { name: "The Hermit", description: "Introspection, inner guidance." },
    { name: "Wheel of Fortune", description: "Cycles, luck, destiny." },
    { name: "Justice", description: "Truth, fairness, law." },
    { name: "Death", description: "Transformation, endings and beginnings." },
    { name: "Temperance", description: "Balance, moderation, harmony." },
    { name: "The Devil", description: "Addiction, materialism, limitation." },
    { name: "The Tower", description: "Upheaval, sudden change, chaos." },
    { name: "The Star", description: "Hope, inspiration, renewal." },
    { name: "The Moon", description: "Illusion, intuition, the subconscious." },
    { name: "The Sun", description: "Success, positivity, joy." },
    { name: "Judgement", description: "Reflection, reckoning, awakening." },
    { name: "The World", description: "Completion, accomplishment, fulfillment." },
];

// Default tarot deck
export const defaultDeck: Deck = {
    name: "Default Tarot Deck",
    description: "A classic tarot deck containing 22 major arcana cards.",
    cards: defaultCards,
};