# TS/React Toy Robot

✨🤖 https://little-toy-robot.netlify.app/ 🤖✨

A TypeScript/React solution to the toy robot challenge.

<img width="1252" alt="Screen Shot 2022-10-17 at 12 23 03 pm" src="https://user-images.githubusercontent.com/10946872/196070617-91400047-b8c8-4962-9caa-c409b8dbcf9a.png">


## How to use

Type the command into the input fiels and see the Robot execute it!

### Available commands

#### 🥃 Classic challenge:

- `PLACE x y Facing` - places the robot on the board at the coordinates you set
- `LEFT` - rotates the robot 90 degrees left
- `RIGHT` - rotates the robot 90 degrees right
- `MOVE` - move robot 1 tile towards where it's facing

The `REPORT` of where the Robot is permanently available underneath the board.

#### 🚀 3D Expansion:

- `OBSTACLE x y` - places an obstacle on the board. Up to 4 obstacles can be stacked in each cell
- `ROTOR START` - spins up the rotor
- `ROTOR STOP` - stops the rotor
- `UP` - move up by one unit (max 4 units possible)
- `DOWN` - move down by one unit

**Limitations and other features**

- Robot **can not move off the board**, or outside of the control range (4 units up) when airborn.
- `ROTOR START` command is needed for any airborne activities.
- If Rotor is stopped when the robot is above an obstacle, **the robot will fall down and crash** and won't be able to take any more commands.
- `Back` button rewinds the robot to the previous state in history.


## Run locally

To run the app locally: 
- clone this repo
- install node modules: `npm install`
- start the app: `npm start`

## Test

Unit tests are available with Jest.
To run them, run `npm test`.

<hr />
Made with 🤖 by Ana Lastoviria and Andy Sims.
