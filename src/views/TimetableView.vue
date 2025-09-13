<template>
    <div>
        <h1>Расписание</h1>
        <div class="schedule">
            <ScheduleDay v-for="(day, index) in week" :key="index" :day="day" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import type { week } from '@/data/types';
import TimeTable from '@/data/functions/timetable';
import ScheduleDay from '@/components/Timetable/ScheduleDay.vue';

export default defineComponent({
    components: {
        ScheduleDay,
    },
    setup() {
        const weekData = ref<week>([]);

        onMounted(async () => {
            try {
                weekData.value = await TimeTable.getWeek();
            } catch (error) {
                console.error('Error fetching week data:', error);
            }
        });

        return {
            week: weekData,
        };
    },
});
</script>

<style scoped>
.schedule {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
}

html.mobile .schedule {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
}
</style>