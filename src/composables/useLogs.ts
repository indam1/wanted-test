import {computed} from "vue";
import type {LogItem} from "../../types/Items";
import {useSubscription} from "@/composables/useSubscription";

export default function useLogs(filterValue, selectionValue) {
    const { logs } = useSubscription();
    const filteredLogs = computed(() => logs.value.reduce<Array<LogItem>>((res, item, index) => {
        if (filterValue.value && filterValue.value !== item.Level) {
            return res;
        }

        res.push({
            ...item,
            id: `LogItem${index}`,
            isInInput: selectionValue.value && Object.values(item).some(val => val.includes(selectionValue.value)),
        });
        return res;
    }, []));

    const selectedLogs = computed(() => filteredLogs.value.filter(item => item.isInInput));
    return { filteredLogs, selectedLogs, logs };
}
