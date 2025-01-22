import { Deck, Card } from "./types";

// Default tarot cards (major arcana)
const defaultCards: Card[] = [
    { name: "The Fool", description: "New beginnings, fresh starts." },
    { name: "The Magician", description: "Manifestation, resourcefulness." },
    { name: "The High Priestess", description: "Intuition, sacred knowledge." },
    { name: "The Empress", description: "Abundance, creation, fertility." },
    { name: "The Emperor", description: "Authority, structure, stability." },
    { name: "The Hierophant", description: "Tradition, conformity, morality." },
    { name: "The Lovers", description: "Love, union, choices." },
    { name: "The Chariot", description: "Control, willpower, determination." },
    { name: "Strength", description: "Courage, inner strength, compassion." },
    { name: "The Hermit", description: "Introspection, inner guidance." },
    { name: "Wheel of Fortune", description: "Cycles, luck, destiny." },
    { name: "Justice", description: "Truth, fairness, law." },
    { name: "The Hanged Man", description: "Surrender, new perspective, letting go." },
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

const minorArcanaCards: Card[] = [
    // Wands
    { name: "Ace of Wands", description: "Inspiration, new opportunities, growth." },
    { name: "Two of Wands", description: "Future planning, progress, decisions." },
    { name: "Three of Wands", description: "Expansion, foresight, overseas opportunities." },
    { name: "Four of Wands", description: "Celebration, harmony, marriage, homecoming." },
    { name: "Five of Wands", description: "Conflict, disagreements, competition." },
    { name: "Six of Wands", description: "Victory, success, public recognition." },
    { name: "Seven of Wands", description: "Challenge, competition, perseverance." },
    { name: "Eight of Wands", description: "Speed, action, air travel." },
    { name: "Nine of Wands", description: "Resilience, grit, last stand." },
    { name: "Ten of Wands", description: "Burden, responsibility, hard work." },
    { name: "Page of Wands", description: "Exploration, excitement, freedom." },
    { name: "Knight of Wands", description: "Energy, passion, adventure." },
    { name: "Queen of Wands", description: "Courage, confidence, independence." },
    { name: "King of Wands", description: "Leadership, vision, entrepreneur." },

    // Cups
    { name: "Ace of Cups", description: "Love, new relationships, compassion." },
    { name: "Two of Cups", description: "Unified love, partnership, mutual attraction." },
    { name: "Three of Cups", description: "Celebration, friendship, creativity." },
    { name: "Four of Cups", description: "Apathy, contemplation, disconnectedness." },
    { name: "Five of Cups", description: "Loss, grief, self-pity." },
    { name: "Six of Cups", description: "Familiarity, happy memories, healing." },
    { name: "Seven of Cups", description: "Opportunity, choices, wishful thinking." },
    { name: "Eight of Cups", description: "Disappointment, abandonment, withdrawal." },
    { name: "Nine of Cups", description: "Contentment, satisfaction, emotional stability." },
    { name: "Ten of Cups", description: "Fulfillment, harmony, family." },
    { name: "Page of Cups", description: "Creativity, intuition, sensitivity." },
    { name: "Knight of Cups", description: "Romance, charm, imagination." },
    { name: "Queen of Cups", description: "Compassion, emotional support, intuition." },
    { name: "King of Cups", description: "Emotional balance, compassion, diplomacy." },

    // Swords
    { name: "Ace of Swords", description: "Breakthrough, clarity, new ideas." },
    { name: "Two of Swords", description: "Difficult decisions, indecision, stalemate." },
    { name: "Three of Swords", description: "Heartbreak, emotional pain, sorrow." },
    { name: "Four of Swords", description: "Rest, relaxation, meditation." },
    { name: "Five of Swords", description: "Conflict, tension, loss." },
    { name: "Six of Swords", description: "Transition, leaving behind, moving on." },
    { name: "Seven of Swords", description: "Deception, betrayal, getting away with something." },
    { name: "Eight of Swords", description: "Isolation, self-imposed restriction, imprisonment." },
    { name: "Nine of Swords", description: "Anxiety, worry, fear." },
    { name: "Ten of Swords", description: "Betrayal, back-stabbing, defeat." },
    { name: "Page of Swords", description: "Curiosity, restlessness, mental energy." },
    { name: "Knight of Swords", description: "Ambition, aggression, drive." },
    { name: "Queen of Swords", description: "Clarity, objective, truth." },
    { name: "King of Swords", description: "Intellect, authority, truth." },

    // Pentacles
    { name: "Ace of Pentacles", description: "New financial opportunity, prosperity, abundance." },
    { name: "Two of Pentacles", description: "Balance, adaptability, time management." },
    { name: "Three of Pentacles", description: "Teamwork, collaboration, learning." },
    { name: "Four of Pentacles", description: "Financial stability, control, saving." },
    { name: "Five of Pentacles", description: "Hard times, financial loss, poverty." },
    { name: "Six of Pentacles", description: "Generosity, charity, giving and receiving." },
    { name: "Seven of Pentacles", description: "Long-term view, sustainable results, perseverance." },
    { name: "Eight of Pentacles", description: "Apprenticeship, mastery, skill development." },
    { name: "Nine of Pentacles", description: "Abundance, luxury, self-sufficiency." },
    { name: "Ten of Pentacles", description: "Wealth, inheritance, family." },
    { name: "Page of Pentacles", description: "Opportunity, manifestation, new financial opportunity." },
    { name: "Knight of Pentacles", description: "Hard work, productivity, routine." },
    { name: "Queen of Pentacles", description: "Nurturing, practical, providing financially." },
    { name: "King of Pentacles", description: "Wealth, abundance, leadership." },
];

export const fullDeck: Deck = {
    name: "Complete Tarot Deck",
    description: "A full 78-card tarot deck including the major and minor arcana.",
    cards: [...defaultCards, ...minorArcanaCards]
};

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
