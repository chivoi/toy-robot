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
    let newFacing: number
    if (this.f === 0) {
      newFacing = Facing.__LENGTH - 1;
    } else {
      newFacing = this.f - 1;
    };
    return new Robot(this.position, newFacing, this.rotorOn);
  }

  right(): Robot {
    let newFacing: number
    if (this.f === Facing.__LENGTH - 1) {
      newFacing = 0;
    } else {
      newFacing = this.f + 1;
    }
    return new Robot(this.position, newFacing, this.rotorOn);
  }

  move(): Robot {
    const newPosition = { x: this.position.x, y: this.position.y, z: this.position.z }

    switch (this.f) {
      case Facing.West:
        newPosition.x -= 1;
        break;
      case Facing.South:
        newPosition.y -= 1;
        break;
      case Facing.North:
        newPosition.y += 1;
        break;
      case Facing.East:
        newPosition.x += 1;
        break;
      default:
        break;
    }

    return new Robot(newPosition, this.f, this.rotorOn);
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
    const rotorString = this.rotorOn ? "On": "Off"
    return `X: ${this.position.x}, Y: ${this.position.y}, Z: ${this.position.z}, FACING: ${facingDirections[this.f]}, ROTOR: ${rotorString}`;
  }
}
