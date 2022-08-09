import React, { PropsWithRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { Facing, Robot } from './lib/Robot'

const Grid = () => {
  const gridStructure = Array(5).fill(0).map(row => Array(5).fill(0))

  return (
    <>
    {
      gridStructure
      .map((row, index) => {
        <div key={index}>
          { row.map((col, index) => <span key={`col${index}`}>{col} </span>) }
        </div>
      })
    }
    </>
  )
}

const Hello = () => {
  return <p>hello world</p>
}

function App() {
  const robot = Robot.place(0, 0, Facing.North)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Robot was placed on load of this page.
        </p>
  
  
        <Grid />
        <Hello />

        <p>
          Report: { robot.report() }
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// TODOs:
// Make it into React style, so that robot state is managed in the app

// render the robot on a grid (visually)

// allow user to send commands to robot

