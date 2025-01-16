# **Tarote (working name)**

Welcome to the **AI Tarot Reading App**, an app that combines the mystical world of Tarot with the cutting-edge capabilities of AI to generate insightful, dynamic, and (hopefully) fun readings.

---

## **Features**

- **Dynamic Tarot Spreads**: Choose between popular spreads like:
  - **Past-Present-Future**
  - **Celtic Cross**
- **AI-Generated Readings**: Input your intention, and let the AI interpret your spread in a chosen tone.
- **Streamed Responses**: See the AI's interpretation appear in real-time as it generates the reading.

---

## **How It Works**

1. **Set Your Intention**: Ask a question or set the context for your reading.
2. **Select a Spread**: Choose the type of spread to use for your Tarot cards.
3. **Generate a Spread**: Cards are drawn randomly from a predefined deck and displayed.
4. **Get an AI Reading**: The AI analyzes the spread and provides an interpretation, streamed in real-time.

---

## **Tech Stack**

- **Frontend**: [Next.js 15](https://nextjs.org/)
  - **TypeScript** for type safety
  - **React** for state management
- **Backend**:
  - **Ollama API** for AI-powered text generation
  - **Extension** other backend services to expand feature set
  - **Custom Proxy** using Next.js API routes
- **Design**: Tailwind CSS for a clean, modern UI, placeholding

---

## **Folder Structure**

```plaintext
umlSpecs/
web/
├── app/
│   ├── components/
│   │   ├── UserInput.tsx
│   │   ├── TarotDisplay.tsx
│   │   └── StreamReading.tsx
│   ├── api/
│   │   └── proxy/
│   │       └── ollama/
│   │           └── route.ts
│   └── page.tsx
├── lib/
│   ├── AI/
│   │   ├── AIService.ts
│   │   ├── ReadingServices/
│   │   │   └── LocalOllamaReadingService.ts
│   │   ├── PromptEngineeringService.ts
│   │   └── RAGService.ts
│   ├── Decks/
│   │   └── defaultDeck.ts
│   ├── Spreads/
│   │   └── Tarot.ts
│   ├── renderers/
│   │   ├── SpreadLayoutRenderer.ts
│   │   └── CelticCrossRenderer.ts
│   ├── interfaces.ts
│   └── types.ts
└── README.md
```
