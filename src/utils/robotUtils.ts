export function isOnTheBoard(num: number): boolean {
    return (num >= 0 && num <= 4);
}

export function facingDirection(facingNum: number): string {
    // this should be handled by movement / facing
    // constraints, so shouldn't happen.
    // If it does, then something went horribly wrong.
    if (facingNum < 0 || facingNum > 4) {
        throw new Error(`Can not convert Facing to words, the value ${facingNum} is invalid!`)
    }

    const directions = ["North", "East", "South", "West"];
    return directions[facingNum];
}