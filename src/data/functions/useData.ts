import { ref, type Ref, type UnwrapRef } from "vue"
export type UseDataResult<T> = {
  data: Ref<UnwrapRef<T> | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  reload: () => Promise<void>;
};

const useData = <T>(loadF: () => Promise<T>) => {
    const data = ref<T | null>(null)
    const error = ref<any>(null)
    const loading = ref(false)
    async function load() {
        loading.value = true;
        error.value = false;
        try {
            const res = await loadF();
            data.value = res;
        } catch (e) {
            error.value = e
        } finally {
            loading.value = false;
        }
    }
    
    load();

    return { data, error, loading, reload: () => load() }
}


export default useData