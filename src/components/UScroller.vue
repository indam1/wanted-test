<template>
    <RecycleScroller
        id="scroller"
        v-slot="{ item }"
        :items="filteredLogs"
        :item-size="26"
        :page-mode="true"
        :emit-update="true"
        :buffer="1000"
        @update="update"
    >
        <div
            :id="item.id"
            class="logs"
            :style="{ backgroundColor: selectedLogId === item.id ? 'white' : ''}"
            :class="[item.isInInput ? 'logs_selected' : 'logs_default']"
        >
            <span :style="style(item.Level)">{{ item.Timestamp }}</span>
            <span :style="style(item.Level)">{{ item.Level }}</span>
            <span :style="style(item.Level)">{{ item.Message }}</span>
            <span :style="style(item.Level)">{{ item.Source }}</span>
        </div>
    </RecycleScroller>
</template>

<script setup lang="ts">
import {toRefs} from "vue";
import type {LogLevel} from "@/constants";
import useLogs from "@/composables/useLogs";

const props = defineProps<{
    filterValue: string
    selectionValue: string
    selectedLogId: string
}>();
const { selectionValue, filterValue } = toRefs(props);
const { filteredLogs } = useLogs(filterValue, selectionValue);

const update = (startIndex: number, endIndex: number) => console.log(startIndex, endIndex);

const color = (level: LogLevel) => {
    switch (level) {
        case 'TRACE':
            return 'green';
        case 'WARN':
        case 'INFO':
            return 'yellow';
        case 'DEBUG':
            return 'dodgerblue';
        case 'FATAL':
            return 'darkred';
        case 'ERROR':
            return 'red';
        default:
            return 'black';
    }
};

const style = (level: LogLevel) => ({ color: color(level) });
</script>

<style scoped>
.logs {
    display: flex;
    flex-direction: row;
    gap: 12px;
}

.logs_default {
    border-bottom: 1px solid grey;
}

.logs_selected {
    background: #2c3e50;
    border-bottom: 1px solid red;
}
</style>

