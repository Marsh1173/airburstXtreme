import { Component } from 'react';
import React from 'react';
import { PlayerInfo } from '../../../../model/PlayerInfo';
import { GlobalInfo } from '../../../Model/GlobalInfo/GlobalInfo';

export class LobbyPlayerComponent extends Component<LobbyPlayerComponentProps, {}> {
    constructor(props: LobbyPlayerComponentProps) {
        super(props);
    }

    render() {
        return (
            <div className="LobbyPlayerComponent">
                <p>{this.props.info.name}</p>
                {this.props.info.id == GlobalInfo.playerInfo.id && <span>&#8226; </span>}
            </div>
        );
    }
}

export interface LobbyPlayerComponentProps {
    info: PlayerInfo;
}
