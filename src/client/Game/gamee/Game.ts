import { AudioHandler } from '../handlers/AudioHandler';
import { ImageHandler } from '../handlers/ImageHandler';
import { InputHandler } from '../handlers/InputHandler';
import { ParticleHandler } from '../handlers/particles/ParticleHandler';
import { Size } from '../util/Size';
import { findDifference, Vector2D } from '../util/Vector2D';
import { canCollide, Collidable } from './Collidable';
import { Ball } from './objects/ball/Ball';
import { BouncingBubble } from './objects/BouncingBubble';
import { Player } from './objects/player/Player';
import { Renderable } from './Renderable';
import { Updatable } from './Updatable';

export class Game {
    private readonly inputHandler = new InputHandler();
    private readonly imageHandler = new ImageHandler();
    private readonly audioHandler = new AudioHandler();
    private readonly particleHandler: ParticleHandler;

    private readonly objects: (Renderable & Updatable & Collidable)[] = [];

    private readonly dummyPlayer: Player;

    constructor(private readonly canvasSize: Size, private readonly context2d: CanvasRenderingContext2D) {
        this.particleHandler = new ParticleHandler(this.context2d);

        //this.objects.push(new BouncingBubble(15, { x: 0, y: 0 }, this.imageHandler, { x: 20, y: 20 }));

        this.dummyPlayer = new Player({ x: 200, y: 200 }, { x: 0, y: 0 }, this.context2d, this, this.particleHandler);
        this.objects.push(this.dummyPlayer);
        this.objects.push(new Ball({ x: 450, y: 450 }, 1, this.context2d, this.particleHandler, this.dummyPlayer));
        this.objects.push(new Ball({ x: 450, y: 450 }, 1.1, this.context2d, this.particleHandler, this.dummyPlayer));
        this.objects.push(new Ball({ x: 450, y: 450 }, 1.2, this.context2d, this.particleHandler, this.dummyPlayer));
        this.objects.push(new Ball({ x: 450, y: 450 }, 1.3, this.context2d, this.particleHandler, this.dummyPlayer));
    }

    private update(elapsedTime: number): void {
        this.objects.forEach((object) => object.update(elapsedTime));
        this.particleHandler.update(elapsedTime);
    }

    private render(): void {
        this.context2d.resetTransform();
        this.context2d.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        this.objects.forEach((object) => object.render(this.context2d));
        this.particleHandler.render();
    }

    public async start(): Promise<void> {
        await this.imageHandler.load();
        await this.audioHandler.load();
        window.requestAnimationFrame(this.loop.bind(this));
    }

    private lastTime?: number;
    private loop(timestamp: number): void {
        if (!this.lastTime) {
            this.lastTime = timestamp;
        }
        const elapsedTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        this.update(elapsedTime);
        this.render();
        window.requestAnimationFrame(this.loop.bind(this));
    }
}
