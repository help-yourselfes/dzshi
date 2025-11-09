import type { weekDayData, weekDayInfo, callsPrefs, date, task, lessonInfo } from "../types"

type githubT = {
    path: {
        user: string,
        repo: string,
        branch: string
    },
    getPath: () => string
}

type StorageT = {
    request: <T>(url: string) => Promise<T>
    getCallsPrefs: () => Promise<callsPrefs>
    getDayPrefs: (dayId: number) => Promise<weekDayData>
    getDaysInfo: () => Promise<weekDayInfo[]>
    getTasks: (date: date) => Promise<task[]>
    getLessonInfo: (id: string) => Promise<lessonInfo>
    getLessonList: () => Promise<string[][]>
} & githubT;

const Storage: StorageT = {
    path: {
        user: 'help-yourselfes',
        repo: 'dzshi-data',
        branch: 'main',
    },
    getPath() {
        const { user, repo, branch } = this.path;
        return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/`
    },
    async request(url: string) {
        const path = this.getPath();
        console.log('request: ', path + url)
        try {
            const res = await fetch(path + url);

            if (!res.ok) {
                return new Promise((_, rej) => rej({ code: res.status }))
            }
            const data = await res.json();
            // return new Promise((req) => setTimeout(() => req(data), 500));
            return data
        } catch (e) {
            return new Promise((_, rej) => rej(e))
        }
    },
    async getCallsPrefs() {
        return this.request(`calls/callsPrefs.json`)
    },
    async getLessonList() {
        return this.request(`calls/lessonsList.json`)
    },
    async getDayPrefs(dayId: number) {
        return this.request(`calls/${dayId}.json`);
    },
    async getDaysInfo() {
        return this.request(`days/dayList.json`)
    },

    async getTasks(date: date) {
        const year = date.year.toString();
        const month = date.month.toString().padStart(2, '0')
        const day = date.day.toString().padStart(2, '0')
        const url = `tasks/${year}/${month}/${day}.json`
        return this.request(url)
    },

    async getLessonInfo(id: string) {
        return this.request(`lessons/${id}.json`)
    }
}
export default Storage