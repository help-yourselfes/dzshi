<template>
    <div v-if="call.type === 'lesson' || isCurrent" :class="{
        'call': !isCurrent,
        'current-call': isCurrent,
        'lesson': type === 'lesson',
        'big-break': type === 'big-break',
        'break': type === 'break'
    }">
        <span :class="isCurrent ? 'active-name' : 'name'">
            {{ name }}
        </span>
        <div class="time">
            <TimeSpan :time="call.start" class="start" :class="isCurrent && 'fade-text'" />
            <span v-if="isCurrent" class="remain-time">
                <RemainMinutes :end="call.end" />
            </span>
            <TimeSpan :time="call.end" class="end" :class="isCurrent && 'fade-text'" />
        </div>
    </div>

</template>
<script setup lang="ts">
import RemainMinutes from '@/components/primitives/RemainMinutes.vue';
import TimeSpan from '@/components/primitives/TimeSpan.vue';
import type { callInfo } from '@/data/types';
import { computed } from 'vue';

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

const type = computed(() => props.call.type)

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
    padding: 2.25rem;
}

.fade-text {
    opacity: 0.5;
}

.lesson {
    border-radius: 1rem;
    background: var(--middle);
}

.big-break {
    justify-content: center;
}

.name, .active-name {
    font-size: 1.25rem;
    color: var(--text);
}

.active-name {
    font-weight: var(--f_semi-bold);
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
    font-weight: var(--f_semi-bold);
    font-size: 1.25rem;
}

.time {
    display: flex;
    flex-direction: column;
    align-items: end;
}
</style>