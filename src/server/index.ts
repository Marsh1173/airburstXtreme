import { Client } from './Client';
import { LobbyContainer } from './ClientContainers/LobbyContainer';
import { BrowserContainer } from './ClientContainers/BrowserContainer';
import { Server, WebSocket } from 'ws';
import { PlayerInfo } from '../model/PlayerInfo';
import { Lobby } from '../model/Lobby';

var nextId: number = 0;
function getNextId(): number {
    return nextId++;
}

export class ServerClass {
    public readonly clientMap: Map<number, Client> = new Map<number, Client>();
    public readonly browserContainer: BrowserContainer = new BrowserContainer(getNextId(), this);
    public readonly lobbies: Map<number, LobbyContainer> = new Map<number, LobbyContainer>();

    public readonly port: number = 3001;
    public readonly server;

    constructor() {
        this.server = new Server({ port: this.port });

        this.server.on('connection', (ws: WebSocket) => {
            let id: number = getNextId();

            console.log('- Connected to ' + id);

            let client: Client = new Client(id, this.browserContainer, ws, this);
            this.clientMap.set(id, client);
            this.browserContainer.addClient(client);
            this.browserContainer.broadcastOne(
                {
                    type: 'browserServerMessage',
                    msg: {
                        type: 'serverGameListAndId',
                        games: this.browserContainer.getGameItems(),
                        clientId: client.id,
                    },
                },
                client.id,
            );
        });

        console.log('Server is running on port', this.port);
    }

    public createNewLobby(playerInfo: PlayerInfo, name: string): LobbyContainer | undefined {
        let client: Client | undefined = this.clientMap.get(playerInfo.id);
        if (client) {
            let newLobby: Lobby = { id: Math.ceil(Math.random() * 100000), name, players: [playerInfo] };
            let newLobbyContainer: LobbyContainer = new LobbyContainer(newLobby.id, this, newLobby);
            this.lobbies.set(newLobby.id, newLobbyContainer);

            return newLobbyContainer;
        }
    }
}

let serverClass: ServerClass = new ServerClass();
