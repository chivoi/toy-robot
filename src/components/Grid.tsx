import { Icon } from '@iconify/react'
import React from 'react'
import { Facing, Robot } from "../lib/robot/Robot"

type GridProps = {
    boardSize: number
    x: number
    y: number
    f: Facing
}

export const Grid = (props: GridProps) => {
    const { x, y, f, boardSize } = props

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
