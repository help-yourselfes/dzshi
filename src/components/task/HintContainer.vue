<template>
    <div class="container" v-if="hints.length">
        <span class="title">
            Есть решения для:
        </span>
        <div class="list">
            <TaskHint v-for="hint in hints" :hint :key="`${hint.text}:${hint.link}`" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { hint } from '@/data/types';
import TaskHint from './TaskHint.vue';

const props = defineProps<{
    hints: hint[]
}>()
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.title {
    font-weight: 600;
}

.list {
    display: flex;
    flex-direction: row;
    width: max-content;
    gap: 0.25rem;
}
</style>