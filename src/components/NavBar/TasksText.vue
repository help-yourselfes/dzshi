<script setup lang="ts">
import TasksIcon from '@/icons/TasksIcon.vue';
import IconText from './IconText.vue'
</script>

<template>
    <IconText>
        <template #icon>
            <TasksIcon style="fill: var(--text)"/>
        </template>
        Задания
    </IconText>
</template>