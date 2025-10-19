import type { weekDayData, weekDayInfo, callsPrefs, date } from "../types"

type Storage = {
    getCallsPrefs: () => Promise<callsPrefs>
    getDayPrefs: (dayId: number) => Promise<weekDayData>
    getDaysInfo: () => Promise<weekDayInfo[]>
} & any

const Storage: Storage = {
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
        console.log('request: ', url)
        const path = this.getPath();
        try {
            const res = await fetch(path + url);

            if (!res.ok) {
                return new Promise((_, rej) => rej({code: res.status}))
            }
            const data = await res.json();

            return data;
        } catch (e) {
            return new Promise((_, rej) => rej(e))
        }
    },
    async getCallsPrefs() {
        return this.request(`calls/callsPrefs.json`)
    },
    async getDayPrefs(dayId: number) {
        return this.request(`calls/${dayId}.json`);
    },
    async getDaysInfo() {
        const res = await this.request(`days/dayList.json`)
        if (res instanceof Array) return res
        else return res.days
    },

    async getTasks(date: date) {
        const year = date.year.toString();
        const month = date.month.toString().padStart(2, '0')
        const day = date.day.toString().padStart(2, '0')
        const url = `tasks/${year}/${month}/${day}.json`
        return this.request(url)
    }
}
export default Storage