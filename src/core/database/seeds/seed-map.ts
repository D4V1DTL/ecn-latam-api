export const seedMap = new Map<string, number>();

export function setSeedRef(ref: string, id: number) {
    seedMap.set(ref, id);
}

export function getSeedRef(ref: string): number {
    const id = seedMap.get(ref);
    if (!id) throw new Error(`Missing seed reference: ${ref}`);
    return id;
}
