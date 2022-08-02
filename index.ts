import { Robot } from "./src/Robot";
import { Facing } from "./src/Robot";

let robot = new Robot(0, 0, Facing.North);

robot.left();
console.log(robot.f);


export function sum(a: number, b: number): number {
    return a + b;
}
