<template>
    <component :is="AsyncComponent" 
        :calls
        :dayId
        :currentCallId
    />
</template>

<script setup lang="ts">
import { useResponsiveAsyncView } from './useResponsiveAsyncView';

const { AsyncComponent } = useResponsiveAsyncView('calls');

import api from '@/data/functions/Api';
import useData from '@/data/functions/useData';
import type { callInfo } from '@/data/types';
import { onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const dayId = ref<number>(0);

const calls = useData<callInfo[]>(
    async () => {
        const day = parseInt(route.params.dayId as string) || (await api.getCurrentDayId())

        if (dayId.value !== day) {
            router.replace(`/calls/${day}`)
        }

        dayId.value = day;
        const res = await api.getCalls(day);
        return res
    }
)

watch(() => route.params.dayId, calls.reload)

const currentCallId = useData<number>(async () =>
    await api.getCurrentCallId(dayId.value)
)
watch(() => calls.data.value?.length, currentCallId.reload)

const timer = setInterval(currentCallId.reload, 60_000);
onUnmounted(() => {
    clearInterval(timer)
})


</script>
