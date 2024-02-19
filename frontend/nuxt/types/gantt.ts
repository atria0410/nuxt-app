export type Room = {
  name: string
  table: string[]
  displayName: boolean
}

export type Reservation = {
  id: string
  title: string
  room: string
  table: string[]
  startTime: string
  endTime: string
}

export type Bar = {
  id: string
  title: string
  room: string
  table: string[]
  x: number
  y: number
  w: number
  h: number
  active: boolean
  parent: string
  handles: string[]
}
