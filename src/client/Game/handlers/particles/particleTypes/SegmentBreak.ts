import { Vector2D } from '../../../util/Vector2D';
import { ParticleBaseObj } from './ParticleBaseObj';

const BREAK_LIFETIME: number = 0.3;

export class SegmentBreak extends ParticleBaseObj {
    private img: HTMLCanvasElement;
    constructor(
        ctx: CanvasRenderingContext2D,
        position: Vector2D,
        private readonly rotation: number,
        private readonly canvasOffset: number,
        segmentImage: HTMLCanvasElement,
    ) {
        super(ctx, BREAK_LIFETIME + 0, position);

        this.img = document.createElement('canvas');
        this.setImg(segmentImage);
    }

    public getParticleName(): string {
        return 'Segment Break';
    }

    public render() {
        this.ctx.globalAlpha = this.remainingLife / BREAK_LIFETIME;

        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.rotate(this.rotation);
        this.ctx.drawImage(this.img, this.canvasOffset, this.canvasOffset);
        this.ctx.rotate(-this.rotation);
        this.ctx.translate(-this.position.x, -this.position.y);

        this.ctx.globalAlpha = 1;
    }

    private setImg(segmentImage: HTMLCanvasElement) {
        this.img.height = segmentImage.height;
        this.img.width = segmentImage.width;

        let imgContext: CanvasRenderingContext2D = this.img.getContext('2d')!;
        imgContext.drawImage(segmentImage, 0, 0);

        imgContext.fillStyle = 'white';
        imgContext.globalCompositeOperation = 'source-in';

        imgContext.fillRect(0, 0, this.img.width, this.img.height);
    }
}
