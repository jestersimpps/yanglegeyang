'use client'

import { FC, useEffect } from 'react'
import { Icon } from './Icons'
import HoldingArea from './HoldingArea'
import { useGameStore } from '@/store/gameStore'

const Grid: FC = () => {
  const { tiles, gridSize, initializeGame, moveTileToHoldingArea } = useGameStore()

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

 return (
  <>
   <div className="w-[360px] h-[360px]">
    <div
     className="grid gap-0"
     style={{
      gridTemplateColumns: `repeat(${gameState.gridSize}, 1fr)`,
     }}
    >
     {Array(gridSize * gridSize)
      .fill(null)
      .map((_, index) => {
       const tile = tiles.find((t) => t.index === index);
       const handleTileClick = () => {
        if (tile) {
          moveTileToHoldingArea(tile.index);
        }
       };

       return (
        <div
         key={index}
         className="aspect-square flex items-center justify-center"
         onClick={tile ? handleTileClick : undefined}
        >
         {tile && <Icon name={tile.icon} />}
        </div>
       );
      })}
    </div>
   </div>
   <HoldingArea />
  </>
 );
};

export default Grid;
