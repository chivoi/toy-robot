"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = exports.Facing = void 0;
var Facing;
(function (Facing) {
    Facing[Facing["North"] = 0] = "North";
    Facing[Facing["East"] = 1] = "East";
    Facing[Facing["South"] = 2] = "South";
    Facing[Facing["West"] = 3] = "West";
})(Facing = exports.Facing || (exports.Facing = {}));
class Robot {
    constructor(x, y, f) {
        this.x = x;
        this.y = y;
        this.f = f;
    }
    left() {
        if (this.f === 1) {
            this.f = 4;
        }
        this.f -= 1;
    }
}
exports.Robot = Robot;
// let f:Facing = Facing.North;
// let n:Facing = f+1
// console.log(Facing[n])
