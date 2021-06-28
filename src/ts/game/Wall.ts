import { Vector2D } from '../util/Vector2D';
import { Collidable, CollidableType } from './Collidable';
import { Renderable } from './Renderable';
import { Updatable } from './Updatable';

export class Wall implements Collidable, Renderable, Updatable {
    constructor(private readonly startPosition: Vector2D, private readonly endPosition: Vector2D) {}

    public collide(other: Collidable): void {
        // Do nothing
    }

    public collidableType: CollidableType = 'wall';

    public render(): void {
        // Do nothing
    }

    public update(): void {
        // Do nothing
    }
}
