<template>
    <div class="calendar-container">
        <button>Previous</button>
        <button @click="handleSelectClick">Select</button>
        <button>Next</button>
    </div>
    <transition class="popup" v-if="showPopup">
        <Calendar />
    </transition>
</template>

<script setup lang="ts">
import type { date } from '@/data/types';
import Calendar from './Calendar.vue';
import { ref } from 'vue';

const showPopup = ref(false)
let popupTimer = 0;

const handleSelectClick = () => {
    clearTimeout(popupTimer)

    showPopup.value = !showPopup.value;
    popupTimer = setTimeout(() => {
        showPopup.value = false
    }, 2_000)
}

const props = defineProps<{
    date: date
}>()
</script>

<style scoped>
.popup {
    
}
</style>