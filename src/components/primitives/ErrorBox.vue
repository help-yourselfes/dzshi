<template>
    <div class="box">
        <div class="icon">
            <UnknownIcon />
        </div>
        <div class="message">
            {{ error }}
        </div>
    </div>
</template>
<script setup lang="ts">
import UnknownIcon from '@/icons/UnknownIcon.vue';

const props = defineProps<{
    error: any
}>()
</script>

<style scoped>
.box {
    display: flex;
    flex-direction: row;
    padding: 1rem;
    border-radius: 1rem;
    color: red;
    background: orange;
    border: solid red 0.125rem;
}
</style>