export enum Facing {
    North = 1,
    East = 2,
    South = 3,
    West = 4,
}

export class Robot {
    x: number;
    y: number;
    f: Facing;


    constructor(x: number, y: number, f: Facing) {
        this.x = x;
        this.y = y;
        this.f = f;
    }

    public left(): void {
        if (this.f === Facing.North) {
            this.f = Facing.West;
            return;
        }
        this.f -= 1;
        return;
    }


    // public right() { }
    // public move() { }
    // public report() { }
}

// let f:Facing = Facing.North;
// let n:Facing = f+1

// console.log(Facing[n])