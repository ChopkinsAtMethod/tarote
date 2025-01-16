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

// Define the 24 Elder Futhark runes
const runeCards: Card[] = [
    { name: "Fehu", description: "Wealth, prosperity, abundance." },
    { name: "Uruz", description: "Strength, endurance, physical health." },
    { name: "Thurisaz", description: "Protection, challenges, defense." },
    { name: "Ansuz", description: "Communication, wisdom, inspiration." },
    { name: "Raidho", description: "Journey, movement, travel." },
    { name: "Kenaz", description: "Knowledge, illumination, creativity." },
    { name: "Gebo", description: "Gift, generosity, balance in relationships." },
    { name: "Wunjo", description: "Joy, harmony, success." },
    { name: "Hagalaz", description: "Disruption, transformation, trial." },
    { name: "Nauthiz", description: "Need, hardship, resistance." },
    { name: "Isa", description: "Stillness, pause, patience." },
    { name: "Jera", description: "Harvest, reward for effort, cycles." },
    { name: "Eihwaz", description: "Strength, endurance, protection." },
    { name: "Perthro", description: "Mystery, fate, secrets." },
    { name: "Algiz", description: "Protection, spirituality, connection to higher powers." },
    { name: "Sowilo", description: "Success, vitality, wholeness." },
    { name: "Tiwaz", description: "Honor, justice, leadership." },
    { name: "Berkano", description: "Growth, fertility, renewal." },
    { name: "Ehwaz", description: "Teamwork, trust, movement." },
    { name: "Mannaz", description: "The self, human interaction, society." },
    { name: "Laguz", description: "Intuition, flow, emotions." },
    { name: "Ingwaz", description: "Fertility, gestation, internal growth." },
    { name: "Dagaz", description: "Breakthrough, transformation, awakening." },
    { name: "Othala", description: "Heritage, home, legacy." },
];

// Create the rune deck
export const runeDeck: Deck = {
    name: "Rune Deck",
    description: "A deck based on the 24 Elder Futhark runes used for divination and guidance.",
    cards: runeCards,
};
