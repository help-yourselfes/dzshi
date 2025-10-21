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
import createCache from './types/cache'
export { createCache }

export type { date } from './types/date'
export type { time } from './types/time'
export type { lessonInfo } from './types/lesson'
export type { weekDayData, weekDayInfo } from './types/weekDay'
export type { callInfo, callsPrefs } from './types/call'
export type { task } from './types/task'