import type {EventErrorResult, EventLogResult, LoginByTokenResult, LoginResult} from "./Subcription";

export type WelcomeResponse = [
    Action: 0,
    SessionId: string,
    WAMPVersion: string,
    ServerName: string,
]

export type CallRequest = [
    Action: 2,
    CallId: string,
    Uri: string,
    Arguments?: [...string[]],
]

export type CallResponse = [
    Action: 3,
    CallId: string,
    Result: LoginResult | LoginByTokenResult,
]

export type CallErrorResponse = [
    Action: 4,
    CallId: string,
    Uri: string,
    Desc: string,
    Details: object,
]

export type SubscribeRequest = [
    Action: 5,
    Uri: string,
]

export type UnsubscribeRequest = [
    Action: 6,
    Uri: string,
]

export type EventResponse = [
    Action: 8,
    Uri: string,
    Event: EventLogResult | EventErrorResult,
]

export type HeartbeatResponse = [
    Action: 20,
    Counter: number,
]

export type HeartbeatRequest = [
    Action: 20,
    Counter: number,
]

export type MessageRequest = CallRequest | SubscribeRequest | UnsubscribeRequest | HeartbeatRequest;
export type MessageResponse = WelcomeResponse | CallResponse | CallErrorResponse | EventResponse | HeartbeatResponse;
