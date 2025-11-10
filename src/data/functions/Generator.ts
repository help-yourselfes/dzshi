import type { callInfo, weekDayData, callsPrefs, time } from "../types";
import { addTime, parseHHMM } from "./time";


const generator = {
    generateCalls: (callsPrefs: callsPrefs, lessonsList: string[]): callInfo[] => {
        function mutateTime(minutes: number) {
            currentTime = addTime(currentTime, minutes);
            return currentTime
        }
        const calls: callInfo[] = [];

        const lessonLength = callsPrefs.lessons.length;
        const breakLength = callsPrefs.break.length;

        let currentTime: time = parseHHMM(callsPrefs.startTime);

        lessonsList.forEach((lesson, lessonNumber) => {
            calls.push({
                type: 'lesson',
                start: currentTime,
                end: mutateTime(lessonLength),
                id: lesson
            })
            if (lessonNumber >= lessonsList.length - 1) return
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
        return calls
    }
}

export default generator;