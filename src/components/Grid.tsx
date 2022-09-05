import { Icon } from '@iconify/react'
import React from 'react'
import { Facing, Robot } from "../lib/robot/Robot"
import { ObstaclePosition } from "../lib/robot/RobotSession"

type GridProps = {
    boardSize: number
    x: number
    y: number
    f: Facing
    obstacles: ObstaclePosition[]
}

export const Grid = (props: GridProps) => {
    const { x, y, f, boardSize, obstacles } = props

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

    // @TODO this places only one on the board. Need to re-render the board
    // every time the obstacle is placed like with robot
    const isObstaclePresent = (obstacles: ObstaclePosition[], x: number, y: number) => {
        const xOnTheBoard = boardSize - 3 - x
        const yOnTheBoard = boardSize - 1 - y
        return obstacles.find(obst => obst.x === xOnTheBoard && obst.y === yOnTheBoard);
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
                                                {
                                                    isRobotPresent ? <Icon icon="vscode-icons:file-type-robots" inline={true} /> : ""
                                                }
                                                {isObstaclePresent(obstacles, i, j) ? "⛰️" : ""}
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
