import { getSchedule, type schedulePart } from './callsSchedule'
import { toMinutes } from './time'

const currentPart = async (): Promise<schedulePart | null> => {
  const schedule = await getSchedule()
  if (!schedule.generated) return null

  const date = new Date()
  const day = date.getDay()
  if (!schedule.days.includes(day)) return null

  const now = { h: date.getHours(), m: date.getMinutes() }
  const nowMin = toMinutes(now)

  if (nowMin < toMinutes(schedule.from) || nowMin >= toMinutes(schedule.to)) return null

  return (
    schedule.parts.find((p) => {
      const startMin = toMinutes(p.start)
      const endMin = toMinutes(p.end)
      return startMin <= nowMin && nowMin < endMin
    }) || null
  )
}

export { currentPart }
