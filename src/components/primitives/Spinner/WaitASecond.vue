<script setup lang="ts">
import Spinner from './Spinner.vue';

</script>

<template>
    <span class="wait">
        Секундочку <Spinner />
    </span>
</template>

<style scoped>
.wait {
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
    align-items: baseline;
}
</style>