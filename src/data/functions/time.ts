import type { period, time } from '../types'

const addTime = (t: time, minutes: number): time => {
  const total = t.h * 60 + t.m + minutes
  return { h: Math.floor(total / 60), m: total % 60 }
}

const toMinutes = (t: time) => t.h * 60 + t.m

function parseHHMM(s: string): time {
  const m = s.match(/^(\d{1,2}):(\d{2})$/)
  if (!m) throw new Error('Invalid time')
  const h = parseInt(m[1], 10),
    min = parseInt(m[2], 10)
  if (min < 0 || min > 59) throw new Error('Invalid minutes')
  return { h, m: min }
}

export { addTime, toMinutes, parseHHMM }
