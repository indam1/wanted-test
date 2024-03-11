import {useWebsocket} from "@/composables/useWebsocket";
import {createUri} from "@/constants";
import {ref, watch} from "vue";
import type {CallErrorResponse, CallResponse} from "../../types/Message";

const token = ref('');
const isAuthorized = ref(false);
const authorizationPending = ref(false);

export function useAuthorization() {
    const { send, isActive } = useWebsocket();

    const pendingWrapper = async <T>(callback: (() => T | null) | (() => Promise<T | null>)) => {
        authorizationPending.value = true;
        const result = await callback();
        authorizationPending.value = false;
        return result;
    };

    const authorize = async (login: string, password: string) => {
        return pendingWrapper<boolean>(async () => {
            const result: CallResponse | CallErrorResponse = await send([2, createUri('login'), [login, password]]);
            if (result[0] === 3) {
                authorizationPending.value = false;
                isAuthorized.value = true;
                token.value = result[2].Token;
                return true;
            } else if (result[0] === 4) {
                console.error('Authorization error');
                return false;
            }

            console.error('Unexpected response in authorization', result);
            return false;
        });
    };

    const unauthorize = async () => {
        return pendingWrapper<boolean>(async () => {
            const result: CallResponse | CallErrorResponse = await send([2, createUri('logout')]);
            if (result[0] === 3) {
                authorizationPending.value = false;
                isAuthorized.value = false;
                token.value = '';
                return true;
            } else if (result[0] === 4) {
                console.error('Unauthorization error');
                return false;
            }

            console.error('Unexpected response in unauthorization', result);
            return false;
        });
    };

    const reconnect = async () => {
        return pendingWrapper<boolean>(async () => {
            const result: CallResponse | CallErrorResponse = await send([2, createUri('loginByToken'), [token.value]]);
            if (result[0] === 3) {
                isAuthorized.value = true;
                return true;
            } else if (result[0] === 4) {
                console.error('Reconnect error');
                return false;
            }

            console.error('Unexpected response in reconnect', result);
            return false;
        });
    };

    watch(isActive, () => {
        if (!isActive.value) {
            isAuthorized.value = false;
            token.value = '';
        }
    }, { immediate: true });

    return { isAuthorized, token, authorize, unauthorize, reconnect, authorizationPending };
}
