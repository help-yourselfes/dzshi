<template>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="dropdown-arrow" :class="isOpended ? 'open': ''">
        <path d="M12 15L7 10H17L12 15Z"/>
    </svg>
</template>

<script setup lang="ts">
const props = defineProps({
    isOpended: {
        required: false,
        default: false,
        type: Boolean
    }
})
</script>

<style scoped>
.dropdown-arrow {
    aspect-ratio: 1;
    transform-origin: 50% 50%;
}

.open {
    rotate: -90deg;

}
</style>