'use client';

import React, { useState } from "react";
import { UserInputProps } from "../../lib/types";

const UserInput: React.FC<UserInputProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start">
      <label htmlFor="intention" className="mb-2">
        Enter Your Intention:
      </label>
      <input
        id="intention"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default UserInput;