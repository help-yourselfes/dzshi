<template>

    <div class="month">
        <div class="week" v-for="week in month">
            <div class="day" v-for="day in [1, 2, 3, 4, 5, 6, 7]" :class="day > 5 ? 'holiday' : 'regular'">
                {{ 7 * week + day }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const month = ref([0, 1, 2, 3])
// make days list


</script>

<style scoped>
.month {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: min-content;
    padding: 1rem;
    border: 0.0625rem solid lightgray;
    border-radius: 1rem;
    margin: 0.5rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2);
}

.week {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
}

.day {
    width: 1rem;
    aspect-ratio: 1;
}

.day.holiday {
    color: red
}

.day.regular {
    color: blue
}
</style>