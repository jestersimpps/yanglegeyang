'use client'

import { FC, useEffect, useState } from 'react'
import { Icon, IconName, ICONS } from './Icons'

const Grid: FC = () => {
  const [cells, setCells] = useState<(IconName | null)[]>(Array(64).fill(null))

  useEffect(() => {
    const newCells = Array(64).fill(null)
    let remainingCells = 64
    
    while (remainingCells > 0) {
      ICONS.forEach(icon => {
        // Place icons in groups of 3 until grid is full
        if (remainingCells >= 3) {
          for (let i = 0; i < 3; i++) {
            let position
            do {
              position = Math.floor(Math.random() * 64)
            } while (newCells[position] !== null)
            newCells[position] = icon
          }
          remainingCells -= 3
        }
      })
    }
    
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
