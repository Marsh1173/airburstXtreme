import { WebSocket } from 'ws';
import { ServerClass } from './index';
import { ClientContainer } from './ClientContainers/ClientContainer';

export class Client {
    constructor(
        public readonly id: number,
        private currentServer: ClientContainer,
        public socket: WebSocket,
        private readonly serverClass: ServerClass,
    ) {
        this.socket.on('message', (message: string) => {
            let data = JSON.parse(message);
            this.currentServer.processMessage(data);
        });
        this.socket.onclose = () => {
            this.currentServer.removeClient(this.id);
            this.serverClass.clientMap.delete(this.id);

            console.log('- Disconnecting ' + this.id);
            console.log('Browser map size: ' + this.serverClass.browserContainer.clients.size);
            console.log('Client map size: ' + this.serverClass.clientMap.size);
            console.log('Lobby size: ' + this.serverClass.lobbies.size);
            // this.serverClass.lobbies.forEach((lobby) => {
            //     console.log(lobby);
            // });
        };
    }
    public setProcessorContainer(server: ClientContainer) {
        this.currentServer = server;
    }
}
