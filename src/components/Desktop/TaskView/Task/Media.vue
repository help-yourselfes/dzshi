<template>
    <RouterLink :to="media.link">
        <img v-if="media.preview.type === 'image'" :src="media.preview.url" />
        <span v-if="media.preview.type === 'text'">
            {{ media.preview.text }}
        </span>
    </RouterLink>
</template>
<script setup lang="ts">
import type { media } from '@/data/types';

const props = defineProps<{
    media: media
}>();
</script>