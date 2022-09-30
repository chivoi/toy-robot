import _ from 'lodash';
import { Icon } from '@iconify/react'
import React from 'react'
import { Facing, Robot } from "../lib/robot/Robot"
import { JsxElement } from 'typescript';

type GridProps = {
    boardSize: number
    x: number
    y: number
    f: Facing
    obstacles: number[][]
    robot: any
}

export const Grid = (props: GridProps) => {
    const { x, y, f, boardSize, obstacles, robot } = props

    const generateGrid = () => {
        const grid = new Array(boardSize)
        for (let i = 0; i < boardSize; i++) {
            const row = new Array(boardSize).fill(false)
            grid[i] = row
        }

        grid[x][boardSize - 1 - y] = true

        return grid
    }

    const robotFacingStyle = () => {
        const rotationDegrees = 90 * f + 180

        return {
            transform: `rotate(${rotationDegrees}deg)`
        }
    }

    const numObstaclesPresent = (obstacles: number[][], x: number, y: number): number => {
        const xOnTheBoard = x;
        const yOnTheBoard = boardSize - 1 - y;
        return obstacles[xOnTheBoard][yOnTheBoard]
    }

    const generateObstaclesPerCell = (i: number, j: number, obstacles: number[][]): string[] => {
        const numObstacles = numObstaclesPresent(obstacles, i, j);
        return new Array(numObstacles).fill(<Icon icon="fa6-solid:mountain" color="#231709" />)
    }

    const generateRobot = (rotorOn: boolean) => {
        return rotorOn ? <Icon icon="gis:drone" inline={true} /> : <Icon icon="vscode-icons:file-type-robots" inline={true} />
    }

    return (
        <>
            <div className="grid">
                {
                    generateGrid().map((row, i) => {
                        return (
                            <div key={`row${i}`}>
                                {
                                    row.map((isRobotPresent: boolean, j: number) => {
                                        const key = `cell${i * j + j}`

                                        return (
                                            <span key={key} className='cell' style={isRobotPresent ? robotFacingStyle() : {}}>
                                                <>
                                                    {
                                                        isRobotPresent ? generateRobot(robot.rotorOn) : ""
                                                    }
                                                    {generateObstaclesPerCell(i, j, obstacles)}
                                                </>
                                            </span>

                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
