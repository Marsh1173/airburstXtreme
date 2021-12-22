import { Lobby } from '../../model/Lobby';
import { PlayerInfo } from '../../model/PlayerInfo';
import { Client } from '../Client';
import { ServerClass } from '../index';
import { ServerGameList } from './BrowserContainer';
import { ClientContainer, ClientMessageType } from './ClientContainer';

export class LobbyContainer extends ClientContainer {
    constructor(id: number, serverClass: ServerClass, public readonly lobby: Lobby) {
        super(id, serverClass);
    }

    public processMessage(data: ClientMessageType) {
        if (data.type != 'lobbyClientMessage') return;
        let client: Client | undefined = this.serverClass.clientMap.get(data.clientId);
        if (client) {
            switch (data.msg.type) {
                case 'clientLeaveLobby':
                    this.broadcastOne(
                        { type: 'lobbyServerMessage', msg: { type: 'lobbyLeaveMessage' } },
                        data.clientId,
                    );
                    this.removeClient(data.clientId);
                    client.setProcessorContainer(this.serverClass.browserContainer);
                    this.serverClass.browserContainer.addClient(client);
                    break;
                case 'clientPressStartGame':
                    console.log('starting game...');
                    break;
                default:
                    throw new Error('message type has not been implemented yet: ' + data.msg);
            }
        }
    }

    protected removeIfEmpty(): void {
        if (this.clients.size == 0) {
            this.serverClass.lobbies.delete(this.id);
            this.serverClass.browserContainer.updateClientsGameList();
            console.log('Removing ' + this.lobby.name + " because it's empty.");
        }
    }

    public removeClient(id: number): void {
        console.log('Removing client ' + id + ' from lobby ' + this.lobby.name);
        this.lobby.players = this.lobby.players.filter((player) => player.id != id);
        this.updateClientsLobbyPlayerList();
        super.removeClient(id);
    }

    public updateClientsLobbyPlayerList() {
        this.broadcastAll({
            type: 'lobbyServerMessage',
            msg: { type: 'lobbyUpdatePlayerList', players: this.lobby.players },
        });
    }
}

export interface LobbyClientMessage {
    type: 'lobbyClientMessage';
    msg: ClientLeaveLobby | ClientPressStartGame;
    clientId: number;
}
export interface ClientLeaveLobby {
    type: 'clientLeaveLobby';
}
export interface ClientPressStartGame {
    type: 'clientPressStartGame';
}

export interface LobbyServerMessage {
    type: 'lobbyServerMessage';
    msg: LobbyLeaveMessage | LobbyUpdatePlayerList;
}
export interface LobbyUpdatePlayerList {
    type: 'lobbyUpdatePlayerList';
    players: PlayerInfo[];
}
export interface LobbyLeaveMessage {
    type: 'lobbyLeaveMessage';
}
