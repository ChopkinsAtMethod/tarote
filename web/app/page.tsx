"use client";

import React, { useState } from "react";
import UserInput from "../app/components/UserInput";
import TarotDisplay from "../app/components/TarotDisplay";
import StreamedReading from "./components/StreamReading";
import { Spread } from "../lib/types";
import { createPastPresentFutureSpread, createCelticCrossSpread } from "../lib/Spreads/Tarot";
import { SpreadLayoutRenderer } from "../lib/renderers/SpreadLayoutRenderer";
import { CelticCrossRenderer } from "../lib/renderers/CelticCrossRenderer";
import { defaultDeck } from "../lib/Decks";
import { aiReaderController } from "../lib/AI/AIService";

export default function Home() {
  const [intention, setIntention] = useState<string>("");
  const [spread, setSpread] = useState<Spread | null>(null);
  const [renderer, setRenderer] = useState<"SpreadLayoutRenderer" | "CelticCrossRenderer">(
    "SpreadLayoutRenderer"
  );
  const [stream, setStream] = useState<ReadableStream<Uint8Array> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSetIntention = (userIntention: string) => {
    setIntention(userIntention);
    setStream(null);
    setError(null);
  };

  const handleGenerateSpread = () => {
    const spreadClass =
      renderer === "SpreadLayoutRenderer"
        ? createPastPresentFutureSpread()
        : createCelticCrossSpread();
    const generatedSpread = spreadClass.draw(defaultDeck);
    setSpread(generatedSpread);
    setStream(null);
    setError(null);
  };

  const handleRendererChange = (selectedRenderer: "SpreadLayoutRenderer" | "CelticCrossRenderer") => {
    setRenderer(selectedRenderer);
    setSpread(null);
    setStream(null);
    setError(null);
  };

  const handleFetchAIReading = async () => {
    if (!spread || !intention) {
      alert("Please generate a spread and set an intention first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const stream = await aiReaderController.fetchAIReading(intention, spread, "humorous, self-absorbed, aloof, endearing, oblivious");
      setStream(stream);
    } catch (err) {
      console.error("Failed to fetch AI reading:", err);
      setError("Error fetching AI reading. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRendererInstance = () => {
    return renderer === "SpreadLayoutRenderer"
      ? new SpreadLayoutRenderer()
      : new CelticCrossRenderer();
  };

  const validateIntention = (input: string) => input.length > 3;

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">AI Tarot Reading App</h1>
      <UserInput
        onSubmit={handleSetIntention}
        placeholder="What's your question for the cards?"
        validateInput={validateIntention}
      />
      <div className="flex flex-col items-center mt-4">
        <label htmlFor="spread-select" className="mb-2 text-lg font-medium">
          Select a Spread:
        </label>
        <select
          id="spread-select"
          value={renderer}
          onChange={(e) =>
            handleRendererChange(e.target.value as "SpreadLayoutRenderer" | "CelticCrossRenderer")
          }
          className="p-2 border border-gray-300 rounded mb-4"
        >
          <option value="SpreadLayoutRenderer">Past-Present-Future</option>
          <option value="CelticCrossRenderer">Celtic Cross</option>
        </select>
        <button
          onClick={handleGenerateSpread}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Generate Spread
        </button>
      </div>
      {spread && (
        <>
          <TarotDisplay spread={spread} intention={intention} renderer={getRendererInstance()} />
          <div className="mt-4">
            <button
              onClick={handleFetchAIReading}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Generating Reading..." : "Get AI Reading"}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </>
      )}
      {stream && <StreamedReading stream={stream} loading={loading} />}
    </main>
  );
}