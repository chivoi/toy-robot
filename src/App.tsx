import React, { useState } from 'react';
import { Facing, Robot } from './lib/robot/Robot'
import { InputDirections } from './components/InputDirections';
import { serialize } from 'v8';
import { serializePlaceCommand } from './lib/utils/helpers';

const Grid = () => {
  const gridStructure = Array(5).fill(0).map(row => Array(5).fill(0))

  return (
    <>
      {
        gridStructure
          .map((row, index) => {
            <div key={index}>
              {row.map((col, index) => <span key={`col${index}`}>{col} </span>)}
            </div>
          })
      }
    </>
  )
}

function App(): JSX.Element {
  let robot;
  const [robotPosition, setRobotPosition] = useState({ x: -1, y: -1, f: -1 })
  const [command, setCommand] = useState('');

  const handleCommandInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredCommand = event.target.value;
    setCommand(enteredCommand.toLowerCase());
  }

  const executeCommand = (command: string): void => {
    if (command.includes("place")) {
      setRobotPosition(serializePlaceCommand(command))
    }
  }

  const handleClick = (): void => {
    executeCommand(command)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Robot is at: {robotPosition.x}, {robotPosition.y}, {Facing[robotPosition.f]}</p>


        <Grid />

        <input
          value={command}
          onChange={handleCommandInput}
          placeholder="PLACE 0 0 NORTH"
          className="input"
        />

        <button onClick={handleClick}>Execute!</button>

        <InputDirections />

      </header>
    </div>
  );
}

export default App;

// TODOs:
// Make it into React style, so that robot state is managed in the app

// render the robot on a grid (visually)

// allow user to send commands to robot

