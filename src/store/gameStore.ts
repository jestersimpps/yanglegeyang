import { create } from 'zustand'
import { IconName, ICONS } from '@/components/Icons'
import { GameState } from '@/types/game'

const isTileCovered = (
  tile: TileState,
  higherLayers: { tiles: TileState[]; size: number }[]
): boolean => {
  const tileSize = 60; // px
  const row = Math.floor(tile.index / (tile.layer === 0 ? 6 : tile.layer === 1 ? 5 : 4));
  const col = tile.index % (tile.layer === 0 ? 6 : tile.layer === 1 ? 5 : 4);
  const offset = ((6 - (tile.layer === 0 ? 6 : tile.layer === 1 ? 5 : 4)) * tileSize) / 2;
  const tileLeft = offset + col * tileSize;
  const tileTop = offset + row * tileSize;

  return higherLayers.some(layer => 
    layer.tiles.some(higherTile => {
      const higherRow = Math.floor(higherTile.index / layer.size);
      const higherCol = higherTile.index % layer.size;
      const higherOffset = ((6 - layer.size) * tileSize) / 2;
      const higherLeft = higherOffset + higherCol * tileSize;
      const higherTop = higherOffset + higherRow * tileSize;

      // Check for overlap
      return !(
        higherLeft + tileSize <= tileLeft ||
        higherLeft >= tileLeft + tileSize ||
        higherTop + tileSize <= tileTop ||
        higherTop >= tileTop + tileSize
      );
    })
  );
};

const updateCoveredStatus = (layers: GameState['layers']): GameState['layers'] => {
  return layers.map((layer, layerIndex) => ({
    ...layer,
    tiles: layer.tiles.map(tile => ({
      ...tile,
      isCovered: isTileCovered(
        tile,
        layers.slice(layerIndex + 1)
      )
    }))
  }));
};

const distributeIcons = (gridSize: number, layerIndex: number) => {
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
    layer: layerIndex
  }));
};

interface GameStore extends GameState {
  initializeGame: () => void;
  moveTileToHoldingArea: (tileIndex: number, layerIndex: number) => void;
  clearHoldingArea: () => void;
  checkAndRemoveTriplets: () => void;
  checkGameOver: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  layers: [
    { tiles: [], size: 6 },  // Bottom layer
    { tiles: [], size: 5 },  // Middle layer
    { tiles: [], size: 6 }   // Top layer
  ],
  holdingArea: Array(7).fill(null),
  currentLayer: 0,
  isGameOver: false,

  initializeGame: () => {
    set((state) => {
      const initialLayers = state.layers.map((layer, index) => ({
        ...layer,
        tiles: distributeIcons(layer.size, index)
      }));
      
      return {
        layers: updateCoveredStatus(initialLayers),
        holdingArea: Array(7).fill(null),
        currentLayer: 0,
        isGameOver: false
      };
    });
  },

  moveTileToHoldingArea: (tileIndex: number, layerIndex: number) => {
    set((state) => {
      const tile = state.layers[layerIndex].tiles.find((t) => t.index === tileIndex);
      if (!tile || tile.isCovered) return state;

      const firstEmptySlot = state.holdingArea.findIndex((slot) => slot === null);
      if (firstEmptySlot === -1) return state;

      const newHoldingArea = [...state.holdingArea];
      newHoldingArea[firstEmptySlot] = tile.icon;

      const newLayers = state.layers.map((layer, idx) => 
        idx === layerIndex 
          ? { ...layer, tiles: layer.tiles.filter((t) => t.index !== tileIndex) }
          : layer
      );

      // First update the holding area and layers
      set({
        layers: updateCoveredStatus(newLayers),
        holdingArea: newHoldingArea,
      });
      
      // Check for triplets
      get().checkAndRemoveTriplets();
      
      // Check for game over
      get().checkGameOver();
      
      // Return the current state after all updates
      return get();
    });
  },

  clearHoldingArea: () => {
    set(() => ({
      holdingArea: Array(7).fill(null),
    }));
  },

  checkAndRemoveTriplets: () => {
    set((state) => {
      const holdingArea = [...state.holdingArea];
      const iconCounts = new Map<IconName, number>();
      
      // Count occurrences of each icon
      holdingArea.forEach((icon) => {
        if (icon) {
          iconCounts.set(icon, (iconCounts.get(icon) || 0) + 1);
        }
      });

      // Check for triplets and remove them
      let hasChanged = false;
      iconCounts.forEach((count, icon) => {
        if (count >= 3) {
          // Remove exactly 3 instances of the matching icon
          let removed = 0;
          for (let i = 0; i < holdingArea.length && removed < 3; i++) {
            if (holdingArea[i] === icon) {
              holdingArea[i] = null;
              removed++;
            }
          }
          hasChanged = true;
        }
      });

      return hasChanged ? { holdingArea } : state;
    });
  },

  checkGameOver: () => {
    set((state) => {
      const isFull = !state.holdingArea.includes(null);
      return { isGameOver: isFull };
    });
  },
}));
