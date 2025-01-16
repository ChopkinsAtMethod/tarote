"use client";

import React, { useEffect, useState } from "react";
import { IStreamedReadingProps } from "@lib/interfaces";

const StreamedReading: React.FC<IStreamedReadingProps> = ({ stream, loading }) => {
  const [reading, setReading] = useState<string>("");

  useEffect(() => {
    if (!stream || stream.locked) {
      console.warn("Stream is either unavailable or already locked.");
      return;
    }

    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let isCancelled = false;

    const readStream = async () => {
      try {
        let buffer = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done || isCancelled) break;

          buffer += decoder.decode(value, { stream: true });

          const boundary = buffer.lastIndexOf("\n");
          if (boundary !== -1) {
            const jsonLines = buffer.slice(0, boundary).split("\n");
            buffer = buffer.slice(boundary + 1);

            for (const line of jsonLines) {
              try {
                const json = JSON.parse(line);
                if (json.response) {
                  setReading((prev) => prev + json.response);
                }
              } catch (err) {
                console.error("Error parsing JSON line:", err);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error reading stream:", error);
      } finally {
        reader.releaseLock();
      }
    };

    readStream();

    return () => {
      isCancelled = true;
      reader.cancel().catch((error) => console.error("Error cancelling reader:", error));
    };
  }, [stream]);

  const handleClear = () => setReading(""); // Reset the reading output

  return (
    <div className="mt-4 p-4 border rounded shadow">
      <h3 className="text-lg font-bold">AI Reading</h3>
      {loading ? (
        <p className="text-gray-500">Generating your reading...</p>
      ) : (
        <div>
          <p className="text-gray-700 whitespace-pre-line">{reading}</p>
          {reading && (
            <button
              onClick={handleClear}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Clear Output
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StreamedReading;