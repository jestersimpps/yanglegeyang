'use client'

import { FC, useEffect } from 'react'
import { Icon } from './Icons'
import HoldingArea from './HoldingArea'
import { useGameStore } from '@/store/gameStore'

const Grid: FC = () => {
  const { layers, initializeGame, moveTileToHoldingArea } = useGameStore()

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  return (
    <>
      <div className="relative w-[360px] h-[360px]">
        {layers.map((layer, layerIndex) => (
          <div
            key={layerIndex}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              transform: `translate(${layerIndex * 20}px, ${layerIndex * 20}px)`,
              zIndex: layerIndex,
            }}
          >
            <div
              className="grid gap-0"
              style={{
                gridTemplateColumns: `repeat(${layer.size}, 1fr)`,
                width: `${(layer.size / 6) * 100}%`,
                height: `${(layer.size / 6) * 100}%`,
              }}
            >
              {Array(layer.size * layer.size)
                .fill(null)
                .map((_, index) => {
                  const tile = layer.tiles.find((t) => t.index === index);
                  const handleTileClick = () => {
                    if (tile) {
                      moveTileToHoldingArea(tile.index, layerIndex);
                    }
                  };

                  return (
                    <div
                      key={index}
                      className="aspect-square flex items-center justify-center"
                      onClick={tile ? handleTileClick : undefined}
                    >
                      {tile && <Icon name={tile.icon} layoutId={`tile-${layerIndex}-${tile.index}`} />}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
      <HoldingArea />
    </>
  );
};

export default Grid;
