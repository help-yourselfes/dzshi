import type { callData, dayData, dayInfo, period, schedulePrefs, time } from "../types"
import { dataPath } from "../types";
import generator from "./Generator";
import storage from "./Storage";

const cache = {
    languageData: {
        days: [] as dayInfo[]
    },
    callsPrefs: {} as schedulePrefs,
    dayPrefs: {} as Record<number, dayData>,
    aviableDays: [] as dayInfo[],
    combinedCalls: {} as Record<number, callData[]>,

    loadState: {
        languageData: false,
        callsPrefs: false,
        dayPrefs: false,
        aviableDays: false,
        combinedCalls: false
    }
}

const api = {
    getCallsPrefs: async () => {
        if (!cache.loadState.callsPrefs) {
            cache.callsPrefs = await storage.getCallsPrefs();;
            cache.loadState.callsPrefs = true;
        }
        return cache.callsPrefs;
    },

    getDayPrefs: async (dayId: number) => {
        if (!cache.dayPrefs[dayId]) {
            cache.dayPrefs[dayId] = await storage.getDayPrefs(dayId);
        }
        return cache.dayPrefs[dayId]
    },

    getLanguage: async () => {
        if (!cache.loadState.languageData) {
            const res = await fetch(`${dataPath}/json/language.json`);
            const data = await res.json();
            cache.languageData = data;
            cache.loadState.languageData = true;
        }
        return cache.languageData
    },

    getAviableDays: async () => {
        if (!cache.loadState.aviableDays) {
            try {
                const callsPrefs = await api.getCallsPrefs();
                const language = await api.getLanguage();

                cache.aviableDays = language.days.filter((v) => callsPrefs.days.includes(v.number));
                cache.loadState.aviableDays = true;
            } catch (e) {
                console.error('Error while getting aviable days: ', e);
            }
        }
        return cache.aviableDays
    },

    getCalls: async (dayId: number): Promise<callData[]> => {
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