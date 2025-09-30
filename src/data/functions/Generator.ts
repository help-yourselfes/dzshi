import type { callData, dayData, schedulePrefs, time } from "../types";
import { addTime, parseHHMM } from "./time";


const Generator = {
    generateCalls: (callsPrefs: schedulePrefs, dayPrefs: dayData): callData[] => {
        function mutateTime(minutes: number) {
            currentTime = addTime(currentTime, minutes);
            return currentTime
        }
        const calls: callData[] = [];

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
        return calls
    }
}

export default Generator;