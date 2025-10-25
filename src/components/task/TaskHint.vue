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
.hint {}
</style>