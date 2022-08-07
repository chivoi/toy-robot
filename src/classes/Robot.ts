import { isOnTheBoard } from "../utils/robotUtils";

export enum Facing {
    North,
    East,
    South,
    West,
    __LENGTH
}

export class Robot {
    x: number;
    y: number;
    f: Facing;

    static place(x: number, y: number, f: Facing) {
        if (!Object.values(Facing).includes(f)) {
            throw new Error("invalid facing")
        }
        if (!isOnTheBoard(x) || !isOnTheBoard(y)) {
            throw new Error(`invalid ${!isOnTheBoard(x) ? 'x' : 'y'}`)
        }
        return new Robot(x, y, f)
    }

    constructor(x: number, y: number, f: Facing) {
        this.x = x;
        this.y = y;
        this.f = f;
    }

    left(): void {
        if (this.f === 0) {
            this.f = Facing.__LENGTH - 1
            return
        }

        this.f -= 1;
    }

    right(): void {
        if (this.f === Facing.__LENGTH - 1) {
            this.f = 0
            return
        }

        this.f += 1;
    }

    move() { }
    report() { }
}
