import { Component } from 'react';
import React from 'react';
import { BrowserGameComponent } from './BrowserGameComponent';
import { BrowserPresenter } from '../../../Presenter/BrowserPresenter';
import './BrowserComponentStyles.less';
import { getNextComponentId } from '../../../MiscFuncs/getNextComponentId';
import { GlobalInfo } from '../../../Model/GlobalInfo/GlobalInfo';

export class BrowserComponent extends Component<{}, BrowserState> {
    constructor(props: any) {
        super(props);
        this.state = { games: GlobalInfo.currentGameList };
    }

    render() {
        let components: JSX.Element[] = this.state.games.map((game) => {
            return (
                <BrowserGameComponent
                    gameID={game.id}
                    gameName={game.name}
                    key={getNextComponentId()}
                ></BrowserGameComponent>
            );
        });

        return (
            <div className="BrowserComponent">
                <fieldset>
                    <legend>Lobbies</legend>
                    {components}
                </fieldset>
            </div>
        );
    }

    componentDidMount() {
        BrowserPresenter.setUpdateGameListFunc((games: { id: number; name: string }[]) => {
            this.setState({ games });
        });
    }
    componentWillUnmount() {
        BrowserPresenter.setUpdateGameListFunc(undefined);
    }
}

export interface BrowserState {
    games: { id: number; name: string }[];
}
