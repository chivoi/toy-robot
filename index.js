"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = void 0;
const Robot_1 = require("./src/Robot");
const Robot_2 = require("./src/Robot");
let robot = new Robot_1.Robot(0, 0, Robot_2.Facing.North);
robot.left;
console.log(robot.f);
function sum(a, b) {
    return a + b;
}
exports.sum = sum;
