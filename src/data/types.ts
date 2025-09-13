const dataPath = '/src/data'

type dayNumber = 1 | 2 | 3 | 4 | 5

type period = {
  month: number
  start: number
  end: number

  // converts to MM.SS-EE, to
  // use in tasks/ directory
}

type time = {
  h: number
  m: number
}

type lessonData = {
  name: string
  'short-name'?: string
  necessary?: boolean
  class: string | string[]
}

type day = {
  name: string
  length: number
  lessons: lessonData[]
}

type schedulePrefs = {
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

type week = day[]

export type { dayNumber, lessonData, day, week, schedulePrefs, period, time }
export { dataPath }
