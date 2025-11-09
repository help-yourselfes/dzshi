<template>
    <RouterLink :to="media.link" class="media">
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

<style scoped>
.media {
    text-decoration: none;
    color: var(--accent);
    background-color: var(--accent-dark);
    padding: 0.25rem 1rem;
    border-radius: 0.5rem;
}
</style>