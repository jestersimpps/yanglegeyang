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
  currentLayer: number
  isGameOver: boolean
}
