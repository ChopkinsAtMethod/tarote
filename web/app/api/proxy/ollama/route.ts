import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { prompt, model } = body;

        if (!prompt || !model) {
            return NextResponse.json(
                { error: "Missing required parameters: prompt and model" },
                { status: 400 }
            );
        }

        const ollamaResponse = await fetch("http://127.0.0.1:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, model }),
        });

        console.log("Ollama response body is readable stream:", ollamaResponse.body instanceof ReadableStream);

        // Stream the response directly to the client
        return new NextResponse(ollamaResponse.body, {
            status: ollamaResponse.status,
            headers: ollamaResponse.headers,
        });
    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}