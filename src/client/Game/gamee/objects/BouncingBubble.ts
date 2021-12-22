import { ImageHandler } from '../../handlers/ImageHandler';
import { Vector2D } from '../../util/Vector2D';
import { Collidable, CollidableType } from '../Collidable';
import { Updatable } from '../Updatable';
import { Bubble } from './Bubble';

export class BouncingBubble extends Bubble implements Updatable, Collidable {
    constructor(radius: number, position: Vector2D, imageHandler: ImageHandler, private readonly momentum: Vector2D) {
        super(radius, position);
    }

    public update(elapsedTime: number): void {
        this.position.x += this.momentum.x * elapsedTime;
        this.position.y += this.momentum.y * elapsedTime;
    }

    public collidableType: CollidableType = 'bouncingBubble';

    public collide(other: Collidable): void {
        this.momentum.x *= -1;
        this.momentum.y *= -1;
    }
}
