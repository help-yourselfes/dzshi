<template>
    <DaySelect :dayId />
    <Transition name="calls">

    </Transition>
</template>

<script setup lang="ts">
import DaySelect from '@/components/Desktop/CallView/DaySelect.vue';
import type { UseDataResult } from '@/data/functions/useData';
import type { callInfo } from '@/data/types';

const props = defineProps<{
    dayId: number,
    calls: UseDataResult<callInfo[]>,
    currentCallId: UseDataResult<number>
}>()
</script>