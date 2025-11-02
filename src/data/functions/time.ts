import type { time } from '../types'

const currentTime = (): time => {
  const date = new Date(); return {
    h: date.getHours(),
    m: date.getMinutes()
  }
}

const addTime = (t: time, minutes: number): time => {
  const total = t.h * 60 + t.m + minutes
  return toTime(total)
}

const toMinutes = (t: time) => t.h * 60 + t.m

const toTime = (t: number): time => ({ h: Math.floor(t / 60), m: t % 60 })

function parseHHMM(s: string): time {
  const m = s.match(/^(\d{1,2}):(\d{2})$/)
  if (!m) throw new Error('Invalid time')
  const h = parseInt(m[1], 10),
    min = parseInt(m[2], 10)
  if (min < 0 || min > 59) throw new Error('invalid minutes')
  return { h, m: min }
}

const isBetween = (time: time, start: time, end: time) => {
  const timeN = toMinutes(time);
  const startN = toMinutes(start);
  const endN = toMinutes(end);

  return (timeN >= startN && timeN <= endN)
}

export { addTime, toMinutes, parseHHMM, isBetween, currentTime }
