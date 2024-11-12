'use client'

import { FC } from 'react'
import { Icon, IconName } from './Icons'

interface HoldingAreaProps {
  tiles: (IconName | null)[]
}

const HoldingArea: FC<HoldingAreaProps> = ({ tiles }) => {
  return (
    <div className="mt-8 w-full flex justify-center gap-2">
      {tiles.map((icon, index) => (
        <div 
          key={`holding-${index}`}
          className="w-12 h-12 flex items-center justify-center"
        >
          {icon && <Icon name={icon} />}
        </div>
      ))}
    </div>
  )
}

export default HoldingArea
