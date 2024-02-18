export type Bar = {
  id: string
  title: string
  startTime: string
  endTime: string
}

export type Task = {
  task: string
  bars: Bar[]
}
