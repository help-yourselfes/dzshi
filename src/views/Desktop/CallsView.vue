<template>
    Calls view desktop
</template>

<script setup lang="ts">
import type { UseDataResult } from '@/data/functions/useData';
import type { callInfo } from '@/data/types';

const props = defineProps<{
    dayId: number,
    calls: UseDataResult<callInfo[]>,
    currentCallId: UseDataResult<number>
}>()
</script>