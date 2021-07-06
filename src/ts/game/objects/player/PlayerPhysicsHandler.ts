import { Vector2D } from '../../../util/Vector2D';
import { PhysicsHandler } from '../physics/PhysicsHandler';

export class PlayerPhysicsHandler extends PhysicsHandler {
    constructor(position: Vector2D, momentum: Vector2D) {
        super(position, momentum);
    }

    protected checkBoundaries(): void {
        //check if player is outside boundaries and bounce him back
    }
}
