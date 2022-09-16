import * as THREE from 'three'
import React, { useRef } from 'react'
import { Canvas, useFrame, ThreeElements, useLoader } from '@react-three/fiber'
import { Facing } from '../../lib/robot/Robot'

const Robot = (props: ThreeElements['mesh']) => {
    const mesh = useRef<THREE.Mesh>(null!)

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={1}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}

const Grid = () => (
    <mesh position={[0, 0, 0]}>
        <gridHelper args={[4.5, 5]} />
    </mesh>
)

type RobotSceneProps = {
    robot: {
        x: number
        y: number
        z: number
        f: Facing
    }
}

const RobotScene = (props: RobotSceneProps) => {
    const { robot } = props

    return (
        <div style={{ width: "50vw", height: "80vh" }}>
            <Canvas camera={{ fov: 75, near: 0.1, far: 200, position: [4, 3, 4] }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Robot position={[robot.x, robot.z, robot.y]} />
                <Grid />
            </Canvas>
        </div>
    )
}

export default RobotScene
