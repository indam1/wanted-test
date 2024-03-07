<template>
  <RecycleScroller
    v-slot="{ item }"
    :items="resultLogs"
    :item-size="24"
    :page-mode="true"
  >
    <div class="logs">
      <span
        :style="style(item.Level)"
        style="border-bottom: 1px solid grey"
      >{{ item.Timestamp }}</span>
      <span
        :style="style(item.Level)"
        style="border-bottom: 1px solid grey"
      >{{ item.Level }}</span>
      <span
        :style="style(item.Level)"
        style="border-bottom: 1px solid grey"
      >{{ item.Message }}</span>
      <span
        :style="style(item.Level)"
        style="border-bottom: 1px solid grey"
      >{{ item.Source }}</span>
    </div>
  </RecycleScroller>
</template>

<script setup lang="ts">
import {computed, shallowRef, watch} from "vue";
import type {LogItem} from "../../types/Items";
import {useWebsocketState} from "@/composables/useWebsocketState";

const { data } = useWebsocketState();


const props = defineProps<{
    filterValue: string
    canInteract: boolean
}>()

watch(data, () => {
    if (!data.value[2]?.Items) {
        return;
    }

    if (data.value[2].Action === 0) {
        logs.value = [...logs.value, ...data.value[2].Items];
    } else if (data.value[2].Action === 3) {
        logs.value = [...data.value[2].Items];
    }
})

watch(() => props.canInteract, () => {
    if (!props.canInteract) {
        logs.value = [];
    }
})

const style = (level: string) => {
    switch (level) {
        case 'TRACE':
            return 'color: green';
        case 'WARN':
            return 'color: yellow';
        case 'DEBUG':
            return 'color: dodgerblue';
        case 'FATAL':
            return 'color: darkred';
        case 'ERROR':
            return 'color: red';
        default:
            return 'color: black';
    }
}

const logs = shallowRef<Array<LogItem>>([]);
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

