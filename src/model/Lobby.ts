import { PlayerInfo } from './PlayerInfo';

export interface Lobby {
    id: number;
    name: string;
    players: PlayerInfo[];
}
