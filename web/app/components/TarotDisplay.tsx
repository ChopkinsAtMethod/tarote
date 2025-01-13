import React from "react";
import { TarotDisplayProps } from "../../lib/types";

const TarotDisplay: React.FC<TarotDisplayProps> = ({ spread, intention }) => {
  return (
    <section className="mt-6">
      <h2 className="text-xl font-bold">Your Tarot Spread</h2>
      <p className="text-gray-700 mb-4">Intention: {intention}</p>
      <div className="grid gap-4">
        {spread.cards.map((card, index) => (
          <div key={index} className="border rounded p-4 shadow">
            <h3 className="text-lg font-semibold">{card.name}</h3>
            <p className="text-gray-500">Position: {card.position}</p>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TarotDisplay;