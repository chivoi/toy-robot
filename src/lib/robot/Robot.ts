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
    return new Robot(x, y, f)
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
    const future = { x: this.x, y: this.y };

    switch (this.f) {
      case Facing.West:
        future.x -= 1;
        break;
      case Facing.South:
        future.y -= 1;
        break;
      case Facing.North:
        future.y += 1;
        break;
      case Facing.East:
        future.x += 1;
        break;
      default:
        break;
    }

    return new Robot(future.x, future.y, this.f);
  }

  reportData() {
    return {
      x: this.x,
      y: this.y,
      f: this.f,
    }
  }

  reportString(): string {
    const facingDirections = Object.values(Facing)
    return `${this.x}, ${this.y}, ${facingDirections[this.f]}`;
  }
}
