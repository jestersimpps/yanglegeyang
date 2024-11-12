'use client'

import { FC, useEffect, useState } from 'react'
import { Icon, IconName, ICONS } from './Icons'

const Grid: FC = () => {
  const [cells, setCells] = useState<(IconName | null)[]>(Array(64).fill(null))

  useEffect(() => {
    const newCells = Array(64).fill(null)
    ICONS.forEach(icon => {
      // Place each icon 3 times
      for (let i = 0; i < 3; i++) {
        let position
        do {
          position = Math.floor(Math.random() * 64)
        } while (newCells[position] !== null)
        newCells[position] = icon
      }
    })
    setCells(newCells)
  }, [])

  return (
    <div className="grid grid-cols-8 gap-1 w-[400px] h-[400px]">
      {cells.map((icon, index) => (
        <div 
          key={index}
          className="bg-gray-200 dark:bg-gray-700 aspect-square flex items-center justify-center"
        >
          {icon && <Icon name={icon} />}
        </div>
      ))}
    </div>
  )
}

export default Grid
