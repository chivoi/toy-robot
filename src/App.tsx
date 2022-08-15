import React, { useState } from 'react';
import { Facing, Robot } from './lib/robot/Robot'
import { InputDirections } from './components/InputDirections';
import { serializePlaceCommand } from './lib/utils/helpers';


type GridProps = {
  robot: Robot
}

const Grid = (props: GridProps) => {
  const generateGrid = (robot: Robot, size: number = 5) => {
    const grid = new Array(size)
    for (let i = 0; i < size; i++) {
      const row = new Array(size).fill(false)
      grid[i] = row
    }

    grid[robot.x][size - 1 - robot.y]= true

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

                    return(
                      <span key={key} className='cell' style={ isRobotPresent ? robotFacingStyle(props.robot) : {}}>
                        {
                          isRobotPresent ? "🤖" : ""
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
        Report: { props.robot.report() }
      </p>
    </>
  )
}

function App(): JSX.Element {
  const [robotPosition, setRobotPosition] = useState({ x: -1, y: -1, f: -1 })
  const [robot] = useState(Robot.place(1, 1, Facing.North))
  const [command, setCommand] = useState('');


  const handleCommandInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredCommand = event.target.value;
    setCommand(enteredCommand.toLowerCase());
  }

  const executeCommand = (command: string): void | string => {
    if (command.includes("place")) {
      setRobotPosition(serializePlaceCommand(command))
      return
    }
    // @TODO: robot has front end, so position will be visible.
    // Do we need REPORT command at all?
    // if (command.includes("report")) {
    //   return robot.report();
    // }
    switch (command) {
      case "left":
        robot.left()
        break;
      case "right":
        robot.right()
        break;
      case "move":
        robot.move()
        break;
      default:
        break;
    }
    setRobotPosition({ x: robot.x, y: robot.y, f: robot.f })
  }

  const handleClick = (): void => {
    executeCommand(command)
  }

  return (
    <div className="App">
      <Grid robot={robot}/>

      <input
          value={command}
          onChange={handleCommandInput}
          placeholder="PLACE 0 0 NORTH"
          className="input"
        />

        <button onClick={handleClick}>Execute!</button>

        <InputDirections />
    </div>
  );
}

export default App;

// TODOs:
// Make it into React style, so that robot state is managed in the app

// render the robot on a grid (visually)

// ✅ allow user to send commands to robot

// We need errors when the robot is about to fall off the board.

