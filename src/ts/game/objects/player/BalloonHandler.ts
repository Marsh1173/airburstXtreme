import { findAngle } from '../../../util/angleFuncs';
import { config } from '../../../util/config';
import { findDifference, findDistance, findLength, Vector2D } from '../../../util/Vector2D';
import { Player } from './Player';

export class BalloonHandler {
    private readonly layers: boolean[][] = [];

    //this is the radius of a circle that contains the paddle and all the blocks - maybe it would be better placed in the collision handler
    private possibleCollisionRange: number = 0;

    constructor(
        private readonly player: Player,
        private readonly position: Vector2D,
        private readonly ctx: CanvasRenderingContext2D,
    ) {
        this.initBalloonLayers();
        this.updatePossibleCollisionRange();
    }

    public popBallon(layer: number, index: number) {
        if (layer < 0 || layer >= this.layers.length || index < 0 || index >= this.layers[layer].length) return;
        this.layers[layer][index] = false;
        this.updatePossibleCollisionRange();
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
        this.ctx.strokeStyle = 'green';
        this.ctx.lineWidth = config.playerLayerHeight - config.playerLayerSeparationWidth;
        this.ctx.shadowBlur = 30;
        this.ctx.shadowColor = 'green';

        //eventually we'd want to preload these on different canvases and redraw them every time we needed to. Drawing arcs is expensive
        for (let i: number = 0; i < this.layers.length; i++) {
            let segmentFraction: number = (Math.PI * 2) / this.layers[i].length;
            let radius: number = this.getLayerRadius(i) - config.playerLayerHeight * 0.5;

            let spacing: number = 1 / ((i + 1) * 50);

            for (let j: number = 0; j < this.layers[i].length; j++) {
                if (this.layers[i][j]) {
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, radius, segmentFraction * j + spacing, segmentFraction * (j + 1) - spacing);
                    this.ctx.stroke();
                }
            }
        }

        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = 'cyan';
        this.ctx.shadowColor = 'cyan';

        this.ctx.beginPath();
        this.ctx.arc(0, 0, config.playerCenterRadius, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.shadowColor = 'none';
        this.ctx.shadowBlur = 0;
    }
}
