"use client";

import React, { useState } from "react";
import UserInput from "./components/UserInput";
import TarotDisplay from "./components/TarotDisplay";
import { Spread } from "../lib/types";
import { createPastPresentFutureSpread } from "../lib/Spreads";
import { defaultDeck } from "../lib/TarotDecks";

export default function Home() {
  const [intention, setIntention] = useState<string>("");
  const [spread, setSpread] = useState<Spread | null>(null);

  const handleSetIntention = (userIntention: string) => {
    setIntention(userIntention);
    const spreadClass = createPastPresentFutureSpread(); // A TarotSpread instance
    const generatedSpread = spreadClass.draw(defaultDeck);
    setSpread(generatedSpread);
  };

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">AI Tarot Reading App</h1>
      <UserInput onSubmit={handleSetIntention} />
      {spread && <TarotDisplay spread={spread} intention={intention} />}
    </main>
  );
}