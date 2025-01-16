"use client";

import React from "react";
import { Spread, RenderedSpread } from "@lib/types";
import { ITarotDisplayProps } from "@lib/interfaces";

const TarotDisplay: React.FC<ITarotDisplayProps<Spread, RenderedSpread>> = ({ spread, intention, renderer }) => {
  const renderedSpread: RenderedSpread = renderer.renderSpread(spread);

  return (
    <section className="mt-6">
      <h2 className="text-xl font-bold">Your Tarot Spread</h2>
      <p className="text-gray-700 mb-4">Intention: {intention}</p>
      <div
        className="relative"
        style={{
          width: "600px",
          height: "600px",
          position: "relative",
        }}
      >
        {renderedSpread.map((placement, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${placement.x}px`,
              top: `${placement.y}px`,
              zIndex: placement.z ?? 1,
              transform: placement.rotation ? `rotate(${placement.rotation}deg)` : undefined,
              width: "120px",
              height: "180px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
              padding: "8px",
              textAlign: "center",
              fontSize: "14px",
              overflow: "hidden",
            }}
          >
            <p className="font-bold">{spread.cards[index].name}</p>
            <p className="text-sm">{spread.cards[index].description}</p>
            <p className="text-xs text-gray-500">
              {spread.cards[index].position} - {spread.cards[index].orientation}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TarotDisplay;