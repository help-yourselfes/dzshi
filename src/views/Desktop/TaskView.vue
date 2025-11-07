<template>
    Task view
</template>

<script setup lang="ts">
import type { UseDataResult } from '@/data/functions/useData';
import type { date, task } from '@/data/types';


const props = defineProps<{
  date: date,
  tasks: UseDataResult<task[]>,
  untaskedLessons: UseDataResult<string[]>
}>()


</script>