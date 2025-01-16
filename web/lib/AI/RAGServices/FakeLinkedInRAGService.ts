import { IRAGService } from "@lib/interfaces";

export class FakeLinkedInRAGService implements IRAGService {
    private posts: string[];

    constructor() {
        this.posts = [
            "AI is coming for us all. Forget learning to code; learn to adapt or perish.",
            "The era of job security is dead. If you're not pivoting, you're already obsolete.",
            "Innovation used to be a choice; now it's survival. Get on board or get left behind.",
            "Your job isn't safe, no matter what industry you're in. Prepare for the AI takeover.",
            "The only certainty about the future is uncertainty. Build resilience or crumble.",
            "If you're not thinking about how to AI-proof your career, you're already a relic.",
            "It's not just about working harder anymore—it's about working with machines to stay relevant.",
            "The rate of change in tech is exponential. Blink, and you'll miss the future.",
            "In five years, half of today's jobs will be gone. What are you doing about it?",
            "We're not just automating tasks; we're automating entire industries. Adapt now.",
        ];
    }

    /**
     * Retrieves a random selection of doom-laden LinkedIn-style posts.
     * @param userIntention - The user's intention for the reading (unused in this mock implementation).
     * @returns An array of posts as simulated context.
     */
    async retrieveContext(userIntention: string): Promise<string[]> {
        console.log("Retrieving context for RAG:", userIntention);
        const selectedPosts = this.getRandomPosts(3); // Fetch 3 random posts
        console.log("Retrieved context for RAG:", selectedPosts);
        return selectedPosts;
    }

    /**
     * Helper method to get a random selection of posts.
     * @param count - Number of posts to retrieve.
     * @returns An array of randomly selected posts.
     */
    private getRandomPosts(count: number): string[] {
        return this.posts
            .sort(() => Math.random() - 0.5) // Shuffle posts
            .slice(0, count); // Pick the first `count` posts
    }
}