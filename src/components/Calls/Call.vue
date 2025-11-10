<template>
    <div v-if="call.type === 'lesson' || isCurrent" :class="classNames">
        <LessonName v-if="call.type === 'lesson'" :id="call.id" :class="nameClass" />
        <span :class="nameClass" v-else>
            {{ call.type === 'big-break' ?
                'Большая перемена' :
                'Перемена'
            }}
        </span>
        <div class="time">
            <TimeSpan :time="call.start" class="start" :class="{ 'fade-text': isCurrent }" />
            <span v-if="isCurrent" class="remain-time">
                <RemainMinutes :end="call.end" />
            </span>
            <TimeSpan :time="call.end" class="end" :class="{ 'fade-text': isCurrent }" />
        </div>
    </div>

</template>
<script setup lang="ts">
import type { callInfo } from '@/data/types';
import TimeSpan from '../primitives/TimeSpan.vue';
import { computed } from 'vue';
import RemainMinutes from '../primitives/RemainMinutes.vue';
import LessonName from '../primitives/LessonName.vue';

const props = defineProps<{
    isCurrent?: boolean,
    call: callInfo
}>();

const nameClass = computed(() => props.isCurrent ? 'active-name' : 'name')

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
    border-radius: 1rem;
}

.current-call {
    padding: 1.5rem;
    background: var(--top);
}

.current-call.lesson {
    background: var(--accent);
}

.fade-text {
    color: var(--text);
    opacity: 0.5;
}

.lesson {
    background: var(--middle);
}

.name, .active-name {
    color: var(--text);
}

.active-name {
    font-weight: var(--bold);
}

.start,
.end {
    width: max-content;
    color: var(--light)
}

.remain-time {
    max-width: 6rem;
    width: max-content;
    text-align: end;
    line-height: 100%;
    font-weight: var(--bold)
}

.time {
    display: flex;
    flex-direction: column;
    align-items: end;
}
</style>