'use client'

import { FC, useEffect, useState, useCallback } from 'react'
import { Icon, IconName, ICONS } from './Icons'
import HoldingArea from './HoldingArea'
import { GameState, Position, TileState } from '@/types/game'

const Grid: FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    tiles: [],
    holdingArea: Array(7).fill(null),
    gridSize: 8 // 8x8 grid
  })

  const distributeIcons = () => {
    const totalTiles = gameState.gridSize * gameState.gridSize
    const iconRepetitions = Math.ceil(totalTiles / ICONS.length)
    const allIcons = ICONS.flatMap(icon => Array(iconRepetitions).fill(icon)).slice(0, totalTiles)
    
    // Shuffle icons
    for (let i = allIcons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allIcons[i], allIcons[j]] = [allIcons[j], allIcons[i]]
    }
    
    return allIcons.map((icon, index) => ({
      icon,
      index
    }))
  }

  useEffect(() => {
    setGameState(prev => ({
      ...prev,
      tiles: distributeIcons(),
      holdingArea: Array(7).fill(null)
    }))
  }, [])

  return (
    <>
    <div className="w-[480px] h-[480px]">
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${gameState.gridSize}, 1fr)`
        }}
      >
        {Array(gameState.gridSize * gameState.gridSize).fill(null).map((_, index) => {
          const tile = gameState.tiles.find(t => t.index === index)
              const handleTileClick = () => {
                if (tile) {
                  const firstEmptySlot = gameState.holdingArea.findIndex(slot => slot === null);
                  if (firstEmptySlot !== -1) {
                    const newHoldingArea = [...gameState.holdingArea];
                    newHoldingArea[firstEmptySlot] = tile.icon;
                    
                    const newTiles = gameState.tiles.filter(t => t.index !== tile.index);

                    setGameState(prev => ({
                      ...prev,
                      tiles: newTiles,
                      holdingArea: newHoldingArea
                    }));
                  }
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
              )
            })}
          </div>
        )
      })}
    </div>
    <HoldingArea 
      tiles={gameState.holdingArea} 
      onFull={() => {
        setGameState(prev => ({
          ...prev,
          holdingArea: Array(7).fill(null)
        }));
      }}
    />
    </>
  )
}

export default Grid
