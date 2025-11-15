<template>
    <Placeholder v-if="loading" class="placeholder" />
    <span v-else-if="error" class="error">
        {{ id }}
    </span>
    <span v-else>
        {{ shortName && lesson?.shortName ? lesson.shortName :lesson?.name  }}
    </span>
</template>

<script setup lang="ts">
import api from '@/data/functions/Api';
import useData from '@/data/functions/useData';
import Placeholder from './Placeholder.vue';

const props = defineProps<{
    id: string,
    shortName?: boolean
}>();

const { data: lesson, error, loading } = useData(() => api.getLessonInfo(props.id))
</script>

<style scoped>
.placeholder {
    height: 1rem;
    width: 5rem;
}

.error {
    border: 0.125rem solid orangered;
    padding: 0.25rem;
    border-radius: 0.25rem;
    color: orange;
}
</style>