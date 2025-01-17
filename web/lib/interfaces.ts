//
// DOMAIN LAYER INTERFACES
//

/** Interface for decks */
export interface IDeck<TCard> {
    name: string;        // Name of the deck
    description: string; // Description of the deck
    cards: TCard[];      // Cards in the deck
}

/** Interface for spread data */
export interface ISpreadData<TCard> {
    layout: { type: string; positions: string[] }; // Spread layout definition
    cards: TCard[];                               // Cards assigned positions in the spread
}

/** Interface for generating spreads */
export interface ISpread<TCard> {
    /**
     * Draw cards from a deck to create a new spread.
     * @param deck - The deck to draw cards from.
     * @returns A new spread object.
     */
    draw(deck: IDeck<TCard>): ISpreadData<TCard>;
}

//
// AI & RAG LAYER INTERFACES
//

/** Interface for defining a reading service (local, remote, etc.) */
export interface IReadingService<TConfig> {
    /**
     * Fetch a reading based on the final AI prompt.
     * @param finalPrompt - The processed prompt ready for AI generation.
     * @returns The AI-generated reading as a string.
     */
    fetchReading(finalPrompt: string): Promise<string>;

    /**
     * 
     * @param finalPrompt - The processed prompt ready for AI generation.
     * @returns A readable stream of the AI-generated response.
     */
    fetchReadingStream(finalPrompt: string): Promise<ReadableStream>;

    /**
     * Configure the reading service with necessary settings.
     * @param config - Configuration specific to the service.
     */
    configure(config?: TConfig): void;
}

/** Interface for defining a RAG service (retrieving context from external sources) */
export interface IRAGService {
    /**
     * Retrieve relevant context based on the user's intention.
     * @param userIntention - The user's input/question for the reading.
     * @returns An array of context snippets.
     */
    retrieveContext(userIntention: string): Promise<string[]>;
}

/** Interface for defining a prompt engineering service */
export interface IPromptEngineeringService<TSpread> {
    /**
     * Build the final AI prompt by combining user intention, spread details, and retrieved context.
     * @param userIntention - The user's question or intention for the reading.
     * @param spread - The spread details to include in the prompt.
     * @param contextSnippets - Context snippets retrieved via RAG.
     * @param toneType - Optional tone styling for the AI output.
     * @returns A string representing the complete AI prompt.
     */
    buildPrompt(
        userIntention: string,
        spread: TSpread,
        contextSnippets: string[],
        toneType?: string
    ): string;
}

//
// UI RENDERING INTERFACES
//

/** Interface for rendering a spread into UI-ready data */
export interface ISpreadRenderer<TSpread, TRenderedSpread> {
    /**
     * Render a given spread into a layout suitable for display.
     * @param spread - The spread to render.
     * @returns A RenderedSpread containing layout/positioning information for display.
     */
    renderSpread(spread: TSpread): TRenderedSpread;
}

/** Prop interface for rendering a tarot spread in the UI */
export interface ITarotDisplayProps<Tspread, TRenderedSpread> {
    spread: Tspread;
    intention: string;
    renderer: ISpreadRenderer<Tspread, TRenderedSpread>;
}

/** Prop interface for streamed response component */
export interface IStreamedReadingProps {
    stream: ReadableStream<Uint8Array>;
    loading: boolean;
}