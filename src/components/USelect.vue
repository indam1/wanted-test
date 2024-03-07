<template>
  <div>Filter logs:</div>
  <select
    v-model="filter"
    :disabled="!isActive || pending || !canInteract"
  >
    <option disabled>
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
import {computed} from "vue";
import {useWebsocketState} from "@/composables/useWebsocketState";

const { isActive, pending } = useWebsocketState();

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
    modelValue: string
    canInteract: boolean
}>();

const filter = computed({
    get: () => props.modelValue,
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>

<style scoped>

</style>
