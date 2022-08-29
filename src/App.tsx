import _ from 'lodash';
import { Icon } from '@iconify/react';

import React, { useState } from 'react';
import { InputDirections } from './components/InputDirections';
import { Grid } from './components/Grid';
import ErrorAlert from './components/ErrorAlert';
import { RobotSession, RobotCoordinates } from './lib/robot/RobotSession';

const BoardSize = 5

function App(): JSX.Element {
  const [command, setCommand] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [session] = useState(new RobotSession(BoardSize))
  const [robot, setRobot] = useState<RobotCoordinates>(session.current())

  const handleCommandInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredCommand = event.target.value;
    setCommand(enteredCommand.toLowerCase());
  }

  const executeCommand = (command: string): void | string => {
    // cleaning error so that it disappears from the page with the new command
    setError(null);

    try {
      session.do(command)
      setRobot(session.current())
    } catch (error: any) {
      setError(error);
    }
  }

  const executeBack = () => {
    setError(null);

    try {
      session.back()
      setRobot(session.current())
      console.log(session)
    } catch (error: any) {
      setError(error);
    }
  }

  const handleClick = (): void => {
    executeCommand(command)
  }

  return (
    <div className="App">
      {error && ErrorAlert(error.message)}
      <h1 style={{ color: "#C54D45" }}>Move me <Icon icon="mdi:robot-happy" inline={true} /></h1>

      <Grid boardSize={BoardSize} x={robot.x} y={robot.y} f={robot.f} />

      <input
        value={command}
        onChange={handleCommandInput}
        placeholder="place 0 0 north"
        className="input"
      />

      <button onClick={handleClick}>Execute!</button>
      <button onClick={executeBack}>Back!</button>

      <InputDirections />
    </div>
  );
}

export default App;

// TODOs:

// robot is not on the grid on the initial render and appears there only after user places it

// re-place or reset robot

// errors: if not yet placed, can not right, left or move

// front end

