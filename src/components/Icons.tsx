import { FC } from 'react'

export type IconName = '🍎' | '🌟' | '🎈' | '🎮' | '🎨' | '🎭' | '💎' | '🎪'

interface IconProps {
  name: IconName
}

export const Icon: FC<IconProps> = ({ name }) => {
  return (
    <div className="flex items-center justify-center text-2xl">
      {name}
    </div>
  )
}

export const ICONS: IconName[] = ['🍎', '🌟', '🎈', '🎮', '🎨', '🎭', '💎', '🎪']
