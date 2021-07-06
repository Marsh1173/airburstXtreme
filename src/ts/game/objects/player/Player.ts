import { angleIsWithin, findAngle, findBestRotation } from '../../../util/angleFuncs';
import { findDifference, Vector2D } from '../../../util/Vector2D';
import { Collidable, CollidableType } from '../../Collidable';
import { Updatable } from '../../Updatable';
import { BalloonHandler } from './BalloonHandler';
import { PlayerCollisionHandler } from './CollisionHandler';
import { PaddleHandler, RotationDirectionType } from './PaddleHandler';
import { PhysicsHandler } from '../physics/PhysicsHandler';
import { PlayerPhysicsHandler } from './PlayerPhysicsHandler';

export class Player implements Updatable, Collidable {
    public collidableType: CollidableType = 'player';

    //private readonly classtype: Classtype
    public readonly balloonHandler: BalloonHandler;
    public readonly physicsHandler: PlayerPhysicsHandler;
    public readonly paddleHandler: PaddleHandler;
    public readonly collisionHandler: PlayerCollisionHandler;

    constructor(
        private readonly position: Vector2D,
        private readonly momentum: Vector2D,
        private readonly ctx: CanvasRenderingContext2D,
    ) {
        this.balloonHandler = new BalloonHandler(this, this.position, this.ctx);
        this.physicsHandler = new PlayerPhysicsHandler(this.position, this.momentum);
        this.paddleHandler = new PaddleHandler(this, this.position, this.ctx);
        this.collisionHandler = new PlayerCollisionHandler(this, this.position, this.momentum);

        window.onclick = (e: MouseEvent) => {
            /* this is a dummy knockback available for testing*/
            let force: Vector2D = findDifference({ x: e.clientX, y: e.clientY }, this.physicsHandler.getPosition());
            let momentum: Vector2D = this.physicsHandler.getMomentum();
            momentum.x = force.x + 0;
            momentum.y = force.y + 0;
        };

        window.onkeydown = (e: KeyboardEvent) => {
            if (e.code === 'KeyA') {
                this.paddleHandler.changeRotationDirection('counterclockwise');
            } else if (e.code === 'KeyD') {
                this.paddleHandler.changeRotationDirection('clockwise');
            }
        };

        window.onkeyup = (e: KeyboardEvent) => {
            if (e.code === 'KeyA' && this.paddleHandler.rotationDirection === 'counterclockwise') {
                this.paddleHandler.changeRotationDirection('stop');
            } else if (e.code === 'KeyD' && this.paddleHandler.rotationDirection === 'clockwise') {
                this.paddleHandler.changeRotationDirection('stop');
            }
        };
    }

    public update(elapsedTime: number) {
        this.physicsHandler.update(elapsedTime);
        this.paddleHandler.update(elapsedTime);
    }

    public render() {
        this.ctx.translate(this.position.x, this.position.y);

        this.balloonHandler.render();
        this.paddleHandler.render();

        this.ctx.translate(-this.position.x, -this.position.y);
    }

    public collide(other: Collidable): void {
        //do something
    }
}
