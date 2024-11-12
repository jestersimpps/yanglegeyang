"use client";

import { FC, useEffect } from "react";
import { Icon } from "./Icons";
import HoldingArea from "./HoldingArea";
import { useGameStore } from "@/store/gameStore";

const Grid: FC = () => {
 const { layers, initializeGame, moveTileToHoldingArea } = useGameStore();

 useEffect(() => {
  initializeGame();
 }, [initializeGame]);

 return (
  <>
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
          background: `silver`,
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
