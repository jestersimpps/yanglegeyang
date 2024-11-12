"use client";

import { FC } from "react";
import { useGameStore } from "@/store/gameStore";

const GameOptions: FC = () => {
  const { initializeGame, score, highScore } = useGameStore();

  return (
    <div className="mb-4 flex gap-4 items-center">
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
