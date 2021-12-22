import { angleIsWithin, findAngle, findBestRotation } from '../../../util/angleFuncs';
import { findDifference, Vector2D } from '../../../util/Vector2D';
import { Collidable, CollidableType } from '../../Collidable';
import { Updatable } from '../../Updatable';
import { BalloonHandler } from './BalloonHandler';
import { PlayerCollisionHandler } from './CollisionHandler';
import { PaddleHandler, RotationDirectionType } from './PaddleHandler';
import { PhysicsHandler } from '../physics/PhysicsHandler';
import { PlayerPhysicsHandler } from './PlayerPhysicsHandler';
import { ParticleHandler } from '../../../handlers/particles/ParticleHandler';
import { PlayerInputHandler } from './PlayerInputHandler';
import { Game } from '../../Game';

export class Player implements Updatable, Collidable {
    public collidableType: CollidableType = 'player';

    //private readonly classtype: Classtype
    public readonly balloonHandler: BalloonHandler;
    public readonly physicsHandler: PlayerPhysicsHandler;
    public readonly paddleHandler: PaddleHandler;
    public readonly collisionHandler: PlayerCollisionHandler;
    public readonly playerInputHandler: PlayerInputHandler;

    constructor(
        private readonly position: Vector2D,
        private readonly momentum: Vector2D,
        private readonly ctx: CanvasRenderingContext2D,
        public readonly game: Game,
        particleHandler: ParticleHandler,
    ) {
        this.physicsHandler = new PlayerPhysicsHandler(this, this.position, this.momentum);
        this.balloonHandler = new BalloonHandler(this, this.position, this.ctx, particleHandler);
        this.paddleHandler = new PaddleHandler(this, this.position, this.ctx);
        this.collisionHandler = new PlayerCollisionHandler(this, this.position, this.momentum);
        this.playerInputHandler = new PlayerInputHandler(this);

        this.playerInputHandler.initControls();
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
