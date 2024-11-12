'use client'

import { FC, useEffect, useState } from 'react'
import { Icon, IconName, ICONS } from './Icons'

const Grid: FC = () => {
  const [cells, setCells] = useState<(IconName | null)[]>(Array(64).fill(null))

  useEffect(() => {
    const newCells = Array(64).fill(null)
    const totalGroups = Math.floor(64 / 3) // 21 complete groups of 3
    const iconRepetitions = Math.ceil(totalGroups / ICONS.length) // How many times to repeat each icon
    
    // Create an array with the right number of each icon
    const allIcons = ICONS.flatMap(icon => 
      Array(iconRepetitions * 3).fill(icon)
    ).slice(0, 63) // Ensure we don't exceed 63 cells (21 groups * 3)
    
    // Shuffle the icons
    for (let i = allIcons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allIcons[i], allIcons[j]] = [allIcons[j], allIcons[i]]
    }
    
    // Place the icons in the grid
    allIcons.forEach((icon, index) => {
      newCells[index] = icon
    })
    
    setCells(newCells)
  }, [])

  return (
    <div className="grid grid-cols-8 gap-2 w-[480px] h-[480px]">
      {cells.map((icon, index) => (
        <div 
          key={index}
          className="bg-gray-100 dark:bg-gray-800 aspect-square rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {icon && <Icon name={icon} />}
        </div>
      ))}
    </div>
  )
}

export default Grid
