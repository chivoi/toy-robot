import { Robot } from "../lib/robot/Robot"

type GridProps = {
    robot: Robot
}

export const Grid = (props: GridProps) => {
    const generateGrid = (robot: Robot, size: number = 5) => {
        const grid = new Array(size)
        for (let i = 0; i < size; i++) {
            const row = new Array(size).fill(false)
            grid[i] = row
        }

        grid[robot.x][size - 1 - robot.y] = true

        return grid
    }

    const robotFacingStyle = (robot: Robot) => {
        const rotationDegrees = 90 * robot.f + 180

        return {
            transform: `rotate(${rotationDegrees}deg)`
        }
    }

    return (
        <>
            <div className="grid">
                {
                    generateGrid(props.robot).map((row, i) => {
                        return (
                            <div key={`row${i}`}>
                                {
                                    row.map((isRobotPresent: boolean, j: number) => {
                                        const key = `cell${i * j + j}`

                                        return (
                                            <span key={key} className='cell' style={isRobotPresent ? robotFacingStyle(props.robot) : {}}>
                                                {
                                                    isRobotPresent ? "⬇️" : ""
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
            <p>
                Report: {props.robot.report()}
            </p>
        </>
    )
}