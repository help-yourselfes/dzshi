<template>
    <main v-if="call.type === 'lesson'" class="lesson">
        {{ call.name }}
        <div class="time">
            <TimeSpan :time="call.start" />
            <TimeSpan :time="call.end" />
        </div>
    </main>
</template>
<script lang="ts">
import type { callData } from '@/data/types';
import TimeSpan from '../primitives/TimeSpan.vue';

export default {
    components: {
        TimeSpan
    },
    props: {
        call: {
            required: true,
            type: Object as () => callData
        },
        isAvctive: {
            required: false,
            default: false,
            type: Boolean
        }
    }
}
</script>
<style scoped>
html.mobile {

    main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;

    }

    .lesson {
        border-radius: 1rem;
        background: lightgray;
    }

    .big-break {
        justify-content: center;
    }

    .time {
        display: flex;
        flex-direction: column;
    }

}
</style>