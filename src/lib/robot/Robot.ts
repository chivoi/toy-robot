export enum Facing {
  North,
  East,
  South,
  West,
  __LENGTH,
}

type Position3D = {
  x: number
  y: number
  z: number
}

export class Robot {
  position: Position3D;
  f: Facing;
  rotorOn: boolean;

  static place(x: number, y: number, f: Facing) {
    return new Robot({x, y, z: 0}, f, false)
  }

  constructor(position: Position3D, f: Facing, rotorOn: boolean) {
    this.position = position
    this.f = f;
    this.rotorOn = rotorOn;
  }

  rotorStart(): Robot {
    return new Robot(this.position, this.f, true)
  }

  rotorStop(): Robot {
    return new Robot(this.position, this.f, false)
  }

  up(): Robot {
    const newPosition = {
      x: this.position.x,
      y: this.position.y,
      z: this.position.z + 1
    }

    return new Robot(newPosition, this.f, this.rotorOn)
  }

  down(): Robot {
    const newPosition = {
      x: this.position.x,
      y: this.position.y,
      z: this.position.z - 1
    }

    return new Robot(newPosition, this.f, this.rotorOn)
  }

  left(): Robot {
    if (this.f === 0) {
      this.f = Facing.__LENGTH - 1;
    } else {
      this.f -= 1;
    };
    return new Robot(this.position, this.f, this.rotorOn);
  }

  right(): Robot {
    if (this.f === Facing.__LENGTH - 1) {
      this.f = 0;
    } else {
      this.f += 1;
    }
    return new Robot(this.position, this.f, this.rotorOn);
  }

  move(): Robot {
    const future = this.position

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

    return new Robot(future, this.f, this.rotorOn);
  }

  reportData() {
    return {
      ...this.position,
      f: this.f,
      rotorOn: this.rotorOn
    }
  }

  reportString(): string {
    const facingDirections = Object.values(Facing)
    return `${this.position.x}, ${this.position.y}, ${facingDirections[this.f]}`;
  }
}
