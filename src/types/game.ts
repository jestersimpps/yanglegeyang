import { IconName } from "@/components/Icons"

export type TileState = {
  icon: IconName
  index: number
  layer: number
  isCovered: boolean
}

export type LayerConfig = {
  size: number
  offset: { x: number; y: number }
}

export type GameState = {
  layers: {
    tiles: TileState[]
    size: number
  }[]
  holdingArea: (IconName | null)[]
  isGameOver: boolean
  score: number
  highScore: number
}
