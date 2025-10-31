<template>
    <a :href="hint.link" class="hint">
        {{ hint.text }}
    </a>

</template>

<script setup lang="ts">
import type { hint } from '@/data/types';

const props = defineProps<{
    hint: hint
}>()
</script>


<style scoped>
.hint {
    text-decoration-line: none;
    font-style: italic;
    display: block;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: gray;
    color: black;
}
</style>