<script setup lang="ts">
import CallsIcon from '@/icons/CallsIcon.vue';
import Text from './IconText.vue';
</script>

<template>
    <Text>
        <template #icon>
            <CallsIcon />
        </template>
        Звонки
    </Text>
</template>