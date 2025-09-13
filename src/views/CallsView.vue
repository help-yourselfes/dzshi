<template>
    <div>
        <h1>Звонки</h1>
        <div v-if="schedule.generated" class="schedule">
            <div v-for="(part, index) in schedule.parts" :key="index" :part="part">
                <div v-if="part.type === 'lesson'">
                    {{ part.number }} Урок
                    <TimeSpan :time="part.start" /> -
                    <TimeSpan :time="part.end" />
                </div>
                <div v-else-if="part.type === 'break'">
                    Перемена
                    {{ part.length }} минут
                </div>
                <div v-else>
                    Большая перемена
                    <TimeSpan :time="part.start" />
                </div>
            </div>
        </div>
        <div v-else>
            Загружаю...
        </div>
    </div>
</template>

<script lang="ts">
import TimeSpan from '@/components/primitives/TimeSpan.vue';
import { getSchedule, type schedule } from '@/data/functions/callsSchedule';
import { currentPart } from '@/data/functions/current';
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
    components: {
        TimeSpan
    },
    setup() {
        const scheduleData = ref<schedule>({ generated: false });

        onMounted(async () => {
            try {
                scheduleData.value = await getSchedule();
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        });

        return {
            schedule: scheduleData,
        };
    },
})
</script>
<style scoped></style>