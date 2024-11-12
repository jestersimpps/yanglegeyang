'use client'

import { FC, useEffect } from 'react'
import { Icon, IconName } from './Icons'

interface HoldingAreaProps {
  tiles: (IconName | null)[]
  onFull?: () => void
}

const HoldingArea: FC<HoldingAreaProps> = ({ tiles, onFull }) => {
  useEffect(() => {
    if (tiles.every(tile => tile !== null)) {
      onFull?.();
    }
  }, [tiles, onFull]);
  return (
    <div className="mt-8 w-full flex justify-center gap-2">
      {tiles.map((icon, index) => (
        <div 
          key={`holding-${index}`}
          className="w-[60px] h-[60px] flex items-center justify-center border-2 border-gray-300 rounded-xl"
        >
          {icon && <Icon name={icon} />}
        </div>
      ))}
    </div>
  )
}

export default HoldingArea
