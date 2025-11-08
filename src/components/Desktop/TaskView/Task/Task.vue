<template>
    <div v-if="task.text && (task.media?.length || task.hint?.length)" class="task">
        <div class="left">
            <div class="header">
                <LessonName :id="task.lesson" />
            </div>
            <div class="body">
                {{ task.text }}
            </div>
        </div>
        <div class="right">
            <Media v-for="media in task.media" :media />
        </div>
    </div>
    <div v-else-if="!(task.text) && (task.media?.length || task.hint?.length)" class="task">
        <div class="header">
            <LessonName :id="task.lesson" />
        </div>
        <div class="body">
            <Media v-for="media in task.media" :media />
        </div>
    </div>
    <div v-else-if="(task.text) && !(task.media?.length || task.hint?.length)" class="task">
        <div class="header">
            <LessonName :id="task.lesson" />
        </div>
        <div class="body">
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