import {
    addAngles,
    angleIsWithin,
    findAngle,
    findVectorFromAngle,
    flipVectorAroundAngle,
} from '../../../util/angleFuncs';
import { config } from '../../../util/config';
import { findDifference, findDistance, findLength, Vector2D } from '../../../util/Vector2D';
import { Collidable, CollidableType } from '../../Collidable';
import { Renderable } from '../../Renderable';
import { Updatable } from '../../Updatable';
import { Player } from '../player/Player';
import { BallPhysicsHandler } from './BallPhysicsHandler';

export class Ball implements Updatable, Collidable, Renderable {
    public collidableType: CollidableType = 'bouncingBubble';

    public readonly physicsHandler: BallPhysicsHandler;

    constructor(
        private readonly position: Vector2D,
        private readonly momentum: Vector2D,
        private readonly ctx: CanvasRenderingContext2D,
        private readonly dummyPlayer: Player,
    ) {
        this.physicsHandler = new BallPhysicsHandler(this.position, this.momentum);
    }

    public update(elapsedTime: number) {
        this.physicsHandler.update(elapsedTime);
        this.checkIfHitsPlayer();
    }

    //dummy hit test - COULD BE OPTIMIZED
    private checkIfHitsPlayer() {
        let distanceToPlayer: number = findDistance(this.position, this.dummyPlayer.physicsHandler.getPosition());
        let angleFromPlayer: number = findAngle(this.dummyPlayer.physicsHandler.getPosition(), this.position);
        //if the ball is close enough to possibly hit...
        if (distanceToPlayer < config.ballRadius + this.dummyPlayer.balloonHandler.getPossibleCollisionRange()) {
            //and if the ball doesn't hit the paddle...
            if (!this.dummyPlayer.paddleHandler.checkIfBallCollidesWithPaddle(this.position)) {
                let balloon: { layer: number; index: number } | undefined =
                    this.dummyPlayer.balloonHandler.getBalloonFromPosition(this.position);

                //if it hits a balloon...
                if (
                    balloon !== undefined &&
                    this.dummyPlayer.balloonHandler.ifExistsBalloon(balloon.layer, balloon.index)
                ) {
                    let currentMomentum: number = findLength(this.momentum);
                    let newDirection: Vector2D = findVectorFromAngle(angleFromPlayer, currentMomentum);

                    this.dummyPlayer.balloonHandler.popBallon(balloon.layer, balloon.index);
                    this.momentum.x = newDirection.x;
                    this.momentum.y = newDirection.y;
                } else {
                    //check if it collides with the player core
                }
            } else {
                //otherwise bounce it in the direction the player is facing
                let currentMomentum: number = findLength(this.momentum);
                let newDirection: Vector2D = findVectorFromAngle(this.dummyPlayer.paddleHandler.angle, currentMomentum);
                this.momentum.x = newDirection.x;
                this.momentum.y = newDirection.y;
            }
        }
    }

    public render() {
        this.ctx.fillStyle = 'white';

        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, config.ballRadius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    public collide(other: Collidable): void {
        //do something
    }
}
