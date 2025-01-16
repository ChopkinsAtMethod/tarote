"use client";

import React, { useState } from "react";
import { UserInputProps } from "@lib/types"; // Updated relative path

const UserInput: React.FC<UserInputProps> = ({
  onSubmit,
  placeholder = "Enter your intention...", // Default placeholder
  defaultValue = "",                       // Default value (optional)
  validateInput,                           // Optional validation
}) => {
  const [input, setInput] = useState<string>(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return; // Ensure input is not empty
    if (validateInput && !validateInput(input.trim())) {
      alert("Invalid input. Please try again.");
      return;
    }
    onSubmit(input.trim());
    setInput(""); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 w-full max-w-md">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default UserInput;