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
    ballStartSpeed: number;
}

export const config: Config = {
    gameSize: { width: 900, height: 900 },
    rotateSpeed: (Math.PI * 3) / 2,
    paddleThickness: 10,
    paddleRadius: Math.PI / 2,
    playerCenterRadius: 50,
    playerLayerHeight: 20,
    playerLayerSeparationWidth: 3,
    playerLayerBalloonCount: [8, 20, 30],
    ballRadius: 7,
    ballStartSpeed: 500,
};
//playerLayerBalloonCount: [4, 20, 12, 16],
