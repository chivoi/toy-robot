
import React from 'react'

export const InputDirections = () => {
    return (
        <div className='commandContainer'>
            <h3>Available commands:</h3>
            <ul style={{ listStyle: "none", width: "50%", textAlign: "left" }}>
                <li><i><b>PLACE x y Facing</b></i> - places the robot on the board</li>
                <li><i><b>LEFT</b></i> - totates the robot 90 degrees left</li>
                <li><i><b>RIGHT</b></i> - totates the robot 90 degrees right</li>
                <li><i><b>MOVE</b></i> - move robot 1 tile towards where it's facing</li>
            </ul>
        </div>
    );
};
