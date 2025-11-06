<template>
    <div v-if="call.type === 'lesson' || isCurrent" :class="classNames">
        <span :class="isCurrent ? 'active-name' : 'name'">
            {{ name }}
        </span>
        <div class="time">
            <TimeSpan :time="call.start" class="start" :class="isCurrent && 'fade-text'"/>
            <span v-if="isCurrent" class="remain-time">
                <RemainMinutes :end="call.end" />
            </span>
            <TimeSpan :time="call.end" class="end" :class="isCurrent && 'fade-text'"/>
        </div>
    </div>

</template>
<script setup lang="ts">
import type { callInfo } from '@/data/types';
import TimeSpan from '../primitives/TimeSpan.vue';
import { computed } from 'vue';
import RemainMinutes from '../primitives/RemainMinutes.vue';

const props = defineProps<{
    isCurrent?: boolean,
    call: callInfo
}>();

const name = computed(() => {
    const call = props.call;
    const { type } = call;
    switch (type) {
        case 'lesson':
            return call.name
        case 'break':
            return 'Перемена'
        case 'big-break':
            return "Большая перемена"
        default:
            return "Неизвестно"
    }
})

const classNames = computed(() => {
    return `${props.isCurrent ? 'current-call' : 'call'} ${props.call.type}`
})
</script>
<style scoped>
.call,
.current-call {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
}

.current-call {
    padding: 2rem;
}

.fade-text {
    opacity: 0.5;
}

html.mobile {

    .lesson {
        border-radius: 1rem;
        background: lightgray;
    }

    .big-break {
        justify-content: center;
    }

    .active-name {
        font-weight: 600;
    }

    .start,
    .end {
        width: max-content;
    }

    .remain-time {
        max-width: 5rem;
        width: max-content;
        text-align: end;
        line-height: 100%;
        font-weight: 600;
    }

    .time {
        display: flex;
        flex-direction: column;
        align-items: end;
    }

}
</style>