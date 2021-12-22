import { ParticleBaseObj } from './particleTypes/ParticleBaseObj';

export class ParticleContainer {
    public previousParticle: ParticleContainer | undefined = undefined;
    public nextParticle: ParticleContainer | undefined = undefined;

    constructor(public particle: ParticleBaseObj) {}

    public render() {
        this.particle.render();
    }

    public update(elapsedTime: number) {
        this.particle.update(elapsedTime);
    }
}
