import type {MessageRequest} from "../../types/Message";

export const makeCallId = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 16) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};

export const handleRequestData = (msg: MessageRequest) => {
    return [msg[0], makeCallId(), msg[1], ...(msg[2] ?? [])];
};
