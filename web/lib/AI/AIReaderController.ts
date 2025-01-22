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
        ragTimeoutMs: number = 5000
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
            const ragPromise = this.ragService.retrieveContext(userIntention);
            const timeoutPromise = new Promise<string[]>((_, reject) =>
                setTimeout(() => reject(new Error("RAG_TIMEOUT")), this.ragTimeoutMs)
            );

            ragContext = await Promise.race([ragPromise, timeoutPromise]);
        } catch (error) {
            if (error instanceof Error && error.message === "RAG_TIMEOUT") {
                console.info("[RAG] Context retrieval timed out, proceeding without context");
            } else {
                console.warn("[RAG] Context retrieval encountered an issue, proceeding without context");
            }
            ragContext = [];
        }

        const initialPrompt = this.promptService.buildPrompt(userIntention, spread, ragContext, toneType);
        console.debug("[Prompt] Generated:", initialPrompt);
        return this.readingService.fetchReadingStream(initialPrompt);
    }
}