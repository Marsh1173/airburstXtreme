import { Lobby } from '../../../model/Lobby';
import { PlayerInfo } from '../../../model/PlayerInfo';

export class GlobalInfo {
    public static playerInfo: PlayerInfo = { id: -1, name: '' };
    public static currentLobby: Lobby = { id: -2, name: 'ERROR', players: [] };
    public static currentGameList: { id: number; name: string }[] = [];
}
