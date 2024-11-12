import { FC } from 'react'

export type IconName = '🍎' | '🌟' | '🎈' | '🎮' | '🎨' | '🎭' | '💎' | '🎪'

interface IconProps {
  name: IconName
}

export const Icon: FC<IconProps> = ({ name }) => {
  return (
    <div className="flex items-center justify-center text-4xl w-[60px] h-[60px] bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
         style={{
           transform: 'perspective(1000px) rotateX(10deg)',
           boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 -2px 0 0 rgba(255, 255, 255, 0.6) inset, 2px 0 0 0 rgba(255, 255, 255, 0.3) inset, -2px 0 0 0 rgba(0, 0, 0, 0.1) inset, 0 2px 0 0 rgba(0, 0, 0, 0.2) inset'
         }}>
      {name}
    </div>
  )
}

export const ICONS: IconName[] = ['🍎', '🌟', '🎈', '🎮', '🎨', '🎭', '💎', '🎪']
