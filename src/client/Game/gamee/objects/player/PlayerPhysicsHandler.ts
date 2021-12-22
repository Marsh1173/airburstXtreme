import { config } from '../../../util/config';
import { Vector2D } from '../../../util/Vector2D';
import { PhysicsHandler } from '../physics/PhysicsHandler';
import { Player } from './Player';

export class PlayerPhysicsHandler extends PhysicsHandler {
    constructor(private readonly player: Player, position: Vector2D, momentum: Vector2D) {
        super(position, momentum);
    }

    protected checkBoundaries(): void {
        let collisionRadius: number =
            this.player.balloonHandler.getPossibleCollisionRange() - config.paddleThickness * 2;

        if (this.position.x < collisionRadius) {
            this.momentum.x *= -1;
            this.position.x = collisionRadius * 2 - this.position.x;
        } else if (this.position.x > config.gameSize.width - collisionRadius) {
            this.momentum.x *= -1;
            this.position.x = (config.gameSize.width - collisionRadius) * 2 - this.position.x;
        }

        if (this.position.y < collisionRadius) {
            this.momentum.y *= -1;
            this.position.y = collisionRadius * 2 - this.position.y;
        } else if (this.position.y > config.gameSize.height - collisionRadius) {
            this.momentum.y *= -1;
            this.position.y = (config.gameSize.height - collisionRadius) * 2 - this.position.y;
        }
    }
}
