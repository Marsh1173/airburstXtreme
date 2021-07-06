import { addAngles, angleIsWithin, findAngle } from '../../../util/angleFuncs';
import { config } from '../../../util/config';
import { findDistance, Vector2D } from '../../../util/Vector2D';
import { Player } from './Player';

export type RotationDirectionType = 'clockwise' | 'counterclockwise' | 'stop';

export class PaddleHandler {
    public angle: number = 0;
    public rotationDirection: RotationDirectionType = 'stop';

    private paddleRadius: number = config.paddleRadius;

    constructor(
        private readonly player: Player,
        private readonly position: Vector2D,
        private readonly ctx: CanvasRenderingContext2D,
        paddleRadius?: number,
    ) {
        if (paddleRadius) {
            this.paddleRadius = paddleRadius;
        }
    }

    public changeRotationDirection(newDirection: RotationDirectionType) {
        this.rotationDirection = newDirection;
    }

    public checkIfBallCollidesWithPaddle(position: Vector2D): boolean {
        let angleToBall: number = findAngle(this.position, position);
        let distanceToBall: number = findDistance(this.position, position);
        let collisionRange: number = this.player.balloonHandler.getPossibleCollisionRange();

        return (
            angleIsWithin(angleToBall, this.angle, this.paddleRadius / 2) &&
            distanceToBall < collisionRange + config.paddleThickness / 2 &&
            distanceToBall > collisionRange - config.paddleThickness / 2
        );
    }

    private updateRotation(elapsedTime: number) {
        if (this.rotationDirection !== 'stop') {
            let totalRotation: number = config.rotateSpeed * elapsedTime;

            if (this.rotationDirection === 'clockwise') {
                this.angle = addAngles(this.angle, totalRotation);
            } else {
                this.angle = addAngles(this.angle, -totalRotation);
            }
        }
    }

    public update(elapsedTime: number) {
        this.updateRotation(elapsedTime);
    }

    public render() {
        this.ctx.strokeStyle = 'cyan';
        this.ctx.lineWidth = config.paddleThickness;
        this.ctx.lineCap = 'round';

        this.ctx.beginPath();

        this.ctx.arc(
            0,
            0,
            this.player.balloonHandler.getPossibleCollisionRange() - config.paddleThickness / 2,
            this.angle - this.paddleRadius / 2,
            this.angle + this.paddleRadius / 2,
        );

        this.ctx.stroke();

        this.ctx.lineCap = 'butt';
    }
}
