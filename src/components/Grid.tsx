'use client'

import { FC, useEffect, useState } from 'react'
import { Icon, IconName, ICONS } from './Icons'

const Grid: FC = () => {
  const [bottomCells, setBottomCells] = useState<(IconName | null)[]>(Array(36).fill(null))
  const [middleCells, setMiddleCells] = useState<(IconName | null)[]>(Array(25).fill(null))
  const [topCells, setTopCells] = useState<(IconName | null)[]>(Array(36).fill(null))

  const distributeIcons = (cellCount: number) => {
    const totalGroups = Math.floor(cellCount / 3)
    const iconRepetitions = Math.ceil(totalGroups / ICONS.length)
    
    // Create an array with the right number of each icon
    const allIcons = ICONS.flatMap(icon => 
      Array(iconRepetitions * 3).fill(icon)
    ).slice(0, cellCount)
    
    // Shuffle the icons
    for (let i = allIcons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allIcons[i], allIcons[j]] = [allIcons[j], allIcons[i]]
    }
    
    return allIcons
  }

  useEffect(() => {
    // Handle bottom layer (6x6)
    const bottomIcons = distributeIcons(36)
    setBottomCells(bottomIcons)
    
    // Handle middle layer (5x5)
    const middleIcons = distributeIcons(25)
    setMiddleCells(middleIcons)
    
    // Handle top layer (6x6)
    const topIcons = distributeIcons(36)
    setTopCells(topIcons)
  }, [])

  return (
    <div className="relative w-[360px] h-[360px]">
      {/* Bottom layer - 6x6 grid */}
      <div className="grid grid-cols-6 w-full h-full gap-0">
        {bottomCells.map((icon, index) => (
          <div 
            key={index}
            className="aspect-square flex items-center justify-center p-0 m-0"
          >
            {icon && <Icon name={icon} />}
          </div>
        ))}
      </div>
      
      {/* Middle layer - 5x5 grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] grid grid-cols-5 gap-0">
        {middleCells.map((icon, index) => (
          <div 
            key={`middle-${index}`}
            className="aspect-square flex items-center justify-center"
          >
            {icon && <Icon name={icon} />}
          </div>
        ))}
      </div>

      {/* Top layer - 6x6 grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] grid grid-cols-6 gap-0">
        {topCells.map((icon, index) => (
          <div 
            key={`top-${index}`}
            className="aspect-square flex items-center justify-center"
          >
            {icon && <Icon name={icon} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Grid
