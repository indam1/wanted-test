import {reactive} from "vue";
import type {MessageRequest, MessageResponse} from "../../types/Message";

type ResolveCallback = (value: (MessageResponse | PromiseLike<MessageResponse>)) => void;
type RejectCallback = (reason?: any) => void;
type Resolver = {
    resolve: ResolveCallback,
    reject: RejectCallback
}

const pendingMap = reactive(new Map<string, Resolver>());

export const useMessageResolver = () => {
    const generateKey = (rawData: MessageResponse | MessageRequest) => {
        return `${rawData[1]}`;
    };

    const tryResolve = (rawData: MessageResponse) => {
        const key = generateKey(rawData);
        const resolver = pendingMap.get(key);
        if (!resolver) {
            return;
        }

        resolver.resolve(rawData);
        pendingMap.delete(key);
    };

    const acquireData = (key: string) => {
        return new Promise<MessageResponse>((resolve, reject) => {
            pendingMap.set(key, { resolve, reject });
        });
    };

    const clearResolver = () => pendingMap.clear();

    return { tryResolve, clearResolver, acquireData, generateKey };
};
