'use client'

import { FC } from 'react'

const Grid: FC = () => {
  return (
    <div className="grid grid-cols-8 gap-1 w-[400px] h-[400px]">
      {Array(64).fill(null).map((_, index) => (
        <div 
          key={index}
          className="bg-gray-200 dark:bg-gray-700 aspect-square"
        />
      ))}
    </div>
  )
}

export default Grid
