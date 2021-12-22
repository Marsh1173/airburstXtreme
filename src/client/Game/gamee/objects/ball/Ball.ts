import { ImageHandler } from '../../../handlers/ImageHandler';
import { ParticleHandler } from '../../../handlers/particles/ParticleHandler';
import { addAngles, angleIsWithin, findAngle, findVectorFromAngle, rotateLine } from '../../../util/angleFuncs';
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
    private readonly momentum: Vector2D;

    private ifBounced: boolean = false;

    constructor(
        private readonly position: Vector2D,
        angle: number,
        private readonly ctx: CanvasRenderingContext2D,
        private readonly particleHandler: ParticleHandler,
        private readonly dummyPlayer: Player,
    ) {
        this.momentum = { x: Math.cos(angle) * config.ballStartSpeed, y: Math.sin(angle) * config.ballStartSpeed };
        this.physicsHandler = new BallPhysicsHandler(this, this.position, this.momentum);
    }

    public update(elapsedTime: number) {
        this.physicsHandler.update(elapsedTime);
        this.checkIfHitsPlayer();

        if (this.ifBounced) {
            this.particleHandler.addBallBounce({ x: this.position.x + 0, y: this.position.y + 0 });
            this.setBounced(false);
        }
    }

    //dummy hit test - COULD BE OPTIMIZED
    private checkIfHitsPlayer() {
        let distanceToPlayer: number = findDistance(this.position, this.dummyPlayer.physicsHandler.getPosition());
        let angleFromPlayer: number = findAngle(this.dummyPlayer.physicsHandler.getPosition(), this.position);
        let playerPossibleCollisionRange: number = this.dummyPlayer.balloonHandler.getPossibleCollisionRange();
        //if the ball is close enough to possibly hit...
        if (distanceToPlayer < config.ballRadius + playerPossibleCollisionRange) {
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

                    /*this.particleHandler.addBalloonPop(
                        { x: this.position.x + 0, y: this.position.y + 0 },
                        angleFromPlayer + Math.PI / 2,
                    );*/
                } else {
                    //check if it collides with the player core
                }
            } else {
                //otherwise bounce it in the direction the player is facing
                let currentMomentum: number = findLength(this.momentum);
                let playerPosition: Vector2D = this.dummyPlayer.physicsHandler.getPosition();

                let newAngle: number = this.dummyPlayer.paddleHandler.angle;
                let newDirection: Vector2D = findVectorFromAngle(newAngle, currentMomentum);
                let newPosition: Vector2D = {
                    x:
                        Math.cos(angleFromPlayer) * (playerPossibleCollisionRange + config.ballRadius) +
                        playerPosition.x,
                    y:
                        Math.sin(angleFromPlayer) * (playerPossibleCollisionRange + config.ballRadius) +
                        playerPosition.y,
                };

                this.momentum.x = newDirection.x;
                this.momentum.y = newDirection.y;

                this.position.x = newPosition.x + 0;
                this.position.y = newPosition.y + 0;

                this.setBounced(true);
            }
        }
    }

    public render() {
        let img: HTMLImageElement = ImageHandler.images['ball'];
        let angle: number = Math.atan2(this.momentum.y, this.momentum.x) + Math.PI / 2;

        this.ctx.translate(this.position.x, this.position.y);
        this.ctx.scale(0.5, 0.5);
        this.ctx.rotate(angle);

        this.ctx.drawImage(img, -img.width / 2, -img.height / 2);

        this.ctx.rotate(-angle);
        this.ctx.scale(2, 2);
        this.ctx.translate(-this.position.x, -this.position.y);
    }

    public setBounced(ifTrue: boolean) {
        this.ifBounced = ifTrue;
    }

    public collide(other: Collidable): void {
        //do something
    }
}
