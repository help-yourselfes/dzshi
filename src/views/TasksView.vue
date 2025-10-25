<template>
  <div class="top">
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
    <div class="tasks-list" v-else>
      <component :is="isMobile ? MobileTask : DesktopTask" v-for="task in tasks" :task="task" />
    </div>
  </div>
  <div class="bottom">
    <LessonName id="alg" />
    <LessonName id="geo" />
    <LessonName id="geog" />
  </div>
</template>
<script setup lang="ts">
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

const { data: schedule } = useData(async () => {
  return api.getCalls
})

const route = useRoute();
const router = useRouter();

const date = computed<date>(() => {
  const q = route.query;
  const year = Number(q.year) || new Date().getFullYear();
  const month = Math.min(12, Math.max(1, Number(q.month) || new Date().getMonth() + 1));
  const day = Math.min(31, Math.max(1, Number(q.day) || new Date().getDate()));
  return { year, month, day };
});

const { data: tasks, error, loading } = useData(async () =>
  api.getTasks(testDate)
);

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
