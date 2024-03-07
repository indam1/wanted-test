<template>
  <header class="header">
    <USelect
      v-model="filterValue"
      :can-interact="canInteract"
    />
    <AuthorizationButton v-model="isAuthorized" />
    <SubscriptionButton :can-interact="canInteract" />
  </header>

  <main style="margin: 72px 24px 24px;">
    <UScroller
      :filter-value="filterValue"
      :can-interact="canInteract"
    />
  </main>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
import USelect from "@/components/USelect.vue";
import AuthorizationButton from "@/components/AuthorizationButton.vue";
import UScroller from "@/components/UScroller.vue";
import SubscriptionButton from "@/components/SubscriptionButton.vue";
import {useWebsocketState} from "@/composables/useWebsocketState";

const { send, isActive } = useWebsocketState();
let timeout: number;
onMounted(() => timeout = setTimeout(() => send([20, 0])));
onUnmounted(() => clearTimeout(timeout));
const isAuthorized = ref(false);
const canInteract = computed(() => isActive.value && isAuthorized.value);
const filterValue = ref('');
</script>

<style scoped>
.header {
    padding: 8px 8px 8px 24px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: red;
    z-index: 1;
}

</style>
