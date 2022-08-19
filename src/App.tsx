import * as _ from 'lodash';

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
      try {
        setRobot(Robot.place(x, y, f))
      } catch (error: any) {
        error.message = `${_.capitalize(error.message)}: Enter valid robot position and facing, for example "3, 1, North" or "5 2 South"`
        setError(error);
      }
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
        placeholder="place 0 0 north"
        className="input"
      />

      <button onClick={handleClick}>Execute!</button>

      <InputDirections />
    </div>
  );
}

export default App;

// TODOs:

// robot is not on the grid on the initial render and appears there only after user places it

// re-place or reset robot

// front end

