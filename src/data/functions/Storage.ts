import type { dayData, schedulePrefs } from "../types"

type storage = {
    getCallsPrefs: () => Promise<schedulePrefs>
    getDayPrefs: (dayId: number) => Promise<dayData>
}

type GithubStorage = storage & {
    path: {
        user: string,
        repo: string,
        branch: string | "main",
    },
    getPath: () => string
}

const storage: GithubStorage = {
    path: {
        user: 'help-yourselfes',
        repo: 'dzshi-data',
        branch: 'main',
    },
    getPath() {
        const { user, repo, branch } = this.path;
        const path: string = `https://raw.githubusercontent/${user}/${repo}/${branch}/`;
        return path;
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
}
export default storage