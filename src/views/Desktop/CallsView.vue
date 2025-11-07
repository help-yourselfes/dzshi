<template>
    <DaySelect :dayId />
    <Transition name="loading">
        <WaitASecond v-if="calls.loading.value" />
    </Transition>
    <Transition name="calls">
        <main v-if="calls.data">
            <Call v-for="(call, id) in calls.data.value" :call :is-current="id === currentCallId.data.value" />
        </main>
    </Transition>
</template>

<script setup lang="ts">
import DaySelect from '@/components/Desktop/CallView/DaySelect.vue';
import WaitASecond from '@/components/primitives/Spinner/WaitASecond.vue';
import Call from '@/components/Desktop/CallView/Call.vue';
import type { UseDataResult } from '@/data/functions/useData';
import type { callInfo } from '@/data/types';

const props = defineProps<{
    dayId: number,
    calls: UseDataResult<callInfo[]>,
    currentCallId: UseDataResult<number>
}>()
</script>