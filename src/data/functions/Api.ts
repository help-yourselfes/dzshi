import type { callInfo, weekDayData, weekDayInfo, callsPrefs, time, date } from "../types"
import { createCache } from "../types";
import generator from "./Generator";
import Storage from "./Storage";

const cache = createCache();
const get = cache.once;

const api = {
    getCallsPrefs: async (): Promise<callsPrefs> => {
        return (await get('callsPrefs', async () => {
            const data = await Storage.getCallsPrefs();
            return data
        }))?.value
    },

    getCurrentDay: async (): Promise<weekDayInfo> => {
        return (await get('currentDay', async () => {
            const date = new Date();

            const dayId = date.getDay();
            const days = await api.getDaysInfo();
            console.log(dayId)

            return days.find(d => d.number === dayId);
        }))?.value
    },

    getDayPrefs: async (dayId: number): Promise<weekDayData> => {
        return (await get(`dayPrefs:${dayId}`, async () => {
            return await Storage.getDayPrefs(dayId);
        }))?.value
    },

    getDaysInfo: async (): Promise<weekDayInfo[]> => {
        return (await get('daysInfo', async () => {
            const data = await Storage.getDaysInfo();
            return data
        }))?.value
    },

    getAviableDays: async (): Promise<weekDayInfo[]> => {
        return (await get('aviableDays', async () => {
            const callsPrefs = await api.getCallsPrefs();
            if (!callsPrefs) throw new Error('No callsPrefs provided!')

            const days = await api.getDaysInfo();
            if (!days) throw new Error('No days provided!')

            return days.filter((v: weekDayInfo) => callsPrefs.days.includes(v.number));
        }))?.value
    },

    getCalls: async (dayId: number): Promise<callInfo[]> => {
        const days = await api.getAviableDays();
        if (!days.find(v => v.number === dayId)) return new Promise((_, rej) =>
            rej(`That day is not aviable: ${dayId}.\n Aviable days: ${days.map(d => d.name).join(', ')}`)
        )
        return (await get(`getCalls:${dayId}`, async () => {
            const callsPrefs = await api.getCallsPrefs();
            const dayPrefs = await api.getDayPrefs(dayId);

            return generator.generateCalls(callsPrefs, dayPrefs);
        }))?.value
    },

    getTasks: async (date: date) => {

    }
}

export default api;