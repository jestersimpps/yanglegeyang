export type Position = {
  layer: number  // 0 is bottom-most layer
  index: number
}

export type LayerConfig = {
  size: number  // Number of tiles per side (e.g., 6 for 6x6 grid)
  offset?: number  // Offset from the base size in pixels
}

export type TileState = {
  icon: IconName
  position: Position
  isCovered?: boolean
}

export type GameState = {
  tiles: TileState[]
  holdingArea: (IconName | null)[]
  layers: LayerConfig[]
}
