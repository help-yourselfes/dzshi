import type { callInfo, dayData, dayInfo, period, callsPrefs, time } from "../types"
import generator from "./Generator";
import Storage from "./Storage";

const cache = {
    daysInfo: [] as dayInfo[],
    callsPrefs: {} as callsPrefs,
    dayPrefs: {} as Record<number, dayData>,
    aviableDays: [] as dayInfo[],
    combinedCalls: {} as Record<number, callInfo[]>,

    loadState: {
        daysInfo: false,
        callsPrefs: false,
        dayPrefs: false,
        aviableDays: false,
        combinedCalls: false
    }
}

const api = {
    getCallsPrefs: async () => {
        if (!cache.loadState.callsPrefs) {
            cache.callsPrefs = await Storage.getCallsPrefs();;
            cache.loadState.callsPrefs = true;
        }
        return cache.callsPrefs;
    },

    getDayPrefs: async (dayId: number) => {
        if (!cache.dayPrefs[dayId]) {
            cache.dayPrefs[dayId] = await Storage.getDayPrefs(dayId);
        }
        return cache.dayPrefs[dayId]
    },
    getDaysInfo: async () => {
        if (!cache.daysInfo.length) {
            const data = await Storage.getDaysInfo();
            cache.daysInfo = data;
        }
        return cache.daysInfo
    },

    getAviableDays: async () => {
        if (!cache.loadState.aviableDays) {
            try {
                const callsPrefs = await api.getCallsPrefs();
                const days = await api.getDaysInfo();
                
                cache.aviableDays = days.filter((v) => callsPrefs.days.includes(v.number));
                cache.loadState.aviableDays = true;
            } catch (e) {
                console.error('Error while getting aviable days: ', e);
            }
        }
        return cache.aviableDays
    },

    getCalls: async (dayId: number): Promise<callInfo[]> => {
        const days = await api.getAviableDays();
        if (!days.find(v => v.number === dayId)) return new Promise((_, rej) =>
            rej(`That day is not aviable: ${dayId}\nAviable days: ${days}`)
        )
        if (!cache.combinedCalls[dayId]) {
            const callsPrefs = await api.getCallsPrefs();
            const dayPrefs = await api.getDayPrefs(dayId);

            const calls = generator.generateCalls(callsPrefs, dayPrefs);

            cache.combinedCalls[dayId] = calls;
        }

        return cache.combinedCalls[dayId]
    },

    getTasks: async (period: period) => {

    }
}

export default api;