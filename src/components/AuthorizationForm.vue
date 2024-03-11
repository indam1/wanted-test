<template>
    <form v-if="!isAuthorized">
        <label for="login">Login</label>
        <input
            v-model="login"
            type="text"
            name="login"
        >

        <label for="password">Password</label>
        <input
            v-model="password"
            type="password"
            autocomplete="on"
            name="password"
        >

        <button
            :disabled="authorizationPending"
            @click.prevent="tryAuthorize"
        >
            {{ 'Authorize' }}
        </button>
    </form>
    <button
        v-else
        :disabled="authorizationPending"
        @click="tryUnauthorize"
    >
        {{ 'Unauthorize' }}
    </button>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useServerInteraction} from "@/composables/useServerInteraction";
import {useAuthorization} from "@/composables/useAuthorization";

const login = ref('');
const password = ref('');

const { authorize, unauthorize, reconnect, authorizationPending } = useAuthorization();
const { isAuthorized } = useServerInteraction();

const tryAuthorize = async () => {
    const result = await authorize(login.value, password.value);
    if (!result) {
        return;
    }
    isAuthorized.value = true;
};

const tryUnauthorize = async () => {
    const result = await unauthorize();
    if (!result) {
        return;
    }
    isAuthorized.value = false;
};

const tryReconnect = async () => {
    const result = await reconnect();
    if (!result) {
        return;
    }
    isAuthorized.value = true;
};
</script>

<style scoped>

</style>
