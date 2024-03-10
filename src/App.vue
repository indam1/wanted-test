<template>
    <header class="header">
        <button
            v-if="!isActive"
            :disabled="connectionPending"
            @click="connect"
        >
            Connect
        </button>
        <template v-else>
            <USelect
                v-if="isAuthorized"
                v-model="filterValue"
            />
            <AuthorizationButton />
            <SubscriptionButton v-if="isAuthorized" />
            <button
                :disabled="connectionPending"
                @click="disconnect"
            >
                Disconnect
            </button>
        </template>
    </header>

    <main style="margin: 72px 24px 24px;">
        <UScroller :filter-value="filterValue" />
    </main>
</template>

<script setup lang="ts">
import {ref} from "vue";
import USelect from "@/components/USelect.vue";
import AuthorizationButton from "@/components/AuthorizationForm.vue";
import UScroller from "@/components/UScroller.vue";
import SubscriptionButton from "@/components/SubscriptionButton.vue";
import {useWebsocket} from "@/composables/useWebsocket";
import {useServerInteraction} from "@/composables/useServerInteraction";
import {useHeartBeat} from "@/composables/useHeartBeat";

const { isActive, connect, connectionPending, disconnect } = useWebsocket();
useHeartBeat();
const { isAuthorized } = useServerInteraction();
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
