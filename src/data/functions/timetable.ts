import type { dayNumber, day, lessonData, week } from '@/data/types'
import { dataPath } from '@/data/types'

type T = {
  cache: {
    days: Record<number, day>
  }
  getDay: (num: number) => Promise<day>
  getWeek: () => Promise<week>
}

const TimeTable: T = {
  cache: {
    days: {},
  },

  async getDay(num) {
    const days = this.cache.days
    if (days[num]) return days[num]

    const res = await fetch(`${dataPath}/schedule/timetable/${num}.json`)
    const data: day = await res.json()

    days[num] = data
    return data
  },

  async getWeek() {
    const week: week = []

    for (let i = 1; i <= 5; i++) {
      const day = await this.getDay(i)
      week.push(day)
    }

    return week
  },
}

export default TimeTable
