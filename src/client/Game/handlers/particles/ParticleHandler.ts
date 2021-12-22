import { Vector2D } from '../../util/Vector2D';
import { ParticleContainer } from './ParticleContainer';
import { BallBounce } from './particleTypes/BallBounce';
import { BalloonPop } from './particleTypes/BalloonPop';
import { ParticleBaseObj } from './particleTypes/ParticleBaseObj';
import { SegmentBreak } from './particleTypes/SegmentBreak';

export class ParticleHandler {
    private rootParticle: ParticleContainer | undefined = undefined;

    constructor(private readonly ctx: CanvasRenderingContext2D) {}

    public update(elapsedTime: number) {
        let particleContainer: ParticleContainer | undefined = this.rootParticle;
        while (particleContainer !== undefined) {
            particleContainer.update(elapsedTime);

            if (particleContainer.particle.ifDead) {
                let nextParticleContainer: ParticleContainer | undefined = particleContainer.nextParticle;
                this.deleteParticle(particleContainer);
                particleContainer = nextParticleContainer;
            } else {
                particleContainer = particleContainer.nextParticle;
            }
        }
    }

    public render() {
        let particleContainer: ParticleContainer | undefined = this.rootParticle;
        while (particleContainer !== undefined) {
            particleContainer.render();
            particleContainer = particleContainer.nextParticle;
        }
    }

    public addBallBounce(position: Vector2D) {
        this.pushParticle(new BallBounce(this.ctx, position));
    }

    public addBalloonPop(position: Vector2D, rotation: number) {
        this.pushParticle(new BalloonPop(this.ctx, position, rotation));
    }

    public addSegmentBreak(
        position: Vector2D,
        rotation: number,
        canvasOffset: number,
        segmentImage: HTMLCanvasElement,
    ) {
        this.pushParticle(new SegmentBreak(this.ctx, position, rotation, canvasOffset, segmentImage));
    }

    private pushParticle(particle: ParticleBaseObj) {
        let newParticleContainer: ParticleContainer = new ParticleContainer(particle);
        if (this.rootParticle === undefined) {
            this.rootParticle = newParticleContainer;
        } else {
            let lastContainer: ParticleContainer = this.rootParticle;
            while (lastContainer.nextParticle !== undefined) {
                lastContainer = lastContainer.nextParticle;
            }

            newParticleContainer.previousParticle = lastContainer;
            lastContainer.nextParticle = newParticleContainer;
        }
    }

    private deleteParticle(particleContainer: ParticleContainer) {
        let prevContainer: ParticleContainer | undefined = particleContainer.previousParticle;
        let nextContainer: ParticleContainer | undefined = particleContainer.nextParticle;

        if (prevContainer) {
            prevContainer.nextParticle = nextContainer;
        } else {
            this.rootParticle = nextContainer;
        }
        if (nextContainer) {
            nextContainer.previousParticle = prevContainer;
        }
    }
}
