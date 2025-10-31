<template>
    <div class="task">
        <div class="head">
            <LessonName :id="task.lesson" />
        </div>
        <div class="body">
            <div v-if="task.text" class="text">
                {{ task.text }}
            </div>
            <div v-if="task.media || task.hint" class="extra">
                <TaskMedia v-for="media in task.media" :media />
                <HintContainer v-if="task.hint" :hints="task.hint" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { task } from '@/data/types';
import TaskMedia from './TaskMedia.vue';
import LessonName from '../primitives/LessonName.vue';
import HintContainer from './HintContainer.vue';

const props = defineProps<{
    task: task
}>()
</script>

<style scoped>
.task {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 16rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: lightgray;
}

.head {
    padding-bottom: 1rem;
}

.body {
    display: flex;
    flex-direction: row;
}
</style>