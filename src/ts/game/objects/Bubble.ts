import { ImageHandler } from '../../handlers/ImageHandler';
import { Vector2D } from '../../util/Vector2D';
import { Renderable } from '../Renderable';

export class Bubble implements Renderable {
    constructor(
        private readonly radius: number,
        protected readonly position: Vector2D,
        private readonly imageHandler: ImageHandler,
    ) {}

    public render(context2d: CanvasRenderingContext2D): void {
        context2d.drawImage(
            this.imageHandler.images['bubbleSVG'],
            0,
            0,
            160,
            160,
            this.position.x,
            this.position.y,
            this.radius * 2,
            this.radius * 2,
        );
    }
}
