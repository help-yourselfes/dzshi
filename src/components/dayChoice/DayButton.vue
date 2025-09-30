<template>
    <button class="day-button">
        <span v-if="day===selected">
            {{ fullName }}

        </span>
        <span v-else>
            {{ shortName }}
        </span>
    </button>
</template>
<script setup lang="ts">
import type { dayInfo } from '@/data/types';
import { computed } from 'vue';

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

const shortName = computed(() => props.day['short-name'])
const fullName = computed(() => props.day.name)

</script>