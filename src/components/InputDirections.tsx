
import React from 'react'

export const InputDirections = () => {
    return (
        <div className='commandContainer'>
            <h3>Available commands:</h3>
            <ul style={{ listStyle: "none", width: "50%", textAlign: "left" }}>
                <li><i style={{ color: "#C54D45" }}>PLACE x y Facing</i> - places the robot on the board</li>
                <li><i style={{ color: "#C54D45" }}>LEFT</i> - totates the robot 90 degrees left</li>
                <li><i style={{ color: "#C54D45" }}>RIGHT</i> - totates the robot 90 degrees right</li>
                <li><i style={{ color: "#C54D45" }}>MOVE</i> - move robot 1 tile towards where it's facing</li>
            </ul>
        </div>
    );
};
