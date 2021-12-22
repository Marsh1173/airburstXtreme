import { GlobalInfo } from '../Model/GlobalInfo/GlobalInfo';
import { optionalGetInputString } from '../MiscFuncs/getInputString';
import { ServerTalker } from '../Model/ServerHandling/ServerTalker';
import { HomePresenter } from './HomePresenter';
import { Lobby } from '../../model/Lobby';

export class BrowserPresenter {
    private static updateGameListFunc: ((games: { id: number; name: string }[]) => void) | undefined = undefined;

    public static setUpdateGameListFunc(func: ((games: { id: number; name: string }[]) => void) | undefined) {
        BrowserPresenter.updateGameListFunc = func;
    }

    public static updateGameList(games: { id: number; name: string }[]) {
        GlobalInfo.currentGameList = games;
        if (BrowserPresenter.updateGameListFunc) {
            BrowserPresenter.updateGameListFunc(games);
        }
    }

    public static attemptJoinGame(gameID: number) {
        if (ServerTalker.serverTalker && ServerTalker.serverTalker.isReady()) {
            ServerTalker.serverTalker.sendMessage({
                type: 'browserClientMessage',
                msg: { type: 'clientJoinGame', gameID },
                clientID: GlobalInfo.playerInfo.id,
                clientName: GlobalInfo.playerInfo.name,
            });
        } else {
            HomePresenter.showConnectionError();
        }
    }

    public static attemptCreateGame() {
        // if (HomePresenter.changeHomeComponentView) {
        //     HomePresenter.changeHomeComponentView('lobby');
        // }
        let lobbyName: string | undefined = optionalGetInputString(
            'Enter your game name:',
            GlobalInfo.playerInfo.name + "'s Game",
        );
        if (lobbyName) {
            if (ServerTalker.serverTalker && ServerTalker.serverTalker.isReady()) {
                ServerTalker.serverTalker.sendMessage({
                    type: 'browserClientMessage',
                    msg: { type: 'clientCreateGame', name: lobbyName },
                    clientID: GlobalInfo.playerInfo.id,
                    clientName: GlobalInfo.playerInfo.name,
                });
            } else {
                HomePresenter.showConnectionError();
            }
        }
    }

    public static moveToLobby(lobby: Lobby) {
        if (HomePresenter.changeHomeComponentView && ServerTalker.serverTalker) {
            GlobalInfo.currentLobby = lobby;
            HomePresenter.changeHomeComponentView('lobby');
        }
    }
}
