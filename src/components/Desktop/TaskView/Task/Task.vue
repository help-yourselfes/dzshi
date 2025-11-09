<template>
    <div v-if="task.text && (task.media?.length || task.hint?.length)" class="task h">
        <div class="left">
            <div class="header">
                <LessonName :id="task.lesson" />
            </div>
            <div class="body text">
                {{ task.text }}
            </div>
        </div>
        <div class="right">
            <Media v-for="media in task.media" :media />
        </div>
    </div>
    <div v-else-if="!(task.text) && (task.media?.length || task.hint?.length)" class="task v">
        <div class="header">
            <LessonName :id="task.lesson" />
        </div>
        <div class="body">
            <Media v-for="media in task.media" :media />
        </div>
    </div>
    <div v-else-if="(task.text) && !(task.media?.length || task.hint?.length)" class="task v">
        <div class="header">
            <LessonName :id="task.lesson" />
        </div>
        <div class="body text" >
            {{ task.text }}
        </div>
    </div>
</template>
<script setup lang="ts">
import LessonName from '@/components/primitives/LessonName.vue';
import type { task } from '@/data/types';
import Media from './Media.vue';

const props = defineProps<{
    task: task
}>()
</script>

<style scoped>
.task {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: var(--middle);
    border-radius: 1rem;
}

.h {
    flex-direction: row;
}

.header {
    display: inline-flex;
    justify-content: center;
    height: 3.5rem;
    background-color: var(--top);
    border-radius: 1rem 1rem 0 0;
    align-items: center;
    font-size: 1.5rem;
}

.left, .body {
    flex: 1;
}

.left {
    display: flex;
    flex-direction: column;
}

.body {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.text {
    display: inline;
}

.v {
    flex-direction: column;
}
</style>