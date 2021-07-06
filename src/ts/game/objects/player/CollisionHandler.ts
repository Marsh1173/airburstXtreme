import { Vector2D } from '../../../util/Vector2D';
import { Player } from './Player';

//might contain the ball hitting logic?
export class PlayerCollisionHandler {
    constructor(
        private readonly player: Player,
        private readonly position: Vector2D,
        private readonly momentum: Vector2D,
    ) {}
}
