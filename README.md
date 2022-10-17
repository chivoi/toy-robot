# TS/React Toy Robot

✨🤖 https://little-toy-robot.netlify.app/ 🤖✨

A TypeScript/React solution to the toy robot challenge.

![Screen Shot 2022-09-16 at 2 44 20 pm](https://user-images.githubusercontent.com/10946872/190558447-c1776b4a-1326-4253-a318-0667c16156dd.png)


## How to use

Type the command into the input fiels and see the Robot execute it!

### Available commands

#### 🥃 Classic challenge:

- _PLACE x y Facing_ - places the robot on the board at the coordinates you set
- _LEFT_ - rotates the robot 90 degrees left
- _RIGHT_ - rotates the robot 90 degrees right
- _MOVE_ - move robot 1 tile towards where it's facing

The _REPORT_ of where the Robot is permanently available underneath the board.

#### 🚀 3D Expansion:

- _OBSTACLE x y_ - places an obstacle on the board. Up to 4 obstacles can be stacked in each cell
- _ROTOR START_ - spins up the rotor
- _ROTOR STOP_ - stops the rotor
- _UP_ - move up by one unit (max 4 units possible)
- _DOWN_ - move down by one unit

**Limitations and other features**

- Robot **can not move off the board**, or outside of the control range (4 units up) when airborn.
- `ROTOR START` command is needed for any airborne activities.
- If Rotor is stopped when the robot is above an obstacle, **the robot will fall down and crash** and won't be able to take any more commands.
- `Back` button rewinds the robot to the previous state in history.


## Run, Build

To run the app locally: `npm start`
To build: `npm build`

## Test

Unit tests are available with Jest.
To run them, run `npm test`.

<hr />
Made with 🤖 by [Ana Lastoviria](https://github.com/chivoi) and [Andy Sims](https://github.com/andrewcameronsims).