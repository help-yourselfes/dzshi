import { dataPath, type schedulePrefs, type time } from '../types'
import { addTime, parseHHMM } from './time'

type partT = {
  start: time
  end: time
  length: number
}

type lessonT = partT & { type: 'lesson'; number: number }
type breakT = partT & { type: 'break' }
type bigBreakT = partT & { type: 'bigBreak' }

type schedulePart = lessonT | breakT | bigBreakT

type scheduleUngenT = {
  generated: false
}

type scheduleGenT = {
  generated: true
  days: number[]
  parts: schedulePart[]
  from: time
  to: time
}

type schedule = scheduleUngenT | scheduleGenT

let schedule: schedule = {
  generated: false,
}

function generateSchedule(prefs: schedulePrefs) {
  const start = parseHHMM(prefs.startTime)
  const parts: schedulePart[] = []
  let cursor = start
  let lessonNumber = 0
  let isLesson = true

  while (lessonNumber < prefs.lessons.count) {
    if (isLesson) {
      lessonNumber++
      const end = addTime(cursor, prefs.lessons.length)
      parts.push({
        type: 'lesson',
        number: lessonNumber,
        start: cursor,
        end,
        length: prefs.lessons.length,
      })
      cursor = end
      isLesson = false
    } else {
      const isBig = prefs.bigBreak.enabled && prefs.bigBreak.afterLessons.includes(lessonNumber)
      const length =
        prefs.bigBreak.enabled && prefs.bigBreak.afterLessons.includes(lessonNumber)
          ? prefs.bigBreak.length
          : prefs.break.length
      const end = addTime(cursor, length)
      parts.push(
        isBig
          ? { type: 'bigBreak', start: cursor, end, length }
          : { type: 'break', start: cursor, end, length },
      )
      cursor = end
      isLesson = true
    }
  }

  schedule = { generated: true, days: prefs.days, parts, from: start, to: cursor }
}

const getSchedule = async (): Promise<schedule> => {
  if (!schedule.generated) {
    const res = await fetch(`${dataPath}/schedule/prefs.json`)
    const prefs = (await res.json()) as schedulePrefs
    generateSchedule(prefs)
  }
  return schedule
}

export { getSchedule }
export type { schedulePart, schedule }
