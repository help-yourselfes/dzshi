<template>
    <span :time="time">
        <span v-if="time.h < 10">
            0{{ time.h }}
        </span>
        <span v-else>
            {{ time.h }}
        </span>{{ delim }}<span v-if="time.m < 10">
            0{{ time.m }}
        </span>
        <span v-else>
            {{ time.m }}
        </span>
    </span>
</template>

<script lang="ts">
import type { time } from '@/data/types';

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
    }
}
</script>