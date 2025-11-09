<!-- 
    have not implement
    calendar yet    :(
-->
<template>
    <div class="calendar-wrapper">
        <span class="header">
            Выбранный день: <span class="selected-day custom">
                {{ dayName }}, {{ date.day }}
            </span>
        </span>
        <div class="body">
            <div class="option active">
                <div class="dot custom"></div>
                <div class="date-select">
                    <Select :choices="daysList" />
                    <Select :choices="monthList" />
                    <Select :choices="yearsList" />
                </div>
            </div>
            <div class="option">
                <div class="dot tommorow"></div>
                <div class="option-description">
                    Завтра
                    <span class="date-text">
                        <DateText :date="tomorrowD" />
                    </span>
                </div>
            </div>
            <div class="option">
                <div class="dot after-tommorow"></div>
                <div class="option-description">
                    Послезавтра
                    <span class="date-text">
                        <DateText :date="afterTomorrowD" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DateText from '@/components/primitives/DateText.vue';
import Select from '@/components/primitives/selects/Select.vue';
import api from '@/data/functions/Api';
import { aviableYears, getDayName, getMonthLength, monthNames } from '@/data/functions/time';
import type { date } from '@/data/types';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
    date: date
}>()

const dayName = computed(() => getDayName(api.getDateDayId(props.date)))

const daysList = computed(() => {
    const list = [];
    const length = getMonthLength(props.date.month - 1);
    for (let i = 1; i <= length; i++ ) list.push(i.toString())
    return list;
})

const monthList = monthNames;
const yearsList = aviableYears.map(year => year.toString());

const tomorrowD = computed<date>(() => ({ day: 9, month: 11, year: 2025 }))
const afterTomorrowD = computed<date>(() => ({ day: 10, month: 11, year: 2025 }))

const router = useRouter();
const changeDate = (date: date) => {
    router.push({ path: '/tasks', query: { ...date } });
}
</script>

<style scoped>
.calendar-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    border-radius: 1.5rem;
    border: 0.125rem solid var(--top);
}

.header {
    display: inline-flex;
    gap: 1rem;
    text-align: center;
}

.selected-day {
    color: var(--text);
}

.selected-day.custom {
    color: var(--accent);
}

.selected-day.tommorow {
    color: var(--deaccent);
}


.body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.option {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
}

.dot {
    aspect-ratio: 1;
    width: 2.5rem;
    position: relative;
    border-radius: 0.5rem;
}

.option.active .dot {
    box-sizing: content-box;
    background-color: var(--top);
    border-top: 0.125rem solid var(--light);
}

.dot::before {
    content: '';
    position: absolute;
    transform: translate(50%, 50%);
    display: block;
    height: 1rem;
    aspect-ratio: 1;
    background-color: var(--input);
    border-radius: 100%;
}

.dot.custom::before {
    background-color: var(--accent);
}

.dot.tommorow::before {
    background-color: var(--deaccent);
}

.dot.after-tommorow::before {
    background-color: var(--top);
}

.option-description,
.date-select {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    padding: 0.5rem 1.25rem;
    border-radius: 0.5rem;
}

.date-select {
    background-color: var(--input);
}

.option-description {
    background-color: var(--middle);
}

.date-text {
    color: var(--light)
}
</style>