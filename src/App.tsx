import _, { size } from 'lodash';
import { Icon } from '@iconify/react';

import React, { useState } from 'react';
import { InputDirections } from './components/InputDirections';
import { Grid } from './components/Grid';
import ErrorAlert from './components/ErrorAlert';
import { RobotSession, RobotCoordinates } from './lib/robot/RobotSession';
import { Facing, Robot } from './lib/robot/Robot';
import { RobotValidator } from './lib/robot/RobotValidator';

const BoardSize = 5
const validator = new RobotValidator(BoardSize)

function App(): JSX.Element {

  const [command, setCommand] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [session] = useState(new RobotSession(BoardSize, validator))
  const [robot, setRobot] = useState(session.current())

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
    } catch (error: any) {
      setError(error);
    }
  }

  const handleClick = (): void => {
    executeCommand(command)
  }

  return (
    <>
      <div className="App">
        {error && ErrorAlert(error.message)}
        <h1 style={{ color: "#DD715B" }}>M<Icon icon="mdi:robot-happy" inline={true} style={{ color: "#C54D45" }} />ve me</h1>
        <div className="GridRulesContainer">
          <div className="GridInputButtonsContainer">
            <Grid boardSize={BoardSize} x={robot.x} y={robot.y} f={robot.f} obstacles={session.obstacles} robot={session.current()} />

            <input
              value={command}
              onChange={handleCommandInput}
              placeholder="place 0 0 north"
              className="input"
            />

            <p><b>Report:</b> {robot.x}, {robot.y}, {robot.z} {Facing[robot.f]}, rotor {robot.rotorOn ? "on" : "off"}</p>

            <button onClick={handleClick}>Execute!</button>
            <button onClick={executeBack}>Back!</button>
          </div>
          <InputDirections />
        </div>
      </div>
      <Icon icon="mdi:robot-happy" style={{ fontSize: '15em', color: 'white', opacity: '0.6', position: 'absolute', left: '0.1em', bottom: '0.0001em', zIndex: '-1' }} />
    </>
  );
}

export default App;
