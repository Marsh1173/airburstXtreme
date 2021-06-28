export type CollidableType = 'paddle' | 'player' | 'mine' | 'bouncingBubble' | 'wall';
export const canCollide: Record<CollidableType, Record<CollidableType, boolean>> = {
    mine: {
        mine: false,
        paddle: false,
        player: true,
        bouncingBubble: false,
        wall: true,
    },
    player: {
        mine: true,
        paddle: false,
        player: true,
        bouncingBubble: false,
        wall: true,
    },
    paddle: {
        mine: false,
        paddle: false,
        player: false,
        bouncingBubble: false,
        wall: false,
    },
    bouncingBubble: {
        mine: false,
        paddle: false,
        player: false,
        bouncingBubble: false,
        wall: true,
    },
    wall: {
        mine: true,
        paddle: false,
        player: true,
        bouncingBubble: true,
        wall: false,
    },
};

export const doesCollide: Record<
    string,
    Record<string, <One extends Collidable, Other extends Collidable>(one: One, other: Other) => boolean>
> = {};
// doesCollide['wall'] = {
//     bouncingBubble: (one: Wall, other: BouncingBubble) => {
//         return true;
//     },
// };

export const collide: Record<string, Record<string, (one: Collidable, other: Collidable) => boolean>> = {};

export interface Collidable {
    collide: (other: Collidable) => void;
    collidableType: CollidableType;
}
