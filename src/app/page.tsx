"use client";

import Grid from "@/components/Grid";
import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";

export default function Home() {
  const initializeGame = useGameStore((state) => state.initializeGame);
  
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Grid />
    </div>
  );
}
