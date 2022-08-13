import { isOnTheBoard } from "../utils/robotUtils";

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
    if (!isOnTheBoard(x) || !isOnTheBoard(y)) {
      throw new Error(`invalid ${!isOnTheBoard(x) ? "x" : "y"}`);
    }
    return new Robot(x, y, f);
  }

  constructor(x: number, y: number, f: Facing) {
    this.x = x;
    this.y = y;
    this.f = f;
  }

  left(): void {
    if (this.f === 0) {
      this.f = Facing.__LENGTH - 1;
      return;
    }

    this.f -= 1;
  }

  // Do we want to "re-place"
  // place() {}

  right(): void {
    if (this.f === Facing.__LENGTH - 1) {
      this.f = 0;
      return;
    }

    this.f += 1;
  }

  move(): void {
    // @TODO: Do we want to throw an error when the robot wants
    // to move in a bad direction? I would.

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
  }

  report(): string {
    const facingDirections = Object.values(Facing)
    return `${this.x}, ${this.y}, ${facingDirections[this.f]}`;
  }
}
