import {ref} from "vue";
import type {MessageRequest, MessageResponse} from "../../types/Message";
import {websocketUrl} from "@/constants";


const isActive = ref(false);
const pending = ref(false);
const data = ref<MessageResponse | null>(null);

const socket = ref<WebSocket>();
const createSocket = () => {
    socket.value = new WebSocket(websocketUrl);

    socket.value.onmessage = (e) => {
        data.value = JSON.parse(e.data);
        pending.value = false;
        console.log('onmessage', data.value);
    }

    socket.value.onclose = () => {
        data.value = null;
        isActive.value = false;
        pending.value = false;
        console.log('onclose');
    }

    socket.value.onopen = () => {
        isActive.value = true;
        console.log('onopen');
    }

    socket.value.onerror = () => {
        console.log('onerror');
    }
}

createSocket();

export const useWebsocketState = () => {
    const send = (message: MessageRequest) => {
        if (!isActive.value || !socket.value) {
            createSocket();
            return;
        }

        const stringifyMessage = JSON.stringify(message);
        socket.value.send(stringifyMessage);
        pending.value = true;
    }

    return { socket, isActive, data, send, pending };
}
