'use client'

import { FC, useEffect, useState } from 'react'
import { Icon, IconName, ICONS } from './Icons'
import HoldingArea from './HoldingArea'
import { GameState, Position, TileState } from '@/types/game'

const Grid: FC = () => {
  const initialLayers: LayerConfig[] = [
    { size: 6 },  // bottom layer
    { size: 5, offset: 30 },  // middle layer
    { size: 6 },  // top layer
  ]

  const [gameState, setGameState] = useState<GameState>({
    tiles: [],
    holdingArea: Array(7).fill(null),
    layers: initialLayers
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

    // Shuffle function
    const shuffle = (array: IconName[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }

    // Create and shuffle icons for each layer
    gameState.layers.forEach((layer, layerIndex) => {
      const tileCount = layer.size * layer.size
      const layerIcons = createIcons(tileCount)
      shuffle(layerIcons)
      
      layerIcons.forEach((icon, index) => {
        tiles.push({
          icon,
          position: { layer: layerIndex, index }
        })
      })
    })

    return tiles
  }

  useEffect(() => {
    const initialTiles = distributeIcons()
    setGameState(prev => ({
      ...prev,
      tiles: initialTiles,
      holdingArea: Array(7).fill(null)
    }))
  }, [])

  return (
    <>
    <div className="relative w-[360px] h-[360px]">
      {gameState.layers.map((layerConfig, layerIndex) => {
        const size = layerConfig.size * 60 // 60px per tile
        const offset = layerConfig.offset || 0
        const isMiddleLayer = layerIndex > 0 && layerIndex < gameState.layers.length - 1

        return (
          <div
            key={`layer-${layerIndex}`}
            className={`${isMiddleLayer ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''} 
                       grid gap-0`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              gridTemplateColumns: `repeat(${layerConfig.size}, 1fr)`,
              zIndex: layerIndex
            }}
          >
            {Array(layerConfig.size * layerConfig.size).fill(null).map((_, index) => {
              const tile = gameState.tiles.find(t => 
                t.position.layer === layerIndex && t.position.index === index
              )
              return (
                <div 
                  key={`${layerIndex}-${index}`}
                  className="aspect-square flex items-center justify-center"
                >
                  {tile && <Icon name={tile.icon} />}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
    <HoldingArea tiles={gameState.holdingArea} />
    </>
  )
}

export default Grid
