import { ParticleHandler } from '../../../handlers/particles/ParticleHandler';
import { findAngle } from '../../../util/angleFuncs';
import { config } from '../../../util/config';
import { findDifference, findDistance, findLength, Vector2D } from '../../../util/Vector2D';
import { Player } from './Player';

const SHADOW_BLUR = 20;

export class BalloonHandler {
    protected balloonCanvases: HTMLCanvasElement[] = [];
    private readonly layers: boolean[][] = [];

    //this is the radius of a circle that contains the paddle and all the blocks - maybe it would be better placed in the collision handler
    private possibleCollisionRange: number = 0;

    constructor(
        private readonly player: Player,
        private readonly position: Vector2D,
        private readonly ctx: CanvasRenderingContext2D,
        private readonly particleHandler: ParticleHandler,
    ) {
        this.initBalloonLayers();
        this.updatePossibleCollisionRange();

        this.setBalloonImages('red');
    }

    public popBallon(layer: number, index: number) {
        if (layer < 0 || layer >= this.layers.length || index < 0 || index >= this.layers[layer].length) return;
        this.layers[layer][index] = false;
        this.updatePossibleCollisionRange();

        let angle: number = this.getAngleFromBalloon(layer, index);
        this.particleHandler.addSegmentBreak(this.position, angle, -SHADOW_BLUR - 5, this.getBalloonImage(layer));
    }

    public ifExistsBalloon(layer: number, index: number): boolean {
        return this.layers[layer][index];
    }

    private updatePossibleCollisionRange() {
        this.possibleCollisionRange = config.playerCenterRadius + config.playerLayerHeight;

        for (let i: number = 0; i < this.layers.length; i++) {
            if (this.layers[i].lastIndexOf(true) !== -1) {
                this.possibleCollisionRange = config.playerCenterRadius + config.playerLayerHeight * (i + 2);
            }
        }
    }

    private initBalloonLayers() {
        for (let i = 0; i < config.playerLayerBalloonCount.length; i++) {
            this.layers.push([]);
            for (let j = 0; j < config.playerLayerBalloonCount[i]; j++) {
                this.layers[i].push(true);
            }
        }
    }

    public getPossibleCollisionRange(): number {
        return this.possibleCollisionRange;
    }

    /**
     * @param layer Index of the layer
     * @returns The radius of the OUTER edge of the layer
     */
    public getLayerRadius(layer: number): number {
        return config.playerCenterRadius + config.playerLayerHeight * (layer + 1);
    }

    //returns the layer that a specificied radius falls into
    public getLayerFromRadius(radius: number): number {
        return Math.floor((radius - config.playerCenterRadius) / config.playerLayerHeight);
    }

    //returns the corresponding balloon boolean given an angle and a layer
    public getBalloonFromAngle(angle: number, layer: number): boolean {
        return this.layers[layer][this.getBalloonIndexFromAngle(angle, layer)];
    }

    //returns the corresponding balloon index given an angle and a layer
    public getBalloonIndexFromAngle(angle: number, layer: number): number {
        return Math.floor((angle * config.playerLayerBalloonCount[layer]) / (Math.PI * 2));
    }

    public getAngleFromBalloon(layer: number, index: number): number {
        let segmentLength: number = (Math.PI * 2) / config.playerLayerBalloonCount[layer];
        return segmentLength * index;
    }

    public getBalloonFromPosition(position: Vector2D): { layer: number; index: number } | undefined {
        let angle: number = findAngle(this.position, position);
        let distanceFromCenter: number = findDistance(this.position, position);
        let minHitLayer: number = this.getLayerFromRadius(distanceFromCenter);

        let balloon: { layer: number; index: number } | undefined = undefined;

        if (minHitLayer >= 0 && minHitLayer < this.layers.length) {
            balloon = { layer: minHitLayer, index: this.getBalloonIndexFromAngle(angle, minHitLayer) };
        }

        return balloon;
    }

    public render() {
        for (let i: number = 0; i < this.layers.length; i++) {
            for (let j: number = 0; j < this.layers[i].length; j++) {
                if (this.layers[i][j]) {
                    this.ctx.drawImage(this.balloonCanvases[i], -SHADOW_BLUR - 5, -SHADOW_BLUR - 5);
                }
                this.ctx.rotate((Math.PI * 2) / this.layers[i].length);
            }
        }

        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = 'cyan';
        this.ctx.shadowColor = 'cyan';
        this.ctx.shadowBlur = 20;

        this.ctx.beginPath();
        this.ctx.arc(0, 0, config.playerCenterRadius, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.shadowColor = 'none';
        this.ctx.shadowBlur = 0;
    }

    protected setBalloonImages(segmentColor: string) {
        for (let i: number = 0; i < this.layers.length; i++) {
            this.balloonCanvases.push(document.createElement('canvas'));

            let radius: number = this.getLayerRadius(i) - config.playerLayerHeight * 0.5;
            let spacing: number = 1 / ((i + 1) * 50);

            this.balloonCanvases[i].height = SHADOW_BLUR * 2 + config.playerLayerHeight + radius;
            this.balloonCanvases[i].width = SHADOW_BLUR * 2 + config.playerLayerHeight + radius;
            let tempCTX: CanvasRenderingContext2D = this.balloonCanvases[i].getContext('2d')!;

            tempCTX.strokeStyle = segmentColor;
            tempCTX.lineWidth = config.playerLayerHeight - config.playerLayerSeparationWidth;
            tempCTX.shadowBlur = SHADOW_BLUR;
            tempCTX.shadowColor = segmentColor;

            tempCTX.beginPath();
            tempCTX.arc(
                SHADOW_BLUR + 5,
                SHADOW_BLUR + 5,
                radius,
                spacing,
                (Math.PI * 2) / this.layers[i].length - spacing,
            );
            tempCTX.stroke();

            tempCTX.shadowColor = 'none';
            tempCTX.shadowBlur = 0;
        }
    }

    public getBalloonImage(layer: number): HTMLCanvasElement {
        return this.balloonCanvases[layer];
    }
}
