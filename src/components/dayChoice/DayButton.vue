<template>
    <RouterLink class="day-button" :class="current ? 'current' : ''" :to="`/calls/${day.number}`" @click="handleClick">
        <span v-if="current">
            {{ fullName }}

        </span>
        <span v-else>
            {{ shortName }}
        </span>
    </RouterLink>
</template>
<script setup lang="ts">
import type { dayInfo } from '@/data/types';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    day: {
        required: true,
        type: Object as () => dayInfo
    },
    selected: {
        required: true,
        type: Object as () => dayInfo | undefined
    }
})

const emit = defineEmits<{
    update: [newDayId: number]
}>();

const handleClick = () => {
    emit("update", props.day.number)
}

const shortName = computed(() => props.day['short-name'])
const fullName = computed(() => props.day.name)
const current = computed(() => props.day === props.selected)

</script>

<style scoped>
.day-button {
    text-decoration: none;
    font-size: 1.5rem;
    transition: all 300ms;
    border-radius: 999px;
    color: gray;
}

.current {
    background-color: lightgray;
    color: black;
    height: 3rem;
    display: inline-flex;
    padding: 0 2rem;
    align-items: center;
}
</style>