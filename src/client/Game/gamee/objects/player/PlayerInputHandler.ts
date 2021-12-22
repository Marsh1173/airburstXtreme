import { findDifference, Vector2D } from '../../../util/Vector2D';
import { Player } from './Player';

export class PlayerInputHandler {
    constructor(private readonly player: Player) {
        window.onclick = (e: MouseEvent) => {
            /* this is a dummy knockback available for testing*/
            let force: Vector2D = findDifference(
                { x: e.clientX, y: e.clientY },
                this.player.physicsHandler.getPosition(),
            );
            let momentum: Vector2D = this.player.physicsHandler.getMomentum();
            momentum.x = force.x + 0;
            momentum.y = force.y + 0;
        };
    }

    public initControls() {
        window.onkeydown = (e: KeyboardEvent) => this.registerKeyDown(e);
        window.onkeyup = (e: KeyboardEvent) => this.registerKeyUp(e);
    }

    public clearControls() {
        throw new Error('needs to be tested');
        if (window.onkeydown === this.registerKeyDown) {
            window.onkeydown = () => {};
        }
        if (window.onkeyup === this.registerKeyUp) {
            window.onkeyup = () => {};
        }
    }

    private registerKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'KeyA') {
            this.player.paddleHandler.changeRotationDirection('counterclockwise');
        } else if (e.code === 'KeyD') {
            this.player.paddleHandler.changeRotationDirection('clockwise');
        }
    };

    private registerKeyUp = (e: KeyboardEvent) => {
        if (e.code === 'KeyA' && this.player.paddleHandler.rotationDirection === 'counterclockwise') {
            this.player.paddleHandler.changeRotationDirection('stop');
        } else if (e.code === 'KeyD' && this.player.paddleHandler.rotationDirection === 'clockwise') {
            this.player.paddleHandler.changeRotationDirection('stop');
        }
    };
}
