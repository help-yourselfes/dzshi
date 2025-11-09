<template>
  {{ date.year }}.{{ date.month }}.{{ date.day }}
  <div class="calendar-bar">
  </div>
  
  <div v-if="tasks.loading.value">
    Загружаю&nbsp;
    <Spinner />
  </div>

  <div v-else-if="tasks.error.value">
    <div v-if="tasks.error.value?.message === '404'">
      На этот день пока не записано дз
    </div>
    <div v-else>
      Ошибка:
      {{ tasks.error }}
    </div>
  </div>

  <Container v-else-if="tasks.data.value">
    <div :class="isMobile ? 'task-list-mobile' : 'task-list-desktop'">
        <MobileTask v-for="task in tasks.data.value" :key="task.lesson" :task  />
    </div>

    <div class="bottom">
      <Spinner v-if="untaskedLessons.loading.value" />
      <span v-else-if="untaskedLessons.error.value">
        {{ untaskedLessons.error }}
      </span>
      <UntaskedLessonsList v-else-if="untaskedLessons.data.value" :list="untaskedLessons.data.value" />
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
import Spinner from '@/components/primitives/Spinner/Spinner.vue';
import MobileTask from '@/components/task/MobileTask.vue';
import UntaskedLessonsList from '@/components/TaskView/UntaskedLessonsList.vue';
import type { UseDataResult } from '@/data/functions/useData';
import type { date, lessonInfo, task } from '@/data/types';
import { computed } from 'vue';
import state from '@/store';



const isMobile = computed(() => state.isMobile);

const props = defineProps<{
  date: date,
  tasks: UseDataResult<task[]>,
  untaskedLessons: UseDataResult<string[]>
}>()
</script>
<style>
.view.tasks {
  flex-direction: column;
}
</style>

<style scoped>
.task-list-desktop {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
}

.task-list-mobile {
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
</style>