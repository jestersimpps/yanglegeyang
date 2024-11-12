'use client'

import { FC, useEffect } from 'react'
import { Icon } from './Icons'
import { useGameStore } from '@/store/gameStore'

const HoldingArea: FC = () => {
  const { holdingArea, clearHoldingArea } = useGameStore()

  useEffect(() => {
    if (holdingArea.every(tile => tile !== null)) {
      clearHoldingArea();
    }
  }, [holdingArea, clearHoldingArea]);
  return (
    <div className="mt-8 w-full flex justify-center gap-2">
      {holdingArea.map((icon, index) => (
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
