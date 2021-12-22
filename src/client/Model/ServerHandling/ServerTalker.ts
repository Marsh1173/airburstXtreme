import { ClientMessage, ServerMessage } from '../../../api/message';
import { HomePresenter } from '../../Presenter/HomePresenter';
import { MessageReceiver } from './MessageReceiver';

export class ServerTalker {
    private socket?: WebSocket;
    public static serverTalker: ServerTalker | undefined = undefined;

    constructor(private messageReceiver: MessageReceiver) {}

    public connect() {
        console.log(window.location.host);
        this.socket = new WebSocket('ws://' + window.location.host + ':3001');
        this.socket.addEventListener('error', (event) => {
            console.log('WebSocket error: ', event);
            HomePresenter.showConnectionError();
        });
        this.socket.addEventListener('close', (event) => {
            console.log('Connection to websocket closed');
            HomePresenter.showError('Connection lost.');
            ServerTalker.serverTalker = undefined;
        });
        this.socket.onmessage = (message: MessageEvent<string>) => {
            this.messageReceiver.receiveMessage(JSON.parse(message.data));
        };
    }

    public sendMessage(data: ClientMessage) {
        this.socket?.send(JSON.stringify(data));
    }

    public close() {
        this.socket?.close();
    }

    public isReady(): boolean {
        if (this.socket) {
            return this.socket.readyState == 1;
        }
        return false;
    }
}
