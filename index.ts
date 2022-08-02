import { Robot, Facing } from "./src/Robot";

let robot = Robot.place(0, 0, Facing.North);

robot.left();
console.log(robot.f);
