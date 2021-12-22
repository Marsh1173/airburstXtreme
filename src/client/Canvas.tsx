import React, { Component, createRef } from 'react';
import { Game } from './Game/gamee/Game';
import { config } from './Game/util/config';

export class Canvas extends Component {
    private readonly canvasRef = createRef<HTMLCanvasElement>();
    private game?: Game;

    render(): JSX.Element {
        return (
            <canvas
                ref={this.canvasRef}
                width={config.gameSize.width.toString()}
                height={config.gameSize.height.toString()}
            ></canvas>
        );
    }

    componentDidMount(): void {
        if (!this.canvasRef.current) {
            throw new Error('Expected canvasRef.current to be defined');
        }
        const canvasSize = {
            width: this.canvasRef.current.width,
            height: this.canvasRef.current.height,
        };
        const context2d = this.canvasRef.current.getContext('2d');
        if (!context2d) {
            throw new Error('Expected context2d to be defined');
        }
        this.game = new Game(canvasSize, context2d);
        this.game.start();
    }
}
