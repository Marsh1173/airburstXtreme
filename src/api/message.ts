import { AllInfo } from './allinfo';
import '../server/ClientContainers/ClientContainer';
import { ClientMessageType, ServerMessageType } from '../server/ClientContainers/ClientContainer';

export interface PlayerLeavingMessage {
    type: 'playerLeaving';
    id: number;
}

export interface InfoMessage {
    type: 'info';
    info: AllInfo;
}

export type ServerMessage = ServerMessageType;
export type ClientMessage = ClientMessageType;

export interface MovePaddleMessage {
    type: 'movePaddleMessage';
    id: number;
    isClockwise: boolean;
}
