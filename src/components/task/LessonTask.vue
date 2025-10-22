<template>
    <div class="task">
        <div class="head">
            <Placeholder class="placeholder" v-if="lesson.loading.value" />
            <span v-else-if="lesson.error.value">{{ lesson.error.value }}</span>
            <span v-else>
                {{ lesson.data.value?.name }}
            </span>
        </div>
        <div class="body">
            <div v-if="task.text" class="text">
                {{ task.text }}
            </div>
            <div v-if="task.media || task.hint" class="extra">
                <div v-for="media in task.media">
                    {{ media.link }}
                </div>
                <div v-for="hint in task.hint">
                    {{ hint }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import api from '@/data/functions/Api';
import useData from '@/data/functions/useData';
import type { task } from '@/data/types';
import Placeholder from '../primitives/Placeholder.vue';

const props = defineProps<{
    task: task
}>()

const lesson = useData(async () =>
    await api.getLessonInfo(props.task.lesson)
)
</script>

<style scoped>
.task {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 1rem;
    background-color: lightgray;
}

.head {
    padding-bottom: 1rem;
}

.placeholder {
    height: 1rem;
    width: 5rem;
}
</style>