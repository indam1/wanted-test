<template>
  <button
    :disabled="!isActive || pending"
    @click="onClick"
  >
    {{ props.modelValue ? 'Unauthorize' : 'Authorize' }}
  </button>
</template>

<script setup lang="ts">
import {useWebsocketState} from "@/composables/useWebsocketState";
import {ref, watch} from "vue";
import {createUri} from "@/constants";

const props = defineProps<{
    modelValue: boolean
}>();
const emit = defineEmits(['update:modelValue']);

const token = ref('');
const callId = 'a8FmfgEp33b1gMas';

const { isActive, pending, send, data } = useWebsocketState();
const authorize = () => send([2, callId, createUri('login'), 'enter', 'A505a']);

const unauthorize = () => {
    send([2, callId, createUri('logout')])
    emit('update:modelValue', false);
}

const onClick = () => {
    if (props.modelValue || !isActive) {
        unauthorize();
    } else {
        authorize();
    }
}

watch(data, () => {
    if (data.value[2]?.Token && !props.modelValue) {
        token.value = data.value[2].Token;
        emit('update:modelValue', true);
    }
})
</script>

<style scoped>

</style>
