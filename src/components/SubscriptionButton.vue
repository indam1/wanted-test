<template>
  <button
    :disabled="!isActive || pending || !props.canInteract"
    @click="onClick"
  >
    {{ isSubscribed ? 'Unsubscribe' : 'Subscribe' }}
  </button>
</template>

<script setup lang="ts">
import {useWebsocketState} from "@/composables/useWebsocketState";
import {ref, watch} from "vue";
import {createUri} from "@/constants";

const isSubscribed = ref(false);
const props = defineProps<{
    canInteract: boolean
}>()

const { isActive, pending, send, data } = useWebsocketState();
const subscribe = () => send([5, createUri('subscription/logs/list')]);

const unsubscribe = () => {
    // ToDo: wrong URI
    send([6, createUri('subscription/logs/list')])
    isSubscribed.value = false;
}

watch(data, () => {
    if (data.value[2]?.Items && !isSubscribed.value) {
        isSubscribed.value = true;
    }
})

const onClick = () => {
    if (isSubscribed.value) {
        unsubscribe();
    } else {
        subscribe();
    }
}
</script>

<style scoped>

</style>
