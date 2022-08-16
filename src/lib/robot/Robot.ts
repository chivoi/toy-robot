import { isOnTheBoard } from "../utils/robotUtils";

export const BOARDSIZE = 5;

export enum Facing {
  North,
  East,
  South,
  West,
  __LENGTH,
}

export class Robot {
  x: number;
  y: number;
  f: Facing;

  static place(x: number, y: number, f: Facing) {
    if (!Object.values(Facing).includes(f) || f === 4) {
      throw new Error("invalid facing");
    }
    if (!isOnTheBoard(x, BOARDSIZE) || !isOnTheBoard(y, BOARDSIZE)) {
      throw new Error(`invalid ${!isOnTheBoard(x, BOARDSIZE) ? "x" : "y"}`);
    }
    return new Robot(x, y, f);
  }

  constructor(x: number, y: number, f: Facing) {
    this.x = x;
    this.y = y;
    this.f = f;
  }

  left(): Robot {
    if (this.f === 0) {
      this.f = Facing.__LENGTH - 1;
    } else {
      this.f -= 1;
    };
    return new Robot(this.x, this.y, this.f);
  }

  right(): Robot {
    if (this.f === Facing.__LENGTH - 1) {
      this.f = 0;
    } else {
      this.f += 1;
    }
    return new Robot(this.x, this.y, this.f);
  }

  move(): Robot {
    switch (this.f) {
      case Facing.West:
        if (this.x > 0) this.x -= 1;
        break;
      case Facing.South:
        if (this.y > 0) this.y -= 1;
        break;
      case Facing.North:
        if (this.y < 4) this.y += 1;
        break;
      case Facing.East:
        if (this.x < 4) this.x += 1;
        break;
      default:
        break;
    }

    if (!isOnTheBoard(this.x, 5) || !isOnTheBoard(this.y, 5)) {
      console.log("I'm in the library - error")
      throw new Error("The Robot can not move off the board!")
    }

    return new Robot(this.x, this.y, this.f);
  }

  report(): string {
    const facingDirections = Object.values(Facing)
    return `${this.x}, ${this.y}, ${facingDirections[this.f]}`;
  }
}
