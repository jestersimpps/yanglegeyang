import { FC } from 'react'

export type IconName = '🍎' | '🌟' | '🎈' | '🎮' | '🎨' | '🎭' | '💎' | '🎪'

interface IconProps {
  name: IconName
}

export const Icon: FC<IconProps> = ({ name }) => {
  return (
    <div className="flex items-center justify-center text-4xl w-full h-full rounded-xl shadow-lg transform transition-all hover:scale-105 hover:-translate-y-1 cursor-pointer m-0 p-0"
         style={{
           background: `linear-gradient(to bottom right, 
             hsl(0, 0%, 85%), 
             hsl(0, 0%, 95%), 
             hsl(0, 0%, 80%))`,
          //  boxShadow: `
          //    0 15px 25px -4px rgba(0, 0, 0, 0.3),
          //    0 8px 12px -3px rgba(0, 0, 0, 0.2),
          //    inset 0 -4px 8px rgba(0, 0, 0, 0.2),
          //    inset 0 4px 8px rgba(255, 255, 255, 0.9),
          //    inset -4px 0 8px rgba(0, 0, 0, 0.15),
          //    inset 4px 0 8px rgba(255, 255, 255, 0.7)
          //  `
         }}>
      {name}
    </div>
  )
}

export const ICONS: IconName[] = ['🍎', '🌟', '🎈', '🎮', '🎨', '🎭', '💎', '🎪']
