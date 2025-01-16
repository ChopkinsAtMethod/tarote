import { AIReaderController } from "@lib/AI/AIReaderController";
import { FakeLinkedInRAGService } from "@lib/AI/RAGServices/FakeLinkedInRAGService";
import { LocalOllamaReadingService } from "@lib/AI/ReadingServices/LocalOllamaReadingService";
import { PromptEngineeringService } from "@lib/AI/PromptEngineeringServices/FakePromptEngineeringService";

const ragService = new FakeLinkedInRAGService();
const readingService = new LocalOllamaReadingService();
readingService.configure({
    endpoint: "http://127.0.0.1:11434",
    model: "wizardlm2",
    suffix: "Aint no thang hun",
    stream: false,
    options: {}, // Optional: Customize based on your needs
});
const promptService = new PromptEngineeringService();

export const aiReaderController = new AIReaderController(ragService, readingService, promptService);