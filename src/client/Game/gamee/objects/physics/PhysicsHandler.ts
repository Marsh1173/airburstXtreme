import { findLength, Vector2D } from '../../../util/Vector2D';

export abstract class PhysicsHandler {
    constructor(protected readonly position: Vector2D, protected readonly momentum: Vector2D) {}

    private setNewPositionFromMomentum(elapsedTime: number) {
        this.position.x += this.momentum.x * elapsedTime;
        this.position.y += this.momentum.y * elapsedTime;
    }

    public update(elapsedTime: number) {
        //1. update momentum (gravity, friction, etc)

        //2. update position from momentum
        this.setNewPositionFromMomentum(elapsedTime);

        //3. if outside forces act on you, find best solver path

        //4. apply solver path
        this.checkBoundaries();
    }

    protected abstract checkBoundaries(): void;

    public getPosition(): Vector2D {
        return this.position;
    }

    public getMomentum(): Vector2D {
        return this.momentum;
    }
}
