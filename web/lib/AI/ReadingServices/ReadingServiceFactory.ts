import { IReadingService } from "@lib/interfaces";
import { LocalOllamaReadingService } from "./LocalOllamaReadingService";
import { OllamaReadingServiceConfig } from "@lib/types";

export class ReadingServiceFactory {
    static create(type: "local", config: OllamaReadingServiceConfig): IReadingService<OllamaReadingServiceConfig> {
        switch (type) {
            case "local":
                const localService = new LocalOllamaReadingService();
                localService.configure(config);
                return localService;
            default:
                throw new Error(`Unknown reading service type: ${type}`);
        }
    }
}