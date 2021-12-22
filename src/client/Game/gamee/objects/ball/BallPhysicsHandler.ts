import { config } from '../../../util/config';
import { Vector2D } from '../../../util/Vector2D';
import { PhysicsHandler } from '../physics/PhysicsHandler';
import { Ball } from './Ball';

export class BallPhysicsHandler extends PhysicsHandler {
    constructor(private readonly ball: Ball, position: Vector2D, momentum: Vector2D) {
        super(position, momentum);
    }

    //checks if ball is outside boundaries and bounces it back
    protected checkBoundaries(): void {
        let ifBounced: boolean = false;

        if (this.position.x < config.ballRadius) {
            this.momentum.x *= -1;
            this.position.x = config.ballRadius * 2 - this.position.x;
            ifBounced = true;
        } else if (this.position.x > config.gameSize.width - config.ballRadius) {
            this.momentum.x *= -1;
            ifBounced = true;
            this.position.x = (config.gameSize.width - config.ballRadius) * 2 - this.position.x;
        }

        if (this.position.y < config.ballRadius) {
            this.momentum.y *= -1;
            this.position.y = config.ballRadius * 2 - this.position.y;
            ifBounced = true;
        } else if (this.position.y > config.gameSize.height - config.ballRadius) {
            this.momentum.y *= -1;
            this.position.y = (config.gameSize.height - config.ballRadius) * 2 - this.position.y;
            ifBounced = true;
        }

        if (ifBounced) this.ball.setBounced(true);
    }
}
