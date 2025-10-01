/*

Name specifications:

  Prefs:
    contains Object preferences
  Info:
    contains data about Object itself
  Data:
    contains data that Object is store

  Calls:
    contains time range
  

*/

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

type lessonInfo = {
  name: string
  'short-name'?: string
  necessary?: boolean
  class: string | string[]
}

type dayInfo = {
  number: number,
  name: string,
  'short-name': string
}

type dayData = {
  name: string
  length: number
  lessons: lessonInfo[]
}

type abstractCall = {
  start: time,
  end: time
}

type callInfo = (
  { type: 'lesson', name: string } |
  { type: 'break'} |
  { type: 'big-break' } 
) & abstractCall;

type callsPrefs = {
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

export type { dayNumber, lessonInfo, dayData, callsPrefs, period, time, dayInfo, callInfo }