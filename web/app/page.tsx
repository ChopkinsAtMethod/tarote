"use client"; 

import React, { useState } from "react";
import UserInput from "../app/components/UserInput";
import TarotDisplay from "../app/components/TarotDisplay";
import { Spread } from "../lib/types";
import { createPastPresentFutureSpread, createCelticCrossSpread } from "../lib/Spreads/Tarot";
import { SpreadLayoutRenderer } from "../lib/renderers/SpreadLayoutRenderer";
import { CelticCrossRenderer } from "../lib/renderers/CelticCrossRenderer";
import { defaultDeck } from "../lib/Decks";

export default function Home() {
  const [intention, setIntention] = useState<string>("");
  const [spread, setSpread] = useState<Spread | null>(null);
  const [renderer, setRenderer] = useState<"SpreadLayoutRenderer" | "CelticCrossRenderer">(
    "SpreadLayoutRenderer"
  );

  const handleSetIntention = (userIntention: string) => {
    setIntention(userIntention);
  };

  const handleGenerateSpread = () => {
    const spreadClass =
      renderer === "SpreadLayoutRenderer"
        ? createPastPresentFutureSpread()
        : createCelticCrossSpread();
    const generatedSpread = spreadClass.draw(defaultDeck);
    setSpread(generatedSpread);
  };

  const handleRendererChange = (selectedRenderer: "SpreadLayoutRenderer" | "CelticCrossRenderer") => {
    setRenderer(selectedRenderer);
    setSpread(null); // Clear the spread when switching the renderer
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
        <TarotDisplay
          spread={spread}
          intention={intention}
          renderer={getRendererInstance()} // Pass the dynamically selected renderer
        />
      )}
    </main>
  );
}