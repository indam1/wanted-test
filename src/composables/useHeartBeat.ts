import {useWebsocket} from "@/composables/useWebsocket";
import {ref, watch} from "vue";

export function useHeartBeat() {
    const { simpleSend, isActive } = useWebsocket();
    const interval = ref<number>();
    const counter = ref(0);

    const heartBeatCall = async () => {
        simpleSend([20, counter.value]);
        counter.value += 1;
    };

    watch(isActive, () => {
        if (isActive.value) {
            clearInterval(interval.value);
            interval.value = setInterval(() => heartBeatCall(), 30 * 1000);
        } else {
            clearInterval(interval.value);
            interval.value = undefined;
            counter.value = 0;
        }
    }, { immediate: true });
}
