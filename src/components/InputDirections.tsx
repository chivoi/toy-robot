import React from 'react'

export const InputDirections = () => {
    return (
        <>
            <p>Available commands:</p>
            <ul style={{ listStyle: "none", textAlign: "left" }}>
                <li><i>PLACE x y Facing</i> - places the robot on the board</li>
                <li><i>LEFT</i> - totates the robot 90 degrees left</li>
                <li><i>RIGHT</i> - totates the robot 90 degrees right</li>
                <li><i>MOVE</i> - move robot 1 tile towards where it's facing</li>
                <li><i>REPORT</i> - report robot's position and facing direction</li>
            </ul>
        </>
    );
};
