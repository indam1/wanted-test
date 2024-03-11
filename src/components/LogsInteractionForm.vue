<template>
    <input
        v-model="selectionValue"
        type="text"
    >
    <span>{{ selectedLogs.length }}</span>
    <button
        v-if="selectedLogs.length"
        v-scroll-to="{ el: `#${selectedLogs[counter].id}` }"
        @click="counter++; selectedLogId = selectedLogs[counter].id;"
    >
        Scroll To
    </button>
</template>

<script setup lang="ts">
import {ref, toRefs} from "vue";
import useLogs from "@/composables/useLogs";

const selectionValue = defineModel<string>('selectionValue');
const selectedLogId = defineModel<string>('selectedLogId');

const props = defineProps<{
    filterValue: string
}>();

const { filterValue } = toRefs(props);
const { selectedLogs } = useLogs(filterValue, selectionValue);
const counter = ref(0);
</script>

<style scoped>

</style>
