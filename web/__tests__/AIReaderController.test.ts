import { AIReaderController } from "@lib/AI/AIReaderController";
import { IRAGService, IReadingService, IPromptEngineeringService } from "@lib/interfaces";
import { Spread } from "@lib/types";

// Mock implementations
class MockRAGService implements IRAGService {
    async retrieveContext(userIntention: string = "mock context 3"): Promise<string[]> {
        return Promise.resolve(["mock context 1", "mock context 2", userIntention]);
    }
}

class MockPromptService implements IPromptEngineeringService<Spread> {
    buildPrompt(
        _userIntention: string,
        _spread: Spread,
        contextSnippets: string[]
    ): string {
        return `Mock prompt with ${contextSnippets.length} context snippets`;
    }
}

class MockReadingService implements IReadingService<string> {
    configure(
    ): void {
    }

    async fetchReading(_finalPrompt: string): Promise<string> {
        console.log(_finalPrompt)
        return "Mock reading response";
    }

    async fetchReadingStream(_finalPrompt: string): Promise<ReadableStream> {
        console.log(_finalPrompt)
        return new ReadableStream({
            start(controller) {
                const encoder = new TextEncoder();
                controller.enqueue(encoder.encode("Mock stream response"));
                controller.close();
            }
        });
    }
}

describe("AIReaderController", () => {
    let controller: AIReaderController<string>;
    let ragService: MockRAGService;
    let promptService: MockPromptService;
    let readingService: MockReadingService;

    const mockSpread: Spread = {
        layout: { type: "test", positions: ["pos1", "pos2"] },
        cards: [
            { name: "Card1", description: "Desc1", position: "pos1", orientation: "upright" },
            { name: "Card2", description: "Desc2", position: "pos2", orientation: "upright" }
        ]
    };

    beforeEach(() => {
        ragService = new MockRAGService();
        promptService = new MockPromptService();
        readingService = new MockReadingService();

        // Spy on service methods
        jest.spyOn(ragService, "retrieveContext");
        jest.spyOn(promptService, "buildPrompt");
        jest.spyOn(readingService, "fetchReadingStream");

        controller = new AIReaderController(
            ragService,
            readingService,
            promptService,
            1000 // Short timeout for testing
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("successfully generates reading with RAG context", async () => {
        const stream = await controller.fetchAIReading(
            "test intention",
            mockSpread,
            "test tone"
        );

        expect(ragService.retrieveContext).toHaveBeenCalledWith("test intention");
        expect(promptService.buildPrompt).toHaveBeenCalledWith(
            "test intention",
            mockSpread,
            expect.arrayContaining(["mock context 1", "mock context 2"]),
            "test tone"
        );
        expect(readingService.fetchReadingStream).toHaveBeenCalled();
        expect(stream).toBeInstanceOf(ReadableStream);
    });

    test("continues with reading when RAG times out", async () => {
        // Mock RAG service to simulate timeout
        jest.spyOn(ragService, "retrieveContext").mockImplementation(
            () => new Promise(resolve => setTimeout(resolve, 2000))
        );

        const stream = await controller.fetchAIReading(
            "test intention",
            mockSpread
        );

        expect(promptService.buildPrompt).toHaveBeenCalled();
        expect(readingService.fetchReadingStream).toHaveBeenCalled();
        expect(stream).toBeInstanceOf(ReadableStream);
    });

    test("handles reading service failure", async () => {
        jest.spyOn(readingService, "fetchReadingStream").mockRejectedValue(
            new Error("Reading service failed")
        );

        await expect(
            controller.fetchAIReading("test intention", mockSpread)
        ).rejects.toThrow("Reading service failed");
    });
});