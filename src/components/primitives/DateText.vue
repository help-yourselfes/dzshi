<template>
    {{ date.day }}{{ delimiter }}{{ date.month }}{{ delimiter }}{{ date.year % 2000 }}
</template>
<script setup lang="ts">
import type { date } from '@/data/types';

const props = defineProps({
    date: {
        type: Object as () => date,
        required: true
    },
    delimiter: {
        type: String,
        default: '.'
    }
})
</script>