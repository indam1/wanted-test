<template>
    <MainHeader
        v-model:filter-value="filterValue"
        v-model:selection-value="selectionValue"
        v-model:selected-log-id="selectedLogId"
    />
    <main
        id="main"
        style="top: 0; padding: 8vh 1vw 1vw; height: 100vh; overflow: scroll"
    >
        <UScroller
            :filter-value="filterValue"
            :selection-value="selectionValue"
            :selected-log-id="selectedLogId"
        />
    </main>
</template>

<script setup lang="ts">
import {ref} from "vue";
import UScroller from "@/components/UScroller.vue";
import {useHeartBeat} from "@/composables/useHeartBeat";
import MainHeader from "@/components/MainHeader.vue";

useHeartBeat();
const filterValue = ref('');
const selectionValue = ref('');
const selectedLogId = ref('');
</script>

<style scoped>
</style>
