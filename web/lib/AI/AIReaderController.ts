import { IRAGService, IReadingService, IPromptEngineeringService } from "@lib/interfaces";
import { Spread } from "@lib/types";

export class AIReaderController<TConfig> {
    private ragService: IRAGService;
    private readingService: IReadingService<TConfig>;
    private promptService: IPromptEngineeringService<Spread>;
    private ragTimeoutMs: number;

    constructor(
        ragService: IRAGService,
        readingService: IReadingService<TConfig>,
        promptService: IPromptEngineeringService<Spread>,
        ragTimeoutMs: number = 5000 // Default timeout for RAG
    ) {
        this.ragService = ragService;
        this.readingService = readingService;
        this.promptService = promptService;
        this.ragTimeoutMs = ragTimeoutMs;
    }

    /**
     * Orchestrates the process of generating an AI reading with dynamic RAG updates.
     * @param userIntention - The user's input/question for the reading.
     * @param spread - The completed spread containing drawn cards.
     * @param toneType - Optional tone style for the AI response.
     * @returns A readable stream of the AI-generated response.
     */
    async fetchAIReading(
        userIntention: string,
        spread: Spread,
        toneType?: string
    ): Promise<ReadableStream> {
        let ragContext: string[] = [];

        try {
            // Start RAG with a timeout
            const ragPromise = this.ragService.retrieveContext(userIntention);
            const ragTimeout = new Promise<string[]>((_, reject) =>
                setTimeout(() => reject(new Error("RAG timeout")), this.ragTimeoutMs)
            );

            ragContext = await Promise.race([ragPromise, ragTimeout]);
        } catch (error) {
            console.warn("RAG failed or timed out:", error);
        }

        const initialPrompt = this.promptService.buildPrompt(userIntention, spread, ragContext, toneType);
        console.log("Initial prompt:", initialPrompt);
        return this.readingService.fetchReadingStream(initialPrompt);
    }
}
