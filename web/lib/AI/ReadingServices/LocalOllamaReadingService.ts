import { IReadingService } from "@lib/interfaces";
import { OllamaReadingServiceConfig } from "@lib/types";

export class LocalOllamaReadingService implements IReadingService<OllamaReadingServiceConfig> {
    private endpoint = "http://127.0.0.1:11434";
    private config: OllamaReadingServiceConfig | null = null;

    /**
     * Configure the service with an endpoint and model settings.
     * @param config - Configuration object for the Ollama API.
     */
    configure(config: OllamaReadingServiceConfig): void {
        this.endpoint = config.endpoint || this.endpoint;
        this.config = config;
    }

    /**
     * Fetch a reading based on the final AI prompt.
     * @param finalPrompt - The processed prompt ready for AI generation.
     * @returns The AI-generated reading as a string.
     */
    async fetchReading(finalPrompt: string): Promise<string> {
        // For simplicity, reuse the stream method and concatenate the stream output.
        const stream = await this.fetchReadingStream(finalPrompt);
        const reader = stream.getReader();
        let result = "";
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });
        }

        return result.trim();
    }

    /**
     * Fetch a reading as a stream based on the final AI prompt.
     * @param finalPrompt - The processed prompt ready for AI generation.
     * @returns A readable stream of the AI-generated response.
     */
    async fetchReadingStream(finalPrompt: string): Promise<ReadableStream> {
        if (!this.endpoint || !this.config?.model) {
            throw new Error("OllamaReadingService is not properly configured.");
        }

        const payload = {
            model: this.config.model,
            prompt: finalPrompt,
        };

        const response = await fetch("/api/proxy/ollama", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch from Ollama: ${response.statusText}`);
        }

        if (!response.body) {
            throw new Error("No response body from Ollama.");
        }

        // Return the readable stream
        return response.body;
    }
}