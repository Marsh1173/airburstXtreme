import { PlayerInfo } from '../../model/PlayerInfo';
import { Client } from '../Client';
import { ServerClass } from '../index';
import { BrowserClientMessage, BrowserServerMessage } from './BrowserContainer';
import { LobbyClientMessage, LobbyServerMessage } from './LobbyContainer';

export abstract class ClientContainer {
    public readonly clients: Map<number, Client> = new Map<number, Client>();
    constructor(public readonly id: number, protected readonly serverClass: ServerClass) {}

    public abstract processMessage(data: ClientMessageType): void;

    public broadcastAll(data: ServerMessageType): void {
        let stringData: string = JSON.stringify(data);
        this.clients.forEach((client) => {
            client.socket.send(stringData);
        });
    }
    public broadcastOne(data: ServerMessageType, id: number): void {
        let stringData: string = JSON.stringify(data);
        let client: Client | undefined = this.clients.get(id);
        if (client) {
            client.socket.send(stringData);
        }
    }
    public broadcastErrorToClient(msg: string, clientId: number) {
        this.broadcastOne({ type: 'errorServerMessage', msg }, clientId);
    }

    public removeClient(id: number) {
        this.clients.delete(id);
        this.removeIfEmpty();
    }
    protected abstract removeIfEmpty(): void;
    public addClient(client: Client) {
        this.clients.set(client.id, client);
    }
    public getGameItems(): { id: number; name: string }[] {
        let gameItems: { id: number; name: string }[] = [];
        this.serverClass.lobbies.forEach((lobby) => {
            gameItems.push({ id: lobby.id, name: lobby.lobby.name });
        });
        return gameItems;
    }
}

export type ClientMessageType = BrowserClientMessage | LobbyClientMessage;
export type ServerMessageType = BrowserServerMessage | LobbyServerMessage | ErrorServerMessage;

export interface ErrorServerMessage {
    type: 'errorServerMessage';
    msg: string;
}
