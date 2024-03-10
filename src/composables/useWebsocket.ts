import {ref} from "vue";
import type {EventResponse, MessageRequest} from "../../types/Message";
import {websocketUrl} from "@/constants";
import {handleRequestData} from "@/utils/utils";
import {useMessageResolver} from "@/composables/useMessageResolver";

const isActive = ref(false);
const socket = ref<WebSocket>();
const subscriptionData = ref<EventResponse>();

export const useWebsocket = () => {
    const { tryResolve, clearResolver, acquireData, generateKey } = useMessageResolver();

    const connectionPending = ref(false);

    const disconnect = () => {
        connectionPending.value = true;
        socket.value?.close();
    };

    const connect = () => {
        connectionPending.value = true;
        socket.value = new WebSocket(websocketUrl);

        socket.value.onmessage = (e: MessageEvent<string>) => {
            subscriptionData.value = undefined;
            const data = JSON.parse(e.data);
            tryResolve(data);

            if (data[0] === 8) {
                subscriptionData.value = data;
            }
        };
        socket.value.onclose = (e) => {
            isActive.value = false;
            connectionPending.value = false;

            clearResolver();
            setTimeout(() => connect(), 1000);
        };
        socket.value.onopen = (e) => {
            connectionPending.value = false;
            isActive.value = true;
        };
        socket.value.onerror = (e) => {
            console.error(e);
        };
    };

    const trySend = (msg: MessageRequest) => {
        const stringifyMessage = JSON.stringify(msg);
        if (!isActive.value || !socket.value) {
            throw new Error(`Socket is not active: ${stringifyMessage}`);
        }

        socket.value.send(stringifyMessage);
    };

    const send = (rawMessage: MessageRequest) => {
        const msg = handleRequestData(rawMessage);
        trySend(msg);
        return acquireData(generateKey(msg));
    };

    const simpleSend = (rawMessage: MessageRequest) => trySend(rawMessage);

    return { socket, isActive, send, simpleSend, connect, disconnect, connectionPending, subscriptionData };
};
