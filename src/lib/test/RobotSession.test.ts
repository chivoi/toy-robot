import { Facing } from "../robot/Robot";
import { RobotSession } from "../robot/RobotSession";

describe("RobotSession", () => {
    describe("do", () => {
        it("issues commands to the robot", () => {
            const session = new RobotSession

            session.do("place 1 1 north")
            session.do("left")
            session.do("move")
            session.do("right")
            session.do("rotor start")
            session.do("up")

            expect(session.current()).toEqual(
                {
                    x: 0,
                    y: 1,
                    z: 1,
                    f: Facing.North,
                    rotorOn: true
                }
            )
        })

        describe("invalid commands", () => {

        })
    })

    describe("back", () => {
        it("moves back through the session history", () => {
            const session = new RobotSession

            session.do("place 1 1 north")
            session.do("left")
            session.do("move")
            session.do("right")
            session.do("rotor start")
            session.do("up")
            session.back()
            session.back()
            session.back()
            session.back()
            session.back()

            expect(session.current()).toEqual(
                {
                    x: 1,
                    y: 1,
                    z: 0,
                    f: Facing.North,
                    rotorOn: false
                }
            )
        })
    })

    describe("when rotor is turned off in midair", () => {
        it("causes robot to fall", () => {
            const session = new RobotSession

            session.do("place 1 1 north")
            session.do("rotor start")
            session.do("up")
            session.do("up")
            session.do("up")
            expect(session.current()).toEqual(
                {
                    x: 1,
                    y: 1,
                    z: 3,
                    f: Facing.North,
                    rotorOn: true
                }
            )

            session.do("rotor stop")
            expect(session.current()).toEqual(
                {
                    x: 1,
                    y: 1,
                    z: 0,
                    f: Facing.North,
                    rotorOn: false
                }
            )
        })
    })

    describe("obstacles", () => {
        it("creates them", () => {
            const session = new RobotSession

            session.do("obstacle 1 1 1")
            session.do("obstacle 0 0 0")
            session.do("obstacle 2 2 2")
            session.do("obstacle 3 3 3")

            expect(session.obstacles).toEqual(
                [
                    {"x": 1, "y": 1}, {"x": 0, "y": 0}, {"x": 2, "y": 2}, {"x": 3, "y": 3}
                ]
            )
        })
    })
})
