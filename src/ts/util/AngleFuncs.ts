import { RotationDirectionType } from '../game/objects/player/PaddleHandler';
import { absValueModulo } from './mathFuncs';
import { Vector2D, vectorProject } from './Vector2D';

/**
 * Finds the angle between two points.
 * @param p1 The point from which the angle will be measured.
 * @param p2 The point to which the angle will be measured.
 * @returns The calculated angle.
 */
export function findAngle(p1: Vector2D, p2: Vector2D): number {
    let angle: number = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    //atan2 gives an angle between -PI and PI. For simplicity, I made all angles between 0 and PI * 2
    return angle < 0 ? angle + Math.PI * 2 : angle;
}

/**
 * Calculates two angles added together, keeping the answer between 0 and PI * 2
 */
export function addAngles(angle1: number, angle2: number): number {
    return absValueModulo(angle1 + angle2, Math.PI * 2);
}

/**
 * Attempts to find the best direction to rotate the startAngle to reach the desired angle the fastest.
 * @param startAngle
 * @param destinAngle
 * @param stopMargin Optional parameter telling the function when it's close enough to the desired angle.
 */
export function findBestRotation(startAngle: number, destinAngle: number, stopMargin?: number): RotationDirectionType {
    let difference: number = addAngles(destinAngle, -startAngle);

    if (stopMargin && angleIsWithin(startAngle, destinAngle, stopMargin)) {
        return 'stop';
    } else if (difference < Math.PI) {
        return 'clockwise';
    } else {
        return 'counterclockwise';
    }
}

/**
 * Checks if two angles are close enough to be within the stopMargin
 * @param startAngle
 * @param destinAngle
 * @param stopMargin
 */
export function angleIsWithin(startAngle: number, destinAngle: number, stopMargin: number): boolean {
    let difference: number = addAngles(destinAngle, -startAngle);
    return difference < stopMargin || difference > Math.PI * 2 - stopMargin;
}

export function findVectorFromAngle(angle: number, magnitude: number = 1): Vector2D {
    return { x: Math.cos(angle) * magnitude, y: Math.sin(angle) * magnitude };
}

/**
 * Needs to be tested --
 * @param angle
 * @param vector
 * @returns
 */
export function flipVectorAroundAngle(angle: number, vector: Vector2D): Vector2D {
    let proj: Vector2D = vectorProject(findVectorFromAngle(angle), vector);
    return { x: vector.x * 2 - proj.x, y: vector.y * 2 - proj.y };
}
