import type { time } from "./time";

export type abstractCall = {
  start: time,
  end: time
}

export type callInfo = (
  { type: 'lesson', id: string } |
  { type: 'break' } |
  { type: 'big-break' }
) & abstractCall;

export type callsPrefs = {
  days: number[]
  startTime: string
  lessons: {
    length: number
    count: number
  }
  break: {
    length: number
  }
  bigBreak:
  | {
    enabled: true
    afterLessons: number[]
    length: number
  }
  | {
    enabled: false
  }
}
