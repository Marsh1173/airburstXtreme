import { ClientMessage, ServerMessage } from '../../../api/message';
import { BrowserPresenter } from '../../Presenter/BrowserPresenter';
import { HomePresenter } from '../../Presenter/HomePresenter';
import { LobbyPresenter } from '../../Presenter/LobbyPresenter';
import { GlobalInfo } from '../GlobalInfo/GlobalInfo';

export class MessageReceiver {
    public receiveMessage(data: ServerMessage) {
        switch (data.type) {
            case 'errorServerMessage':
                HomePresenter.showError(data.msg);
                break;
            case 'browserServerMessage':
                switch (data.msg.type) {
                    case 'serverGameList':
                        BrowserPresenter.updateGameList(data.msg.games);
                        break;
                    case 'serverGameListAndId':
                        GlobalInfo.playerInfo.id = data.msg.clientId;
                        BrowserPresenter.updateGameList(data.msg.games);
                        break;
                    case 'serverMoveClientToGame':
                        BrowserPresenter.moveToLobby(data.msg.lobby);
                        break;
                    default:
                        throw new Error('Unkown message type: ' + data.msg);
                }
                break;
            case 'lobbyServerMessage':
                switch (data.msg.type) {
                    case 'lobbyUpdatePlayerList':
                        LobbyPresenter.updateLobbyPlayerList(data.msg.players);
                        break;
                    case 'lobbyLeaveMessage':
                        LobbyPresenter.leaveLobby();
                        break;
                    default:
                        throw new Error('Method not implemented: ' + data.msg);
                }
                break;
            default:
                throw new Error('Method not implemented: ' + data);
        }
    }
}
