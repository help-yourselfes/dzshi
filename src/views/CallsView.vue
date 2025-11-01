<template>
    <DaySelect :selectedDayId="dayId" />
    <div v-if="!(loading || error)">
        <div class="list">
            <Call v-for="(call, index) in calls" :call="call" :key="index"></Call>
        </div>
    </div>
    <div v-else>
        <div v-if="loading">
            Загружаю ...
        </div>
        <div v-else>
            {{ error }}
        </div>
    </div>
</template>

<script setup lang="ts">
import Call from '@/components/Calls/Call.vue';
import DaySelect from '@/components/dayChoice/DaySelect.vue';
import api from '@/data/functions/Api';
import useData from '@/data/functions/useData';
import type { callInfo } from '@/data/types';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const dayId = ref<number>(1);
const { data: calls, error, loading, reload: reloadCalls } = useData<callInfo[]>(
    async () => {
        const day = parseInt(route.params.dayId as string) || (await api.getCurrentDayId())

        if (dayId.value !== day) {
            router.replace(`/calls/${day}`)
        }

        dayId.value = day;
        const res: callInfo[] = await api.getCalls(day);
        return res

    }
)

watch(() => route.params.dayId, () => {
    reloadCalls()
})

</script>
<style scoped>
html.mobile {
    .list {
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
    }
}
</style>