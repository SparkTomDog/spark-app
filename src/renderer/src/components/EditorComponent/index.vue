<template>
    {{ data.label }}
</template>

<script setup lang="ts">
import { baseType } from '@t/index';
import { ref } from 'vue';

const props = defineProps<{
    data: baseType
}>()
const data = ref<baseType>(props.data)
</script>