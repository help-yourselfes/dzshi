<template>
    <div>
        {{ text }}
    </div>
</template>

<script setup lang="ts">
import type { date } from '@/data/types';
import { computed } from 'vue';

const props = defineProps<{
    date: date
}>()

const text = computed(() => {
    const { month, day } = props.date;
    return `${month}/${day}`;
})
</script>