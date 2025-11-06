<script setup lang="ts">
import CallsIcon from '@/icons/CallsIcon.vue';
import IconText from './IconText.vue';
</script>

<template>
    <IconText>
        <template #icon>
            <CallsIcon />
        </template>
        Звонки
    </IconText>
</template>