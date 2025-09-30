<template>
    <RouterLink class="day-button" :to="`/calls/${day.number}`" @click="handleClick">
        <span v-if="day === selected">
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
    console.log('button clicks:', fullName.value)
}

const shortName = computed(() => props.day['short-name'])
const fullName = computed(() => props.day.name)

</script>