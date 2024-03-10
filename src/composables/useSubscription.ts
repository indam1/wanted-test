import {createUri} from "@/constants";
import {useWebsocket} from "@/composables/useWebsocket";
import {ref, shallowRef, watch, watchEffect} from "vue";
import type {LogItem} from "../../types/Items";
import {useAuthorization} from "@/composables/useAuthorization";

const isSubscribed = ref(false);
const logs = shallowRef<Array<LogItem>>([]);

export function useSubscription() {
    const { simpleSend, subscriptionData, isActive } = useWebsocket();
    const { isAuthorized } = useAuthorization();

    const subscribe = async () => {
        simpleSend([5, createUri('subscription/logs/list')]);
        isSubscribed.value = true;
    };

    const unsubscribe = async () => {
        simpleSend([6, createUri('subscription/logs/list')]);
        isSubscribed.value = false;
    };

    watch(subscriptionData, () => {
        if (!subscriptionData.value) {
            return;
        }

        const { SubscribeError, Action, Items } = subscriptionData.value[2];
        if (SubscribeError) {
            console.error(SubcribeError);
            return;
        }

        if (Action === 0) {
            logs.value = [...logs.value, ...Items];
        }

        if (Action === 3) {
            logs.value = Items;
        }
    }, { immediate: true });

    watchEffect(() => {
        if (!isAuthorized.value || !isActive.value) {
            logs.value = [];
            isSubscribed.value = false;
        }
    });

    return { subscribe, unsubscribe, isSubscribed, logs };
}
