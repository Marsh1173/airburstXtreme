import { Vector2D } from '../../../util/Vector2D';
import { ImageHandler } from '../../ImageHandler';
import { ParticleBaseObj } from './ParticleBaseObj';

const BALLON_POP_SIZE: number = 0.3;
const POP_SIZE_INCREASE: number = 0.3;
const POP_LIFETIME: number = 0.2;
const BALLON_POP_OPACITY: number = 1;

export class BalloonPop extends ParticleBaseObj {
    constructor(ctx: CanvasRenderingContext2D, position: Vector2D, private readonly rotation: number) {
        super(ctx, POP_LIFETIME + 0, position);
    }

    public render() {
        let img: HTMLImageElement = ImageHandler.images['balloonPop'];
        let scale: number = BALLON_POP_SIZE + POP_SIZE_INCREASE * (1 - this.remainingLife / POP_LIFETIME);

        this.ctx.globalAlpha = BALLON_POP_OPACITY * (this.remainingLife / POP_LIFETIME);
        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(this.rotation);
        this.ctx.scale(scale, scale);

        this.ctx.drawImage(img, img.width / -2, img.height / -2);

        this.ctx.scale(1 / scale, 1 / scale);
        this.ctx.rotate(-this.rotation);
        this.ctx.translate(-this.position.x, -this.position.y);
        this.ctx.globalAlpha = 1;
    }

    public getParticleName(): string {
        return 'Balloon Pop';
    }
}
