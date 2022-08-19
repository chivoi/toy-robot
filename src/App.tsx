import React, { useState } from 'react';
import { Facing, Robot } from './lib/robot/Robot'
import { InputDirections } from './components/InputDirections';
import { serializePlaceCommand } from './lib/utils/helpers';
import { Grid } from './components/Grid';

function App(): JSX.Element {
  const [robot, setRobot] = useState<Robot>(Robot.place(1, 1, Facing.North))
  const [command, setCommand] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);


  const handleCommandInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredCommand = event.target.value;
    setCommand(enteredCommand.toLowerCase());
  }

  const executeCommand = (command: string): void | string => {
    setError(null);
    const { x, y, f } = serializePlaceCommand(command)
    if (command.includes("place")) {
      setRobot(Robot.place(x, y, f))
      return
    }
    try {
      switch (command) {
        case "left":
          setRobot(robot.left())
          break;
        case "right":
          setRobot(robot.right())
          break;
        case "move":
          setRobot(robot.move())
          break;
        default:
          break;
      }
    } catch (error: any) {
      setError(error);
    }
  }

  const handleClick = (): void => {
    executeCommand(command)
  }

  return (
    <div className="App">
      {error && <p style={{ color: 'red' }}>{error.message}</p>}

      <Grid robot={robot} />

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

// We need errors when the robot is about to fall off the board.

// robot is not on the grid on the initial render and appears there only after user places it

// re-place or reset robot

// front end

