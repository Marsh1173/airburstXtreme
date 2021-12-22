import { Vector2D } from '../../../util/Vector2D';
import { ImageHandler } from '../../ImageHandler';
import { ParticleBaseObj } from './ParticleBaseObj';

const BOUNCE_BASE_SIZE: number = 0.3;
const BOUNCE_SIZE_INCREASE: number = 0.3;
const BOUNCE_LIFETIME: number = 0.2;
const BOUNCE_BASE_OPACITY: number = 1;

export class BallBounce extends ParticleBaseObj {
    constructor(ctx: CanvasRenderingContext2D, position: Vector2D) {
        super(ctx, BOUNCE_LIFETIME + 0, position);
    }

    public render() {
        let img: HTMLImageElement = ImageHandler.images['bounce'];
        let scale: number = BOUNCE_BASE_SIZE + BOUNCE_SIZE_INCREASE * (1 - this.remainingLife / BOUNCE_LIFETIME);

        this.ctx.globalAlpha = BOUNCE_BASE_OPACITY * (this.remainingLife / BOUNCE_LIFETIME);
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.scale(scale, scale);

        this.ctx.drawImage(img, img.width / -2, img.height / -2);

        this.ctx.scale(1 / scale, 1 / scale);
        this.ctx.translate(-this.position.x, -this.position.y);
        this.ctx.globalAlpha = 1;
    }

    public getParticleName(): string {
        return 'Ball Bounce';
    }
}
