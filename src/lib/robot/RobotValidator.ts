import _ from 'lodash'
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

                // TODO: figure out a better way
                if (!Object.keys(Facing)
                        .map(f => f.toLowerCase())
                        .includes(args[2].toLowerCase())) {
                    throw new Error(`${args[2]} is not a valid facing`)
                }

                break;
            case "obstacle":
                if (args.length !== 3) {
                    throw new Error(`obstacle requires 3 arguments: x, y, z`)
                }

                if (args[0] < '0' || args[0] > this.bound.toString()) {
                    throw new Error(`x must be a number between ${this.bound.toString()}`)
                }

                if (args[1] < '0' || args[1] > this.bound.toString()) {
                    throw new Error(`y must be a number between ${this.bound.toString()}`)
                }

                if (args[2] < '0' || args[2] > this.bound.toString()) {
                    throw new Error(`z must be a number between ${this.bound.toString()}`)
                }

                break;
            case "rotor":

                break;

            default:
                break;
        }
    }
}

// placce 1 1 north
