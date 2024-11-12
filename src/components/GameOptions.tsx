"use client";

import { FC } from "react";
import { useGameStore } from "@/store/gameStore";

const GameOptions: FC = () => {
  const { initializeGame } = useGameStore();

  return (
    <div className="mb-4 flex gap-2">
      <button
        onClick={initializeGame}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Randomize
      </button>
    </div>
  );
};

export default GameOptions;
