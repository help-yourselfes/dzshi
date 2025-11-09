import type { callInfo, weekDayData, weekDayInfo, callsPrefs, time, date, lessonInfo, task } from "../types"
import { createCache } from "../types";
import generator from "./Generator";
import Storage from "./Storage";
import { currentTime, isBetween } from "./time";

const cache = createCache();
const get = cache.once;

const api = {
    getRandomSticker: () => {},
    getCallsPrefs: (): Promise<callsPrefs> =>
        get('callsPrefs', () =>
            Storage.getCallsPrefs()
        )
    ,

    getCurrentDayId: async () =>
        (new Date()).getDay()
    ,

    getCurrentDay: async (): Promise<weekDayInfo> => {
        return (await get('currentDay', async () => {
            const dayId = await api.getCurrentDayId()
            const days = await api.getDaysInfo();

            const day = days.find(d => d.number === dayId);

            return day ? day : (new Promise<weekDayInfo>((_, rej) => rej('Not supported day')))
        }))
    },

    getDateDayId: (date: date): number =>
        new Date(date.year, date.month - 1, date.day).getDay()
    ,
    getDayPrefs: (dayId: number): Promise<weekDayData> =>
        get(`dayPrefs:${dayId}`, () =>
            Storage.getDayPrefs(dayId)
        )
    ,

    getDaysInfo: (): Promise<weekDayInfo[]> =>
        get('daysInfo', () =>
            Storage.getDaysInfo()
        )
    ,

    getAviableDays: async (): Promise<weekDayInfo[]> =>
    (await get('aviableDays', async () => {
        const callsPrefs = await api.getCallsPrefs();
        if (!callsPrefs) throw new Error('No callsPrefs provided!')

        const days = await api.getDaysInfo();
        if (!days) throw new Error('No days provided!')
        return days.filter((v: weekDayInfo) => callsPrefs.days.includes(v.number));
    }))
    ,

    getCalls: async (dayId: number): Promise<callInfo[]> => {
        const days = await api.getAviableDays();
        if (!days.find(v => v.number === dayId)) return new Promise((_, rej) =>
            rej(`unsupported day`)
        )
        return (await get(`getCalls:${dayId}`, async () => {
            const callsPrefs = await api.getCallsPrefs();
            const dayPrefs = await api.getDayPrefs(dayId);

            return generator.generateCalls(callsPrefs, dayPrefs);
        }))
    },

    getCallIdFromTime: async (time: time, dayId: number) =>
        get(`callFromTime:${time.h}:${time.m}:${dayId}`, async () => {
            const calls = await api.getCalls(dayId);
            let id = -1;
            calls.forEach((call, index) => {
                if (isBetween(time, call.start, call.end))
                    id = index;
            })
            return new Promise<number>((req, rej) => id >= 0 ? req(id) : rej('no call'))
        }),

    getCurrentCallId: async (dayId: number) =>
        get('currentCall', async () =>
            api.getCallIdFromTime(currentTime(), dayId)
        , 59_000),

    getFullLessonsIdList: (): Promise<string[][]> =>
        get(`getFullLessonsList`, async () => Storage.getLessonList())
    ,

    getLessonList: async (dayId: number): Promise<string[]> => {
        const days = await api.getAviableDays();
        if (!days.find(v => v.number === dayId)) return new Promise((_, rej) =>
            rej(`That day is not aviable: ${dayId}.\n Aviable days: ${days.map(d => d.name).join(', ')}`)
        )

        return (await get(`getLessonList:${dayId}`, async () =>
            (await api.getFullLessonsIdList())[dayId - 1]
        ))
    },

    getTasks: (date: date): Promise<task[]> =>
        get(`tasks:${date.year}/${date.month}/${date.day}`, async () =>
            Storage.getTasks(date)
        ),

    getLessonInfo: (id: string): Promise<lessonInfo> =>
        get(`lessonInfo:${id}`, () =>
            Storage.getLessonInfo(id)
        )

}

export default api;