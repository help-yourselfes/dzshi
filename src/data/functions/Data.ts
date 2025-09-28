import type { callData, dayData, dayInfo, period, schedulePrefs, time } from "../types"
import { dataPath } from "../types";
import { addTime, parseHHMM } from "./time";

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

const Data = {
    getCallsPrefs: async () => {
        if (!cache.loadState.callsPrefs) {
            const res = await fetch(`${dataPath}/json/callsPrefs.json`);
            cache.callsPrefs = await res.json();
            cache.loadState.callsPrefs = true;
        }
        return cache.callsPrefs;
    },

    getDayPrefs: async (dayId: number) => {
        if (!cache.dayPrefs[dayId]) {
            const res = await fetch(`${dataPath}/json/days/${dayId}.json`);
            const data = await res.json();
            cache.dayPrefs[dayId] = data;
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
                const callsPrefs = await Data.getCallsPrefs();
                const language = await Data.getLanguage();

                cache.aviableDays = language.days.filter((v) => callsPrefs.days.includes(v.number));
                cache.loadState.aviableDays = true;
            } catch (e) {
                console.error('Error while getting aviable days: ', e);
            }
        }
        return cache.aviableDays
    },

    getCalls: async (dayId: number): Promise<callData[]> => {
        const days = await Data.getAviableDays();
        if (!days.find(v => v.number === dayId)) return new Promise((_, rej) =>
            rej(`That day is not aviable: ${dayId}\nAviable days: ${days}`)
        )
        if (!cache.combinedCalls[dayId]) {
            function mutateTime(minutes: number) {
                currentTime = addTime(currentTime, minutes);
                return currentTime
            }
            const calls: callData[] = [];
            const callsPrefs = await Data.getCallsPrefs();
            const dayPrefs = await Data.getDayPrefs(dayId);

            const lessonLength = callsPrefs.lessons.length;
            const breakLength = callsPrefs.break.length;

            let currentTime: time = parseHHMM(callsPrefs.startTime);
            
            dayPrefs.lessons.forEach((lesson, lessonNumber) => {
                calls.push({
                    type: 'lesson',
                    start: currentTime,
                    end: mutateTime(lessonLength),
                    name: lesson.name
                })
                if (lessonNumber >= dayPrefs.lessons.length - 1) return
                if (callsPrefs.bigBreak.enabled) {
                    if (callsPrefs.bigBreak.afterLessons.includes(lessonNumber + 1)) {
                        calls.push({
                            type: 'big-break',
                            start: currentTime,
                            end: mutateTime(callsPrefs.bigBreak.length)
                        })
                        return
                    }
                }

                calls.push({
                    type: 'break',
                    start: currentTime,
                    end: mutateTime(breakLength)
                })
            })

            cache.combinedCalls[dayId] = calls;
        }

        return cache.combinedCalls[dayId]
    },

    getTasks: async (period: period) => {

    }
}

export default Data;