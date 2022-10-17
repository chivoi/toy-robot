import { Robot, Facing } from './Robot'
import _ from 'lodash'

export enum CommandType {
    PLACE, MOVE, LEFT, RIGHT, OBSTACLE, ROTOR, UP, DOWN
}

export type ObstaclePosition = {
    x: number
    y: number
}

type Command = {
    type: CommandType
    x?: number
    y?: number
    f?: Facing
    rotorOn?: boolean
}

export type RobotCoordinates = {
    x: number
    y: number
    f: Facing
}

export interface Validator {
    validate: (command: string) => void
}

export class RobotSession {
    boardSize: number
    history: [Robot]
    obstacles: number[][]
    validator: Validator

    /**
     *  A RobotSession represents a toy robot and a history of commands
     */
    constructor(boardSize: number = 5, validator: Validator) {
        this.boardSize = boardSize
        this.history = [Robot.place(0, 0, Facing.North)]
        this.obstacles = new Array(boardSize).fill([]).map(ary => ary = new Array(boardSize).fill(0))

        this.validator = validator
    }

    do = (something: string) => {
        if (this.current().damaged) {
            throw new Error("🤕 Robot crashed, can not execute commands 🤕")
        }
        this.validator.validate(something)

        const command = this.parseCommand(something)
        this.runCommand(command)
    }

    back = () => {
        if (this.history.length <= 1) {
            throw new Error("No earlier history")
        }

        this.history.pop()
    }

    current = () => this.history[this.history.length - 1].reportData()

    private parseCommand = (cmd: string): Command => {
        const tokens = cmd.trim().split(" ")

        switch (tokens[0]) {
            case "left":
                return { type: CommandType.LEFT }
            case "right":
                return { type: CommandType.RIGHT }
            case "move":
                return { type: CommandType.MOVE }
            case "place":
                const { x, y, f } = this.serializePlaceCommand(cmd)
                return { type: CommandType.PLACE, x, y, f }
            case "rotor":
                const rotorOn = this.serializeRotorCommand(cmd) === "start"
                return { type: CommandType.ROTOR, rotorOn }
            case "obstacle":
                const obstaclePosition = this.parseObstacleCommand(cmd)
                return { type: CommandType.OBSTACLE, ...obstaclePosition }
            case "up":
                return { type: CommandType.UP }
            case "down":
                return { type: CommandType.DOWN }

            default:
                throw new Error("unknown command");
        }
    }

    private runCommand = (cmd: Command) => {
        switch (cmd.type) {
            case CommandType.PLACE:
                if ([cmd.x, cmd.y, cmd.f].every(val => val !== null)) {
                    this.place(cmd.x!, cmd.y!, cmd.f!)
                }
                break;
            case CommandType.MOVE:
                this.move()
                break;
            case CommandType.LEFT:
                this.left()
                break;
            case CommandType.RIGHT:
                this.right()
                break;
            case CommandType.UP:
                this.up()
                break;
            case CommandType.DOWN:
                this.down()
                break;
            case CommandType.ROTOR:
                if (cmd.rotorOn) {
                    this.rotor("start");
                } else {
                    this.rotor("stop");
                }
                break;
            case CommandType.OBSTACLE:
                if (cmd.x === undefined || cmd.y === undefined) {
                    throw new Error("x and y can't be undefined");
                }

                if (this.obstacles[cmd.x][cmd.y] === 4) {
                    throw new Error("Can not place more than 4 obstacles in one cell")
                }

                const { x, y, f } = this.current();
                const nextRobot: Robot = Robot.place(x, y, f);

                if ((cmd.x === nextRobot.position.x)
                    && (cmd.y === nextRobot.position.y)) {
                    throw new Error("Can not place an obstacle: there is a robot in this cell")
                }

                this.obstacles[cmd.x][cmd.y] = this.obstacles[cmd.x][cmd.y] + 1
                break;

            default:
                throw new Error("unknown command")
        }
    }

    private place = (x: number, y: number, f: Facing) => {
        const nextRobot = Robot.place(x, y, f)
        if (this.obstacles[nextRobot.position.x][nextRobot.position.y]) {
            throw new Error("Can not place: there is an obstacle in this cell")
        }

        this.history.push(nextRobot)
    }

    private left = () => {
        const nextRobot = this.history[this.history.length - 1].left()
        this.history.push(nextRobot)
    }

    private right = () => {
        const nextRobot = this.history[this.history.length - 1].right()
        this.history.push(nextRobot)
    }

    private rotor = (state: string) => {
        const { x, y, f } = this.current();
        let nextRobot: Robot = Robot.place(x, y, f);

        if (state === "start") {
            nextRobot = this.history[this.history.length - 1].rotorStart();
        } else if (state === "stop") {
            nextRobot = this.history[this.history.length - 1].rotorStop();
            if (this.obstacles[nextRobot.position.x][nextRobot.position.y]) {
                nextRobot.damaged = true;
            } else {
                nextRobot.position.z = 0
            }
        }

        this.history.push(nextRobot)
    }

    private move = () => {
        const nextRobot = this.history[this.history.length - 1].move()

        if (!this.isOnTheBoard(nextRobot.position.x) || !this.isOnTheBoard(nextRobot.position.y)) {
            throw new Error("💀 Can not move off the board 💀")
        }

        if (this.obstacles[nextRobot.position.x][nextRobot.position.y] && !nextRobot.rotorOn) {
            throw new Error("Start the rotor to fly obstacles")
        }

        if (this.obstacles[nextRobot.position.x][nextRobot.position.y]
            && (nextRobot.position.z < (this.obstacles[nextRobot.position.x][nextRobot.position.y]))) {
            throw new Error("Go up to fly above this obstacle or go around")
        }

        this.history.push(nextRobot)
    }

    private up = () => {
        const nextRobot = this.history[this.history.length - 1].up()

        if (!this.isOnTheBoard(nextRobot.position.z)) {
            throw new Error("💀 Too high, out of control range 💀")
        }

        this.history.push(nextRobot)
    }

    private down = () => {
        const nextRobot = this.history[this.history.length - 1].down()

        if (!this.isOnTheBoard(nextRobot.position.z)) {
            throw new Error("💀 Cannot dig under ground 💀")
        }

        this.history.push(nextRobot)
    }


    private serializePlaceCommand = (command: string): RobotCoordinates => {
        const coordinates: Array<string> = command.split(" ").splice(1).map(coord => coord.replace(/[\W_]+/g, ""))
        const facing = Object.values(Facing).indexOf(_.capitalize(coordinates[2]));
        return { x: Number(coordinates[0]), y: Number(coordinates[1]), f: facing }
    }

    private serializeRotorCommand = (command: string): string => {
        const rotorState = command.split(" ")[1];
        return rotorState;
    }

    private parseObstacleCommand = (command: string): ObstaclePosition => {
        const tokens = command.split(" ")

        return {
            x: Number(tokens[1]),
            y: Number(tokens[2])
        }
    }

    private isOnTheBoard = (num: number): boolean => {
        return num >= 0 && num <= (this.boardSize - 1);
    }
}
