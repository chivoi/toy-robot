import { Facing } from "../robot/Robot";
import _ from 'lodash';

export interface RobotCoordinates {
    x: number
    y: number
    f: Facing
}

//@TODO: I need a test for this.
export const serializePlaceCommand = (command: string): RobotCoordinates => {
    const coordinates: Array<string> = command.split(" ").splice(1).map(coord => coord.replace(/[\W_]+/g, ""))
    console.log(coordinates);
    const facing = Object.values(Facing).indexOf(_.capitalize(coordinates[2]));
    return { x: Number(coordinates[0]), y: Number(coordinates[1]), f: facing }
}
