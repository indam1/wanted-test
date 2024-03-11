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
            <LogsInteractionForm
                v-if="isAuthorized && logs.length"
                v-model:selected-log-id="selectedLogId"
                v-model:selection-value="selectionValue"
                :filter-value="filterValue"
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
</template>

<script setup lang="ts">
import USelect from "@/components/USelect.vue";
import AuthorizationButton from "@/components/AuthorizationForm.vue";
import SubscriptionButton from "@/components/SubscriptionButton.vue";
import {useServerInteraction} from "@/composables/useServerInteraction";
import {useWebsocket} from "@/composables/useWebsocket";
import useLogs from "@/composables/useLogs";
import LogsInteractionForm from "@/components/LogsInteractionForm.vue";

const filterValue = defineModel<string>('filterValue');
const selectionValue = defineModel<string>('selectionValue');
const selectedLogId = defineModel<string>('selectedLogId');
const { isActive, connect, connectionPending, disconnect } = useWebsocket();
const { isAuthorized } = useServerInteraction();
const { logs } = useLogs(filterValue, selectionValue);
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
