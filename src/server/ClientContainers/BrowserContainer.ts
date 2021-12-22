import { ServerClass } from '../index';
import { Client } from '../Client';
import { ClientContainer, ClientMessageType } from './ClientContainer';
import { LobbyContainer } from './LobbyContainer';
import { Lobby } from '../../model/Lobby';

export class BrowserContainer extends ClientContainer {
    constructor(id: number, serverClass: ServerClass) {
        super(id, serverClass);
    }

    public processMessage(data: ClientMessageType) {
        if (data.type != 'browserClientMessage') return;
        let client: Client | undefined = this.serverClass.clientMap.get(data.clientID);
        if (client) {
            switch (data.msg.type) {
                case 'clientCreateGame':
                    let newLobbyContainer: LobbyContainer | undefined = this.serverClass.createNewLobby(
                        { name: data.clientName, id: data.clientID },
                        data.msg.name,
                    );
                    if (newLobbyContainer) {
                        this.broadcastOne(
                            {
                                type: 'browserServerMessage',
                                msg: { type: 'serverMoveClientToGame', lobby: newLobbyContainer.lobby },
                            },
                            data.clientID,
                        );

                        this.removeClient(data.clientID);
                        newLobbyContainer.updateClientsLobbyPlayerList();
                        newLobbyContainer.addClient(client);
                        client.setProcessorContainer(newLobbyContainer);

                        this.updateClientsGameList();
                    }

                    break;
                case 'clientJoinGame':
                    let lobby: LobbyContainer | undefined = this.serverClass.lobbies.get(data.msg.gameID);
                    if (!lobby) {
                        this.broadcastErrorToClient('Game ' + data.msg.gameID + ' does not exist.', data.clientID);
                    } else {
                        lobby.lobby.players.push({ name: data.clientName, id: data.clientID });
                        this.broadcastOne(
                            {
                                type: 'browserServerMessage',
                                msg: { type: 'serverMoveClientToGame', lobby: lobby.lobby },
                            },
                            data.clientID,
                        );

                        this.removeClient(data.clientID);
                        lobby.updateClientsLobbyPlayerList();
                        lobby.addClient(client);
                        client.setProcessorContainer(lobby);
                    }
                    break;
                case 'clientRequestGameList':
                    this.broadcastOne(
                        {
                            type: 'browserServerMessage',
                            msg: {
                                type: 'serverGameList',
                                games: this.getGameItems(),
                            },
                        },
                        client.id,
                    );
                    break;
                default:
                    throw new Error('Unknown message type: ' + data.msg);
            }
        }
    }

    public updateClientsGameList() {
        this.broadcastAll({
            type: 'browserServerMessage',
            msg: { type: 'serverGameList', games: this.getGameItems() },
        });
    }

    protected removeIfEmpty() {
        return;
    }
}

export interface BrowserClientMessage {
    type: 'browserClientMessage';
    clientID: number;
    clientName: string;
    msg: ClientJoinGame | ClientCreateGame | ClientRequestGameList;
}
export interface ClientJoinGame {
    type: 'clientJoinGame';
    gameID: number;
}
export interface ClientCreateGame {
    type: 'clientCreateGame';
    name: string;
}
export interface ClientRequestGameList {
    type: 'clientRequestGameList';
}

export interface BrowserServerMessage {
    type: 'browserServerMessage';
    msg: ServerGameList | ServerGameListAndId | ServerMoveClientToGame;
}
export interface ServerGameList {
    type: 'serverGameList';
    games: { id: number; name: string }[];
}
export interface ServerGameListAndId {
    type: 'serverGameListAndId';
    games: { id: number; name: string }[];
    clientId: number;
}
export interface ServerMoveClientToGame {
    type: 'serverMoveClientToGame';
    lobby: Lobby;
}
