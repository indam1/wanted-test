<template>
    <RecycleScroller
        v-slot="{ item }"
        :items="resultLogs"
        :item-size="24"
        :page-mode="true"
    >
        <div class="logs">
            <span :style="style(item.Level)">{{ item.Timestamp }}</span>
            <span :style="style(item.Level)">{{ item.Level }}</span>
            <span :style="style(item.Level)">{{ item.Message }}</span>
            <span :style="style(item.Level)">{{ item.Source }}</span>
        </div>
    </RecycleScroller>
</template>

<script setup lang="ts">
import {computed} from "vue";
import type {LogItem} from "../../types/Items";
import {useSubscription} from "@/composables/useSubscription";
import type {LogLevel} from "@/constants";

const { logs } = useSubscription();

const props = defineProps<{
    filterValue: string
}>();

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

const style = (level: LogLevel) => ({
    color: color(level),
    'border-bottom': '1px solid grey',
});

const resultLogs = computed(() => logs.value.reduce<Array<LogItem>>((res, item, index) => {
    if (props.filterValue && props.filterValue !== item.Level) {
        return res;
    }

    res.push({...item, id: index});
    return res;
}, []));
</script>

<style scoped>
.logs {
    display: flex;
    flex-direction: row;
    gap: 12px;
}
</style>

