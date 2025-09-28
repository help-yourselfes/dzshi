<template>
    <span :time="time">
        {{ formattedTime }}
    </span>
</template>

<script lang="ts">
import type { time } from '@/data/types';
import { computed } from 'vue';

export default {
    props: {
        time: {
            type: Object as () => time,
            required: true,
        },
        delim: {
            type: String,
            default: ':',
            required: false
        }
    },
    setup(props) {
        const formatTime = (num: number) => (num < 10 ? `0${num}` : num.toString());

        const formattedTime = computed(() => {
            return `${formatTime(props.time.h)}${props.delim}${formatTime(props.time.m)}`;
        });

        return { formattedTime };
    }
}
</script>