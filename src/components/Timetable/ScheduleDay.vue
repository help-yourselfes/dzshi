<template>
    <div class="day" :day="day">
        <div class="head">
            {{ day.name }}
        </div>
        <div class="body">
            <div v-for="(lesson, index) in day.lessons" class="lesson">
                <div>
                    {{ index + 1 }}
                </div>
                <div>
                    {{ lesson.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { weekDayData } from '@/data/types';

export default {
    props: {
        day: {
            type: Object as () => weekDayData,
            required: true,
        },
    },
};
</script>
<style scoped>
.day {
    width: max-content;
    border-radius: 1rem;
    border: 0.0625rem solid var(--text)
}

html.mobile .day {
    width: unset;
}

.head,
.body {
    padding: .5rem;
}

.head {
    display: flex;
    flex-direction: row;
    font-size: 1rem;
    font-weight: 700;
}

.body {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
}

.lesson {
    display: inline-flex;
    gap: 0.5rem;
}
</style>