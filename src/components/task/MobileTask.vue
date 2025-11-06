<template>
    <div class="task">
        <div class="head">
            <LessonName :id="task.lesson" />
        </div>
        <div class="body" :class="showButton ? 'trimmed-body' : ''">
            <div v-if="task.text" class="text">
                {{ task.text }}
            </div>
            <div v-if="showButton && isOpen" class="extra">
                <TaskMedia v-for="(media, key) in task.media" :media :key />
                <HintContainer v-if="task.hint" :hints="task.hint" />
            </div>
        </div>

        <button v-if="showButton" @click="handleClick" class="extra-button">
            {{ (isOpen) ? 'закрыть' : 'открыть' }}
        </button>
    </div>
</template>

<script setup lang="ts">
import type { task } from '@/data/types';
import TaskMedia from './TaskMedia.vue';
import LessonName from '../primitives/LessonName.vue';
import { computed, ref } from 'vue';
import HintContainer from './HintContainer.vue';


const showButton = computed(() => props.task.hint || props.task.media)

const isOpen = ref(false);

const handleClick = () => {
    isOpen.value = !isOpen.value
}

const props = defineProps<{
    task: task
}>()
</script>

<style scoped>
.task {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    border-radius: 1rem;
    background-color: lightgray;
    position: relative;
    z-index: -1;
    gap: 1rem;
}

.head {
    font-size: 1rem;
    font-weight: 600;
}

.body {
}

.trimmed-body {
    padding-right: 3.8rem;
}

.left {
    flex: 1;
}

.extra-button {
    position: absolute;
    bottom: 0.3rem;
    right: 0.3rem;
    border-radius: 0.7rem;
    border: none;
    width: 4rem;
    height: 2rem;
}

.placeholder {
    height: 1rem;
    width: 5rem;
}
</style>