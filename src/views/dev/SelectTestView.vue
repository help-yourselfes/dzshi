<template>
    <Select :choices> </Select>
    <Select :choices :default-choice="1"> </Select>
    <Select :choices :default-choice="3"> </Select>
</template>
<script setup lang="ts">
import Select from '@/components/primitives/selects/Select.vue';

const choices = [
    'Алабуга', "МелГУ", "Коменского", "В окно"
]

</script>
