<template>
    <label for="filter">Filter logs</label>
    <select
        v-model="filterValue"
        name="filter"
    >
        <option :value="''">
            -- select filter --
        </option>
        <option>TRACE</option>
        <option>WARN</option>
        <option>DEBUG</option>
        <option>FATAL</option>
        <option>ERROR</option>
    </select>
</template>

<script setup lang="ts">
const filterValue = defineModel<string>();
</script>

<style scoped>

</style>
