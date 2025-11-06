<template>
    {{ remainTime }} {{ minuteText }} до конца
</template>
<script setup lang="ts">
import {  currentTime, toMinutes } from '@/data/functions/time';
import useData from '@/data/functions/useData';
import type { time } from '@/data/types';
import { computed, onUnmounted } from 'vue';

const props = defineProps<{
    end: time
}>()

const time = useData<time>(async () => currentTime())

const remainTime = computed(() => {
    if (!time.data.value) return 0
    return toMinutes(props.end) - toMinutes(time.data.value);

})
const timer = setInterval(time.reload, 40_000);
onUnmounted(() => clearInterval(timer))


const minuteText = computed(() => {
    if (!time.data.value) return 'минут'

    if (remainTime.value >= 5 && remainTime.value <= 20) return 'минут'
    switch (remainTime.value % 10) {
        case 0:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        default:
            return 'минут'
        case 1:
            return 'минута'
        case 2:
        case 3:
        case 4:
            return 'минуты'
    }

})

</script>
<style scoped></style>