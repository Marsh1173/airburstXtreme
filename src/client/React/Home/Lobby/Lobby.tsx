import React, { Component, useState } from 'react';
import { PlayerInfo } from '../../../../model/PlayerInfo';
import { getNextComponentId } from '../../../MiscFuncs/getNextComponentId';
import { GlobalInfo } from '../../../Model/GlobalInfo/GlobalInfo';
import { LobbyPresenter } from '../../../Presenter/LobbyPresenter';
import { LobbyPlayerComponent } from './LobbyPlayerComponent';
import './LobbyStyles.less';

export class LobbyComponent extends Component<{}, LobbyState> {
    constructor(props: any) {
        super(props);

        this.state = { players: GlobalInfo.currentLobby.players };
    }

    render() {
        let components: JSX.Element[] = this.state.players.map((player) => {
            return <LobbyPlayerComponent info={player} key={getNextComponentId()}></LobbyPlayerComponent>;
        });
        return (
            <div className="LobbyComponent fade-in">
                <h1>- {GlobalInfo.currentLobby.name} -</h1>
                <div className="nameDiv">{components}</div>
                <div className="buttons">
                    <button className="button" onClick={LobbyPresenter.attemptLeaveLobby}>
                        Leave
                    </button>
                    <button className="goodButton" onClick={LobbyPresenter.attemptStartGame}>
                        Start Game
                    </button>
                </div>
            </div>
        );
    }

    componentDidMount() {
        LobbyPresenter.setUpdateLobbyPlayerListFunc((players: PlayerInfo[]) => {
            this.setState({ players });
        });
    }
    componentWillUnmount() {
        LobbyPresenter.setUpdateLobbyPlayerListFunc(undefined);
    }
}
export interface LobbyState {
    players: PlayerInfo[];
}
