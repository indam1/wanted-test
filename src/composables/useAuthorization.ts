import {useWebsocket} from "@/composables/useWebsocket";
import {createUri} from "@/constants";
import {ref, watch} from "vue";

const token = ref('');
const isAuthorized = ref(false);
const authorizationPending = ref(false);

export function useAuthorization() {
    const { send, isActive } = useWebsocket();

    const pendingWrapper = async (callback: (() => void) | (() => Promise<void>)) => {
        authorizationPending.value = true;
        const result = await callback();
        authorizationPending.value = false;
        return result;
    };

    const authorize = async (login: string, password: string) => {
        return pendingWrapper(async () => {
            const result: any = await send([2, createUri('login'), [login, password]]);
            authorizationPending.value = false;
            isAuthorized.value = true;
            token.value = result[2].Token;
            return result;
        });
    };

    const unauthorize = async () => {
        return pendingWrapper(async () => {
            const result = await send([2, createUri('logout')]);
            authorizationPending.value = false;
            isAuthorized.value = false;
            token.value = '';
            return result;
        });
    };

    const reconnect = async () => {
        return pendingWrapper(async () => {
            const result = await send([2, createUri('loginByToken'), [token.value]]);
            isAuthorized.value = true;
            return result;
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
