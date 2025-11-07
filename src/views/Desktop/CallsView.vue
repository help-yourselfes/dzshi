<template>
    <DaySelect :dayId />
    <Transition name="loading">
        <WaitASecond v-if="calls.loading.value" class="content"/>
    </Transition>
    <Transition name="calls">
        <main v-if="!calls.loading.value && !calls.error.value" class="content">
            <Call v-for="(call, id) in calls.data.value" :call :is-current="id === currentCallId.data.value" />
            Всего уроков: {{ totalLessons }}
        </main>
    </Transition>
</template>

<script setup lang="ts">
import DaySelect from '@/components/Desktop/CallView/DaySelect.vue';
import WaitASecond from '@/components/primitives/Spinner/WaitASecond.vue';
import Call from '@/components/Desktop/CallView/Call.vue';
import type { UseDataResult } from '@/data/functions/useData';
import type { callInfo } from '@/data/types';
import { computed } from 'vue';

const props = defineProps<{
    dayId: number,
    calls: UseDataResult<callInfo[]>,
    currentCallId: UseDataResult<number>
}>()

const totalLessons = computed(() => props.calls.data.value?.filter(d => d.type === 'lesson').length)
</script>

<style>
.view {
    gap: 4rem;
}
</style>

<style scoped>
.content {
    min-width: 27rem;
    padding: 0 0.75rem;
}

main {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    text-align: center;
    color: var(--light)
}
</style>