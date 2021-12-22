import React, { Component, useState } from 'react';
import { BrowserPresenter } from '../../Presenter/BrowserPresenter';
import { HomePresenter } from '../../Presenter/HomePresenter';
import { BrowserComponent } from './Browser/BrowserComponent';
import { ErrorComponent } from './Extras/ErrorComponent';
import './HomeStyles.less';
import { LobbyComponent } from './Lobby/Lobby';

interface HomeComponentState {
    curScreen: string;
}

export class HomeComponent extends Component<{}, HomeComponentState> {
    private errorRef: React.RefObject<ErrorComponent> = React.createRef();

    constructor(props: any) {
        super(props);

        this.state = { curScreen: 'home' };
    }

    render() {
        return (
            <div className="HomeComponent fade-in">
                <div className="menuContainer">
                    {this.state.curScreen == 'home' && (
                        <div className="mainMenu">
                            <h1>Airburst X-Treme</h1>
                            <BrowserComponent></BrowserComponent>
                            <button className="goodButton" onClick={BrowserPresenter.attemptCreateGame}>
                                + New Game
                            </button>
                            <button className="changeNameButton" onClick={HomePresenter.onPressChangeName}>
                                Change Name
                            </button>
                        </div>
                    )}
                    {this.state.curScreen == 'lobby' && <LobbyComponent></LobbyComponent>}
                </div>
                {this.state.curScreen == 'game' && <LobbyComponent></LobbyComponent>}

                <ErrorComponent ref={this.errorRef}></ErrorComponent>
            </div>
        );
    }

    componentDidMount() {
        HomePresenter.changeHomeComponentView = (val: string) => {
            this.setState({ curScreen: val });
        };

        HomePresenter.setShowErrorFunc((val: string, ifBad: boolean) => {
            if (this.errorRef.current) {
                this.errorRef.current.setState({ val, ifBad, ifHidden: false });
            }
        });

        HomePresenter.showError('Connecting to server...');

        HomePresenter.initializeServer();
    }
    componentWillUnmount() {
        HomePresenter.changeHomeComponentView = undefined;
        HomePresenter.setShowErrorFunc(undefined);
    }
}
