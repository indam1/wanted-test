import type {LogItem} from "./Items";

export type EventLogResult = {
    Action: 0 | 3,
    Items: Array<LogItem>
}

export type EventErrorResult = {
    SubscribeError: string,
}

export type LoginResult = {
    Token: string,
    Username: string,
}

export type LoginByTokenResult = {
    Token: string,
    Username: string,
}
