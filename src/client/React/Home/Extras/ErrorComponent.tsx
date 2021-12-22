import React from 'react';
import { Component } from 'react';
import './ErrorComponentStyles.less';

interface ErrorComponentState {
    val: string;
    ifHidden: boolean;
}

export class ErrorComponent extends Component<{}, ErrorComponentState> {
    private timeout: number | undefined = undefined;

    constructor(props: any) {
        super(props);

        this.state = { val: '', ifHidden: true };
    }

    render() {
        this.resetCountDown();
        this.startCountDown();

        return (
            <div
                className={`ErrorComponent ${this.state.ifHidden ? 'hidden' : 'notHidden'}`}
                onMouseEnter={() => this.resetCountDown()}
                onMouseLeave={() => {
                    if (!this.timeout) {
                        this.startCountDown();
                    }
                }}
            >
                {this.state.val}
            </div>
        );
    }

    private resetCountDown() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
            this.timeout = undefined;
        }
    }

    private startCountDown() {
        if (!this.state.ifHidden) {
            this.timeout = window.setTimeout(() => {
                this.timeout = undefined;
                this.setState({ ifHidden: true });
            }, 4000);
        }
    }
}
