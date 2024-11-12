'use client'

import { FC, useEffect, useState } from 'react'
import { Icon, IconName, ICONS } from './Icons'

const Grid: FC = () => {
  const [bottomCells, setBottomCells] = useState<(IconName | null)[]>(Array(36).fill(null))
  const [topCells, setTopCells] = useState<(IconName | null)[]>(Array(25).fill(null))

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
    
    // Handle top layer (5x5)
    const topIcons = distributeIcons(25)
    setTopCells(topIcons)
  }, [])

  return (
    <div className="relative w-[360px] h-[360px]">
      {/* Bottom layer - 6x6 grid */}
      <div className="grid grid-cols-6 w-full h-full">
        {bottomCells.map((icon, index) => (
          <div 
            key={index}
            className="bg-gray-100 dark:bg-gray-800 aspect-square rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {icon && <Icon name={icon} />}
          </div>
        ))}
      </div>
      
      {/* Top layer - 5x5 grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] grid grid-cols-5 gap-0">
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
