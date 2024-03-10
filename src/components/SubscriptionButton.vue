<template>
    <button @click="onClick">
        {{ isSubscribed ? 'Unsubscribe' : 'Subscribe' }}
    </button>
</template>

<script setup lang="ts">
import {useSubscription} from "@/composables/useSubscription";
import {useServerInteraction} from "@/composables/useServerInteraction";

const { subscribe, unsubscribe } = useSubscription();
const { isSubscribed } = useServerInteraction();

const onClick = () => {
    if (isSubscribed.value) {
        unsubscribe();
    } else {
        subscribe();
    }
};
</script>

<style scoped>

</style>
