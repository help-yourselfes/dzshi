<template>
  {{ date.year }}.{{ date.month }}.{{ date.day }}
  <div class="calendar-bar">
  </div>
  
  <div v-if="loading">
    Загружаю&nbsp;
    <Spinner />
  </div>

  <div v-else-if="error">
    <div v-if="error.code === 404">
      На этот день пока не записано дз
    </div>
    <div v-else>
      Ошибка:
      {{ error }}
    </div>
  </div>

  <Container v-else-if="tasks?.length">
    <div class="tasks-list">
      <component :is="isMobile ? MobileTask : DesktopTask" v-for="task in tasks" :task />
    </div>

    <div class="bottom">
      <Spinner v-if="untaskedLessons.loading.value" />
      <span v-else-if="untaskedLessons.error.value">
        {{ untaskedLessons.error }}
      </span>
      <Container v-else>
        <span class="untasked-text">
          Пока не задано / не заполнено:
        </span>
        <div class="untasked-lessons">
          <LessonName v-for="lesson in untaskedLessons.data.value" :id="lesson" :short-name="true" />
        </div>
      </Container>
    </div>
  </Container>

  <div v-else>
    <span class="no-tasks">
      На завтра нет дз
    </span>
  </div>
</template>
<script setup lang="ts">
import Container from '@/components/primitives/Container.vue';
import LessonName from '@/components/primitives/LessonName.vue';
import Spinner from '@/components/primitives/Spinner/Spinner.vue';
import DesktopTask from '@/components/task/DesktopTask.vue';
import MobileTask from '@/components/task/MobileTask.vue';
import api from '@/data/functions/Api';
import useData from '@/data/functions/useData';
import type { date } from '@/data/types';
import state from '@/store';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const isMobile = computed(() => state.isMobile);

const testDate: date = {
  day: 28,
  month: 10,
  year: 2025
}

const { data: tasks, error, loading } = useData(async () =>
  api.getTasks(testDate)
);

const untaskedLessons = useData(async () => {
  if (loading.value || error.value || !tasks.value) {
    return [];
  }

  const list = await api.getLessonList(api.getDateDayId(testDate));
  const taskedList = tasks.value.map(task => task.lesson);
  const untaskedList = list.filter(id => !taskedList.includes(id));

  return untaskedList;
});
watch(tasks, untaskedLessons.reload)

const route = useRoute();
const router = useRouter();

const date = computed<date>(() => {
  const q = route.query;
  const year = Number(q.year) || new Date().getFullYear();
  const month = Math.min(12, Math.max(1, Number(q.month) || new Date().getMonth() + 1));
  const day = Math.min(31, Math.max(1, Number(q.day) || new Date().getDate()));
  return { year, month, day };
});

watch(
  date,
  (d) => {
    router.replace({
      path: route.path,
      query: { ...route.query, year: String(d.year), month: String(d.month), day: String(d.day) }
    });
  },
  { immediate: true }
);
</script>

<style scoped>
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

}

.bottom {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}

.untasked-text {
  font-weight: 600;
}

.untasked-lessons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  row-gap: 0.2rem;
  padding: 0.75rem;
  background-color: lightgray;
  width: fit-content;
  max-width: 80vw;
  border-radius: 1rem;
}
</style>