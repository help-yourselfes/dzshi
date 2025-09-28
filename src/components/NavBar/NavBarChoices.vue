<script setup lang="ts">
import TasksIcon from '@/icons/TasksIcon.vue';
import NavButton from './NavButton.vue';
import CallsIcon from '@/icons/CallsIcon.vue';

</script>

<template>
    <NavButton to="/">
        <template #icon>
            <TasksIcon />
        </template>
        Домашка
    </NavButton>
    <NavButton to="/calls">
        <template #icon>
            <CallsIcon />
        </template>
        Звонки
    </NavButton>
</template>