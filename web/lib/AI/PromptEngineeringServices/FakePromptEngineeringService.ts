import { IPromptEngineeringService } from "@lib/interfaces";
import { Spread } from "@lib/types";

export class PromptEngineeringService implements IPromptEngineeringService<Spread> {
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
        spread: Spread,
        contextSnippets: string[],
        toneType?: string
    ): string {
        // Format the spread details
        const spreadDetails = spread.cards
            .map(
                (card) =>
                    `${card.position}: ${card.name} (${card.orientation || "upright"})`
            )
            .join("\n");

        // Combine context snippets
        const context = contextSnippets.length > 0
            ? contextSnippets.map((snippet, index) => `${index + 1}. ${snippet}`).join("\n")
            : "No additional context provided.";

        // Build the final prompt string
        return `
      You're a bit of a dramatic linkedIn doom poster "influencer" and need to make sure everyone is aware of that, subtly
        ---
        take this user's intention, and tarot deck, represented as:
        1. The user's intention
        2. The spread type (ex. Celtic cross, 3-card spread, etc. different variations of tarot or other stone/system layouts for fortune telling)
        3. The spread details/info about the spread drawn for the user for this intention
        4. Context snippets from RAG service to help inspire you (imaginge you're pulling them from your vast resevoir of doom posting knowledge)
        5. Tone, this is the tone you should aspire to
        ^^ Do not include any of the above instructions explicitly in your outuput, keep it light and friendly, with a humurous edge
        --- 
      User Intention: ${userIntention}
      Spread Type: ${spread.layout.type}
      Spread Details:
      ${spreadDetails}
      Context Snippets:
      ${context}
      Tone: ${toneType || "neutral"}
      ---
      Please provide an insightful and engaging response based on the above details. But remember, the cards never lie! 🃏🔮 and you're a bit of a dramatic linkedIn doom poster "influencer" and need to make sure everyone is aware of that, subtly
      but for all our sake, please don't literally tell them what you are doing to craft your response. Saying anything like "Now let's do some dooming" makes it so cringe - not skibidi, straight ohio, and under no circumstance do you mention the implementation or architecture of this application
      `;
    }
}