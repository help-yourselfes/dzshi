<script setup lang="ts">
import CallsText from './CallsText.vue';
import NavButton from './NavButton.vue';
import TasksText from './TasksText.vue';

</script>

<template>
    <NavButton to="/">
        <TasksText />
    </NavButton>
    <NavButton to="/calls">
        <CallsText />
    </NavButton>
</template>