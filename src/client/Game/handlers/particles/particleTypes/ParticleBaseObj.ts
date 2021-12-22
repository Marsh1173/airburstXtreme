import { Vector2D } from '../../../util/Vector2D';

export abstract class ParticleBaseObj {
    public ifDead: boolean = false;

    constructor(
        protected readonly ctx: CanvasRenderingContext2D,
        protected remainingLife: number,
        protected readonly position: Vector2D,
    ) {}

    public update(elapsedTime: number) {
        this.remainingLife -= elapsedTime;
        if (this.remainingLife <= 0) {
            this.ifDead = true;
        }
    }

    public abstract render(): void;

    public abstract getParticleName(): string;
}
