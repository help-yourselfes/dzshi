<template>
    <a :href="media.link">
        <img v-if="media.preview.type === 'image'" class="image-preview" :src="media.preview.url" />
        <span v-else-if="media.preview.type === 'text'" class="text-preview">
            {{ media.preview.text }}
        </span>
        <div v-else class="error-preview">
            <span class="error">Error!</span>
        </div>
    </a>
</template>
<script setup lang="ts">
import type { media } from '@/data/types';

const props = defineProps<{
    media: media
}>();
</script>

<style scoped>
a>* {
    border-radius: 0.5rem;
    transition: scale 100ms ease-in-out;
}

a>*:hover {
    scale: 0.95;
}

.text-preview {
    display: block;
    padding: 0.5rem 1rem;
    background: skyblue;
    color: blue;
}

.image-preview {
    height: 2rem;
    background: linear-gradient(30deg, skyblue, blue);
}

.error-preview {
    background: linear-gradient(30deg, red, orange);
}


.preview {
    width: 5rem;
    aspect-ratio: 1;
    display: flex;
    align-content: center;
    justify-content: center;
    background: linear-gradient(gray, lightgray);
    border-radius: 0.2rem;
}

span {
    height: max-content;
    width: max-content;
    max-width: 80%;
}
</style>