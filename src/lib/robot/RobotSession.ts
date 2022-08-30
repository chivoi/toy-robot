import { Robot, Facing } from './Robot'
import _ from 'lodash'

enum CommandType {
    PLACE, MOVE, LEFT, RIGHT, OBSTACLE
}

type ObstaclePosition = {
    x: number
    y: number
}

type Command = {
    type: CommandType
    x?: number
    y?: number
    f?: Facing
}

export type RobotCoordinates = {
    x: number
    y: number
    f: Facing
}

export class RobotSession {
    boardSize: number
    history: [Robot]
    obstacles: ObstaclePosition[]

    /**
     *  A RobotSession represents a toy robot and a history of commands
     */
    constructor(boardSize: number = 5) {
        this.boardSize = boardSize
        this.history = [Robot.place(0, 0, Facing.North)]
        this.obstacles = new Array<ObstaclePosition>()
    }

    do = (something: string) => {
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
        const tokens = cmd.split(" ")

        switch (tokens[0]) {
            case "left":
                return { type: CommandType.LEFT }
            case "right":
                return { type: CommandType.RIGHT }
            case "move":
                return { type: CommandType.MOVE }
            case "place":
                // TODO: fix this
                const { x, y, f } = this.serializePlaceCommand(cmd)
                return { type: CommandType.PLACE, x, y, f }
            case "obstacle":
                const obstaclePosition = this.parseObstacleCommand(cmd)
                return { type: CommandType.OBSTACLE, ...obstaclePosition }
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

            case CommandType.OBSTACLE:
                if ([cmd.x, cmd.y].every(val => val !== null)) {
                    this.obstacles.push({ x: cmd.x!, y: cmd.y! })
                    break;
                }
                // throw an error if they're null

                throw new Error("x and y can't be null");
            default:
                throw new Error("unknown command")
        }
    }

    private place = (x: number, y: number, f: Facing) => {
        const nextRobot = Robot.place(x, y, f)

        if (f >= Facing.__LENGTH) {
            throw new Error("invalid facing");
        }
        if (!this.isOnTheBoard(x) || !this.isOnTheBoard(y)) {
            throw new Error(`invalid ${!this.isOnTheBoard(x) ? "x" : "y"}`);
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

    private move = () => {
        const nextRobot = this.history[this.history.length - 1].move()

        if (!this.isOnTheBoard(nextRobot.position.x) || !this.isOnTheBoard(nextRobot.position.y)) {
            throw new Error("💀 Can not move off the board 💀")
        }

        this.history.push(nextRobot)
    }

    private serializePlaceCommand = (command: string): RobotCoordinates => {
        const coordinates: Array<string> = command.split(" ").splice(1).map(coord => coord.replace(/[\W_]+/g, ""))
        const facing = Object.values(Facing).indexOf(_.capitalize(coordinates[2]));
        return { x: Number(coordinates[0]), y: Number(coordinates[1]), f: facing }
    }

    private parseObstacleCommand = (command: string): ObstaclePosition => {
        const tokens = command.split(" ")

        return {
            x: Number(tokens[1]),
            y: Number(tokens[2])
        }
    }

    private isOnTheBoard = (num: number): boolean  => {
        return num >= 0 && num <= (this.boardSize - 1);
    }
}
