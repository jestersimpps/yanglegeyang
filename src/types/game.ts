export type TileState = {
  icon: IconName
  index: number
}

export type GameState = {
  tiles: TileState[]
  holdingArea: (IconName | null)[]
  gridSize: number
}
