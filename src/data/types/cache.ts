type cacheElem<T> = {
    value: T,
    lifeEnd: number
}

const minute = 60_000;
const hour = 60 * minute;

const createCache = (autoCleanTime: number = 0.5 * hour) => {
    const store = new Map<string, cacheElem<any>>();

    const interval = setInterval(clean, autoCleanTime)

    const stopInterval = () => {
        clearInterval(interval)
    }

    function clean() {
        const now = Date.now();
        store.forEach((v, key) => {
            if (now > v.lifeEnd)
                clear(key)
        })
    }

    function get(key: string) {
        if (store.has(key)) return store.get(key)?.value
        else return undefined
    }

    function set(key: string, value: any, lifeLength: number) {
        store.set(key, { value, lifeEnd: Date.now() + lifeLength })
    }

    function clear(key?: string) {
        if (key) store.delete(key)
        else store.clear()
    }

    async function once<T>(key: string, loader: () => Promise<T>, lifeLength = minute): Promise<T> {
        if (store.has(key)) return store.get(key)!.value;

        try {
            const value = await loader();

            set(key, value, lifeLength);
            return store.get(key)!.value;
        } catch (e) {
            return new Promise((_, rej) => rej(e))
        }
    }


    return { clear, once, stopInterval }
}


export default createCache