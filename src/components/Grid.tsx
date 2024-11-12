"use client";

import { FC, useEffect } from "react";
const UNCOVERED_TILE_COLOR = 'rgb(240, 240, 240)';
import { Icon } from "./Icons";
import HoldingArea from "./HoldingArea";
import GameOptions from "./GameOptions";
import { useGameStore } from "@/store/gameStore";

const Grid: FC = () => {
 const { layers, moveTileToHoldingArea, isGameOver } = useGameStore();

 useEffect(() => {
  initializeGame();
 }, [initializeGame]);

 return (
  <>
   <GameOptions />
   {isGameOver && (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
     <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-red-600">Game Over!</h2>
      <p className="mt-2">The holding area is full.</p>
     </div>
    </div>
   )}
   <div className="relative w-[360px] h-[360px]">
    {layers.flatMap((layer, layerIndex) =>
     layer.tiles.map((tile) => {
      const handleTileClick = () => {
       moveTileToHoldingArea(tile.index, layerIndex);
      };

      // Calculate position based on the layer's grid size
      const row = Math.floor(tile.index / layer.size);
      const col = tile.index % layer.size;
      const tileSize = 60; // px
      const offset = ((6 - layer.size) * tileSize) / 2; // Center smaller grids

      return (
       <div
        key={`${layerIndex}-${tile.index}`}
        className="absolute"
        style={{
         width: `${tileSize}px`,
         height: `${tileSize}px`,
         left: `${offset + col * tileSize}px`,
         top: `${offset + row * tileSize}px`,
        }}
        onClick={handleTileClick}
       >
        <Icon
         name={tile.icon}
         style={{
          background: tile.isCovered 
            ? `rgb(${60 + layerIndex * 50}, ${60 + layerIndex * 50}, ${60 + layerIndex * 50})`
            : UNCOVERED_TILE_COLOR,
          border: `1px solid black`,
         }}
        />
       </div>
      );
     })
    )}
   </div>
   <HoldingArea />
  </>
 );
};

export default Grid;
