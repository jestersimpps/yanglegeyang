import { FC } from 'react'

export type IconName = '🍎' | '🌟' | '🎈' | '🎮' | '🎨' | '🎭' | '💎' | '🎪'

interface IconProps {
  name: IconName
}

export const Icon: FC<IconProps> = ({ name }) => {
  return (
    <div className="flex items-center justify-center text-4xl w-[60px] h-[60px] bg-gradient-to-br from-gray-100 to-white rounded-xl shadow-lg transform transition-all hover:scale-105 hover:-translate-y-1 cursor-pointer"
         style={{
           transform: 'perspective(1000px) rotateX(15deg)',
           boxShadow: `
             0 10px 15px -3px rgba(0, 0, 0, 0.2),
             0 4px 6px -2px rgba(0, 0, 0, 0.1),
             inset 0 -2px 4px rgba(0, 0, 0, 0.1),
             inset 0 2px 4px rgba(255, 255, 255, 0.9),
             inset -2px 0 4px rgba(0, 0, 0, 0.1),
             inset 2px 0 4px rgba(255, 255, 255, 0.5)
           `
         }}>
      {name}
    </div>
  )
}

export const ICONS: IconName[] = ['🍎', '🌟', '🎈', '🎮', '🎨', '🎭', '💎', '🎪']
