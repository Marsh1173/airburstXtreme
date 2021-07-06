import { Size } from './size';

export interface Config {
    gameSize: Size;
    rotateSpeed: number; // radians per second
    paddleThickness: number;
    paddleRadius: number;
    playerCenterRadius: number;
    playerLayerHeight: number;
    playerLayerSeparationWidth: number;
    playerLayerBalloonCount: number[];
    ballRadius: number;
}

export const config: Config = {
    gameSize: { width: 900, height: 900 },
    rotateSpeed: Math.PI,
    paddleThickness: 10,
    paddleRadius: Math.PI / 3,
    playerCenterRadius: 50,
    playerLayerHeight: 20,
    playerLayerSeparationWidth: 3,
    playerLayerBalloonCount: [4, 8, 12, 16],
    ballRadius: 7,
};
