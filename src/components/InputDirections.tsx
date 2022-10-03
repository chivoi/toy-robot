
import React from 'react'

export const InputDirections = () => {
    return (
        <div className='commandContainer' style={{ color: "#231709" }}>
            <h3 style={{ textAlign: "left" }}>Available commands</h3>
            <h4 style={{ textAlign: "left" }}>CLASSIC 🥃</h4>
            <ul style={{ listStyle: "none", textAlign: "left" }}>
                <li><i><b>PLACE x y Facing</b></i> - places the robot on the board</li>
                <li><i><b>LEFT</b></i> - rotates the robot 90 degrees left</li>
                <li><i><b>RIGHT</b></i> - rotates the robot 90 degrees right</li>
                <li><i><b>MOVE</b></i> - move robot 1 tile towards where it's facing</li>
            </ul>
            <h4 style={{ textAlign: "left" }}>3D 🚀</h4>
            <ul style={{ listStyle: "none", textAlign: "left" }}>
                <li><i><b>ROTOR START</b></i> - spin up the rotor. You need it to fly! Must be done before any of the following commands can be performed.</li>
                <li><i><b>ROTOR STOP</b></i> - spin up the rotor. You can only do this on the ground, otherwise the robot will fall down and break.</li>
                <li><i><b>UP</b></i> - move up by one unit (max 4 units possible)</li>
                <li><i><b>DOWN</b></i> - move down by one unit</li>
                <li><i><b>OBSTACLE x y</b></i> - place an obstacle on the board. You can stack up to 4 obstacles in each cell.</li>
            </ul>

        </div>
    );
};
