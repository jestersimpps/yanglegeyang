"use client";

import { FC } from "react";
import { useGameStore } from "@/store/gameStore";

const GameOptions: FC = () => {
  const { initializeGame, score, highScore } = useGameStore();

  return (
    <div className="mb-4 flex gap-4 items-center">
      <button
        onClick={initializeGame}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Randomize
      </button>
      <div className="flex gap-4">
        <div className="text-lg font-semibold">
          Score: {score}
        </div>
        <div className="text-lg font-semibold text-amber-600">
          High Score: {highScore}
        </div>
      </div>
    </div>
  );
};

export default GameOptions;
