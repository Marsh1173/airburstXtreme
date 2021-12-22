import { PlayerInfo } from '../../model/PlayerInfo';
import { GlobalInfo } from '../Model/GlobalInfo/GlobalInfo';
import { ServerTalker } from '../Model/ServerHandling/ServerTalker';
import { HomePresenter } from './HomePresenter';

export class LobbyPresenter {
    private static updateLobbyPlayerListFunc: ((players: PlayerInfo[]) => void) | undefined = undefined;

    public static setUpdateLobbyPlayerListFunc(func: ((players: PlayerInfo[]) => void) | undefined) {
        LobbyPresenter.updateLobbyPlayerListFunc = func;
    }
    public static updateLobbyPlayerList(players: PlayerInfo[]) {
        if (LobbyPresenter.updateLobbyPlayerListFunc) {
            LobbyPresenter.updateLobbyPlayerListFunc(players);
        }
    }
    public static attemptLeaveLobby() {
        if (ServerTalker.serverTalker && ServerTalker.serverTalker.isReady()) {
            ServerTalker.serverTalker.sendMessage({
                type: 'lobbyClientMessage',
                msg: { type: 'clientLeaveLobby' },
                clientId: GlobalInfo.playerInfo.id,
            });
        } else {
            HomePresenter.showConnectionError();
        }
    }
    public static leaveLobby() {
        if (HomePresenter.changeHomeComponentView && ServerTalker.serverTalker) {
            HomePresenter.changeHomeComponentView('home');
            ServerTalker.serverTalker.sendMessage({
                type: 'browserClientMessage',
                msg: { type: 'clientRequestGameList' },
                clientName: GlobalInfo.playerInfo.name,
                clientID: GlobalInfo.playerInfo.id,
            });
        }
    }

    public static attemptStartGame() {
        if (ServerTalker.serverTalker && ServerTalker.serverTalker.isReady()) {
            ServerTalker.serverTalker.sendMessage({
                type: 'lobbyClientMessage',
                msg: { type: 'clientPressStartGame' },
                clientId: GlobalInfo.playerInfo.id,
            });
        } else {
            HomePresenter.showConnectionError();
        }
    }
}
