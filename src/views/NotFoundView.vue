<script setup lang="ts">
import NotFoundSticker from '@/components/stickers/NotFoundSticker.vue';

</script>

<template>
    <span class="text">
        Такого рута еще нет
        <RouterLink to="/" class="button">На главную</RouterLink>
    </span>
    <NotFoundSticker class="sticker" />
</template>

<style>
.view.notFound {
    flex-direction: column;
    gap: 1rem;
}
</style>

<style scoped>
.sticker {
    width: 16rem;
}

.text {
    display: inline-flex;
    gap: 1rem;
    align-items: center;
}

.button {
    padding: 0.625rem 1rem;
    background-color: var(--accent);
    border-radius: 0.5rem;
    color: var(--text);
    text-decoration: none;
}
</style>
