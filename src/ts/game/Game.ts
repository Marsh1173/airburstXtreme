import { AudioHandler } from '../handlers/AudioHandler';
import { ImageHandler } from '../handlers/ImageHandler';
import { InputHandler } from '../handlers/InputHandler';
import { Size } from '../util/Size';
import { canCollide, Collidable } from './Collidable';
import { BouncingBubble } from './objects/BouncingBubble';
import { Renderable } from './Renderable';
import { Updatable } from './Updatable';

export class Game {
    private readonly inputHandler = new InputHandler();
    private readonly imageHandler = new ImageHandler();
    private readonly audioHandler = new AudioHandler();

    private readonly objects: (Renderable & Updatable & Collidable)[] = [];

    constructor(private readonly canvasSize: Size, private readonly context2d: CanvasRenderingContext2D) {
        this.objects.push(new BouncingBubble(15, { x: 0, y: 0 }, this.imageHandler, { x: 20, y: 20 }));
    }

    private update(elapsedTime: number): void {
        this.objects.forEach((object) => object.update(elapsedTime));
        for (let i = 0; i < this.objects.length; i++) {
            for (let j = 0; j < i; j++) {
                if (canCollide[this.objects[i].collidableType][this.objects[j].collidableType]) {
                    this.objects[i].collide(this.objects[j]);
                }
            }
        }
    }

    private render(): void {
        this.context2d.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        this.context2d.fillStyle = 'rgb(200, 200, 200)';
        this.context2d.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        this.objects.forEach((object) => object.render(this.context2d));
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
