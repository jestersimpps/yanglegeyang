import { create } from 'zustand'
import { IconName, ICONS } from '@/components/Icons'
import { GameState } from '@/types/game'

const distributeIcons = (gridSize: number) => {
  const totalTiles = gridSize * gridSize;
  const iconRepetitions = Math.ceil(totalTiles / ICONS.length);
  const allIcons = ICONS.flatMap((icon) =>
    Array(iconRepetitions).fill(icon)
  ).slice(0, totalTiles);

  // Shuffle icons
  for (let i = allIcons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allIcons[i], allIcons[j]] = [allIcons[j], allIcons[i]];
  }

  return allIcons.map((icon, index) => ({
    icon,
    index,
  }));
};

interface GameStore extends GameState {
  initializeGame: () => void;
  moveTileToHoldingArea: (tileIndex: number) => void;
  clearHoldingArea: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  tiles: [],
  holdingArea: Array(7).fill(null),
  gridSize: 6,

  initializeGame: () => {
    set((state) => ({
      tiles: distributeIcons(state.gridSize),
      holdingArea: Array(7).fill(null),
    }));
  },

  moveTileToHoldingArea: (tileIndex: number) => {
    set((state) => {
      const tile = state.tiles.find((t) => t.index === tileIndex);
      if (!tile) return state;

      const firstEmptySlot = state.holdingArea.findIndex((slot) => slot === null);
      if (firstEmptySlot === -1) return state;

      const newHoldingArea = [...state.holdingArea];
      newHoldingArea[firstEmptySlot] = tile.icon;

      return {
        tiles: state.tiles.filter((t) => t.index !== tileIndex),
        holdingArea: newHoldingArea,
      };
    });
  },

  clearHoldingArea: () => {
    set(() => ({
      holdingArea: Array(7).fill(null),
    }));
  },
}));
