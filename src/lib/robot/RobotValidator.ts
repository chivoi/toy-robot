import _, { toLower } from 'lodash'
import { Validator, CommandType } from './RobotSession'
import { Facing } from './Robot'

export class RobotValidator implements Validator {
    bound: number

    constructor(bound: number) {
        this.bound = bound
    }

    validate = (command: string) => {
        const tokens = command.split(" ")

        this.validCommandType(tokens[0])
        this.validArguments(tokens[0], tokens.slice(1))
    }

    validCommandType = (commandType: string) => {
        if (Object.values(CommandType).includes(commandType.toUpperCase())) {
            return
        } else {
            throw new Error(`${commandType} is not a valid command type`)
        }
    }

    validArguments = (commandType: string, args: string[]) => {
        switch (commandType) {
            case "move":
            case "left":
            case "right":
            case "up":
            case "down":
                if (args.length > 0) {
                    throw new Error(`${commandType} does not take arguments`)
                }

                break;

            case "place":
                if (args.length !== 3) {
                    throw new Error(`place requires 3 arguments: x, y, facing`)
                }

                if (args[0] < '0' || args[0] > this.bound.toString()) {
                    throw new Error(`x must be a number between ${this.bound.toString()}`)
                }

                if (args[1] < '0' || args[1] > this.bound.toString()) {
                    throw new Error(`y must be a number between ${this.bound.toString()}`)
                }

                if (!this.facingWords().includes(args[2].toLowerCase())) {
                    throw new Error(`${args[2]} is not a valid facing`)
                }

                break;
            case "obstacle":
                if (args.length < 2 || args.length > 3) {
                    throw new Error(`obstacle requires at least 2 arguments: x, y`)
                }

                if (args[0] < '0' || args[0] > this.bound.toString()) {
                    throw new Error(`x must be a number between 0 and ${(this.bound - 1).toString()}`)
                }

                if (args[1] < '0' || args[1] > this.bound.toString()) {
                    throw new Error(`y must be a number between 0 and ${(this.bound - 1).toString()}`)
                }

                if (args[2] < '0' || args[2] > this.bound.toString()) {
                    throw new Error(`z must be a number between 0 and ${(this.bound - 1).toString()}`)
                }

                break;
            case "rotor":
                const validRotorArgs = ["start", "stop"]

                if (args.length !== 1 || !validRotorArgs.includes(args[0].toLowerCase())) {
                    throw new Error(`rotor start or rotor stop, you typed ${commandType} ${args}`)
                }

                break;
            default:
                break;
        }
    }

    private facingWords() {
        const entries = Object.entries(Facing)
        const validEntries: [string, string | Facing][] = entries.slice(0, Facing.__LENGTH)
        return validEntries.map(entry => entry[1] as string).map(toLower)
    }
}
