export interface Vector2D {
    x: number;
    y: number;
}

export function findLength(vector: Vector2D): number {
    return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}

export function findDifference(v1: Vector2D, v2: Vector2D): Vector2D {
    return { x: v2.x - v1.x, y: v2.y - v1.y };
}

export function findDistance(v1: Vector2D, v2: Vector2D): number {
    return Math.sqrt((v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2);
}

export function dotProduct(v1: Vector2D, v2: Vector2D): number {
    return v1.x * v2.x + v1.y * v2.y;
}

export function vectorProject(v1: Vector2D, v2: Vector2D): Vector2D {
    var norm: number = findDistance({ x: 0, y: 0 }, v2);
    var scalar: number = dotProduct(v1, v2) / Math.pow(norm, 2);
    return { x: v2.x * scalar, y: v2.y * scalar };
}
