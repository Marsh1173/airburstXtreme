var nextId: number = 0;
export function getNextComponentId(): number {
    return nextId++;
}
