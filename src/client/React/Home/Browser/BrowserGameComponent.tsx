import { Component } from 'react';
import React from 'react';
import { BrowserPresenter } from '../../../Presenter/BrowserPresenter';

export class BrowserGameComponent extends Component<BrowserGameComponentProps, {}> {
    constructor(props: BrowserGameComponentProps) {
        super(props);
    }

    render() {
        return (
            <div
                className="BrowserGameComponent"
                onClick={() => {
                    BrowserPresenter.attemptJoinGame(this.props.gameID);
                }}
            >
                {this.props.gameName}
            </div>
        );
    }
}

export interface BrowserGameComponentProps {
    gameID: number;
    gameName: string;
}
