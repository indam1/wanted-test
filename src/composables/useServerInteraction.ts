import {useAuthorization} from "@/composables/useAuthorization";
import {useSubscription} from "@/composables/useSubscription";

export const useServerInteraction = () => {
    const { isAuthorized, token } = useAuthorization();
    const { isSubscribed } = useSubscription();

    return { token, isAuthorized, isSubscribed };
};
