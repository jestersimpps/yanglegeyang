'use client'

import { FC, useEffect, useState } from 'react'
import { Icon, IconName, ICONS } from './Icons'
import HoldingArea from './HoldingArea'
import { GameState, Position, TileState } from '@/types/game'

const Grid: FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    tiles: [],
    holdingArea: Array(7).fill(null)
  })

  const distributeIcons = () => {
    const tiles: TileState[] = []
    
    // Helper function to create and shuffle icons
    const createIcons = (count: number) => {
      const totalGroups = Math.floor(count / 3)
      const iconRepetitions = Math.ceil(totalGroups / ICONS.length)
      return ICONS.flatMap(icon => 
        Array(iconRepetitions * 3).fill(icon)
      ).slice(0, count)
    }

    // Create and shuffle icons for each layer
    const bottomIcons = createIcons(36)
    const middleIcons = createIcons(25)
    const topIcons = createIcons(36)

    // Shuffle arrays
    const shuffle = (array: IconName[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }

    shuffle(bottomIcons)
    shuffle(middleIcons)
    shuffle(topIcons)

    // Create tile states
    bottomIcons.forEach((icon, index) => {
      tiles.push({
        icon,
        position: { layer: 'bottom', index }
      })
    })

    middleIcons.forEach((icon, index) => {
      tiles.push({
        icon,
        position: { layer: 'middle', index }
      })
    })

    topIcons.forEach((icon, index) => {
      tiles.push({
        icon,
        position: { layer: 'top', index }
      })
    })

    return tiles
  }

  useEffect(() => {
    const initialTiles = distributeIcons()
    setGameState({
      tiles: initialTiles,
      holdingArea: Array(7).fill(null)
    })
  }, [])

  return (
    <>
    <div className="relative w-[360px] h-[360px]">
      {/* Bottom layer - 6x6 grid */}
      <div className="grid grid-cols-6 w-full h-full gap-0">
        {Array(36).fill(null).map((_, index) => {
          const tile = gameState.tiles.find(t => t.position.layer === 'bottom' && t.position.index === index)
          return (
            <div 
              key={index}
              className="aspect-square flex items-center justify-center p-0 m-0"
            >
              {tile && <Icon name={tile.icon} />}
            </div>
          )
        })}
      </div>
      
      {/* Middle layer - 5x5 grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] grid grid-cols-5 gap-0">
        {Array(25).fill(null).map((_, index) => {
          const tile = gameState.tiles.find(t => t.position.layer === 'middle' && t.position.index === index)
          return (
            <div 
              key={`middle-${index}`}
              className="aspect-square flex items-center justify-center"
            >
              {tile && <Icon name={tile.icon} />}
            </div>
          )
        })}
      </div>

      {/* Top layer - 6x6 grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] grid grid-cols-6 gap-0">
        {Array(36).fill(null).map((_, index) => {
          const tile = gameState.tiles.find(t => t.position.layer === 'top' && t.position.index === index)
          return (
            <div 
              key={`top-${index}`}
              className="aspect-square flex items-center justify-center"
            >
              {tile && <Icon name={tile.icon} />}
            </div>
          )
        })}
      </div>
    </div>
    <HoldingArea tiles={gameState.holdingArea} />
    </>
  )
}

export default Grid
