import type { dayData, dayInfo, callsPrefs } from "../types"

type Storage = {
    getCallsPrefs: () => Promise<callsPrefs>
    getDayPrefs: (dayId: number) => Promise<dayData>
    getDaysInfo: () => Promise<dayInfo[]>
}

type GithubStorage = Storage & {
    path: {
        user: string,
        repo: string,
        branch: string | "main",
    },
    getPath: () => string
}

const Storage: GithubStorage = {
    path: {
        user: 'help-yourselfes',
        repo: 'dzshi-data',
        branch: 'main',
    },
    getPath() {
        const { user, repo, branch } = this.path;
        return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/`
    },
    async getCallsPrefs() {
        const path = this.getPath();
        try {
            const res = await fetch(path + `calls/callsPrefs.json`);
            const data = await res.json();
            return data
        } catch (e) {
            if (e instanceof Error) {
                const msg = e.message;
                console.error(msg)
                return new Promise((_, rej) => rej(msg))
            } else {
                console.error('Unknown error: ', e);
                return new Promise((_, rej) => rej('Unknown error'))
            }
        }
    },
    async getDayPrefs(dayId) {
        const path = this.getPath();
        try {
            const res = await fetch(path + `calls/${dayId}.json`);
            const data = await res.json();
            return data;
        } catch (e) {
            if (e instanceof Error) {
                const msg = e.message;
                console.error(msg)
                return new Promise((_, rej) => rej(msg))
            } else {
                console.error('Unknown error: ', e);
                return new Promise((_, rej) => rej('Unknown error'))
            }
        }
    },
    async getDaysInfo() {
        const path = this.getPath();
        try {
            const res = await fetch(path + `days/dayList.json`);
            const data = await res.json();
            return data.days;
        } catch (e) {
            if (e instanceof Error) {
                const msg = e.message;
                console.error(msg)
                return new Promise((_, rej) => rej(msg))
            } else {
                console.error('Unknown error: ', e);
                return new Promise((_, rej) => rej('Unknown error'))
            }
        }
    },
}
export default Storage