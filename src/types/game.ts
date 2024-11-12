export type Position = {
  layer: 'bottom' | 'middle' | 'top' | 'holding'
  index: number
}

export type TileState = {
  icon: IconName
  position: Position
}

export type GameState = {
  tiles: TileState[]
  holdingArea: (IconName | null)[]
}
