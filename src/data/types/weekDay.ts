import type { lessonInfo } from "./lesson"

export type weekDayInfo = {
  number: number,
  name: string,
  'short-name': string
}

export type weekDayData = {
  name: string
  length: number
  lessons: lessonInfo[]
}