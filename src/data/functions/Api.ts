import type { callInfo, weekDayData, weekDayInfo, callsPrefs, time, date, lessonInfo } from "../types"
import { createCache } from "../types";
import generator from "./Generator";
import Storage from "./Storage";

const cache = createCache();
const get = cache.once;

const api = {
    getCallsPrefs: async (): Promise<callsPrefs> =>
    (await get('callsPrefs', async () => {
        const data = await Storage.getCallsPrefs();
        return data
    }))
    ,

    getCurrentDay: async (): Promise<weekDayInfo> => {
        return (await get('currentDay', async () => {
            const date = new Date();

            const dayId = date.getDay();
            const days = await api.getDaysInfo();

            const day = days.find(d => d.number === dayId);

            return day ? day : (new Promise<weekDayInfo>((_, rej) => rej('Not supported day')))
        }))
    },

    getDayPrefs: async (dayId: number): Promise<weekDayData> =>
    (await get(`dayPrefs:${dayId}`, async () => {
        return await Storage.getDayPrefs(dayId);
    }))
    ,

    getDaysInfo: async (): Promise<weekDayInfo[]> =>
        await get('daysInfo', async () =>
            Storage.getDaysInfo()
        )
    ,

    getAviableDays: async (): Promise<weekDayInfo[]> =>
    (await get('aviableDays', async () => {
        const callsPrefs = await api.getCallsPrefs();
        if (!callsPrefs) throw new Error('No callsPrefs provided!')

        const days = await api.getDaysInfo();
        if (!days) throw new Error('No days provided!')
        console.log(days)
        return days.filter((v: weekDayInfo) => callsPrefs.days.includes(v.number));
    }))
    ,

    getCalls: async (dayId: number): Promise<callInfo[]> => {
        const days = await api.getAviableDays();
        if (!days.find(v => v.number === dayId)) return new Promise((_, rej) =>
            rej(`That day is not aviable: ${dayId}.\n Aviable days: ${days.map(d => d.name).join(', ')}`)
        )
        return (await get(`getCalls:${dayId}`, async () => {
            const callsPrefs = await api.getCallsPrefs();
            const dayPrefs = await api.getDayPrefs(dayId);

            return generator.generateCalls(callsPrefs, dayPrefs);
        }))
    },

    getTasks: async (date: date) =>
    (await get(`tasks:${date.year}/${date.month}/${date.day}`, async () => {
        const data = await Storage.getTasks(date);

        return data.tasks
    })),

    getLessonInfo: async (id: string): Promise<lessonInfo> =>
        await get(`lessonInfo:${id}`, async () =>
            Storage.getLessonInfo(id)
        )

}

export default api;