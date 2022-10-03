import { Facing, Robot } from "../robot/Robot";
import { RobotSession } from "../robot/RobotSession";
import { RobotValidator } from "../robot/RobotValidator";

describe("RobotSession", () => {
    const validator = new RobotValidator(5)

    describe("do", () => {
        it("issues commands to the robot", () => {
            const session = new RobotSession(5, validator)

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
            describe("place with invalid placing", () => {
                it("throws an error if the facing is invalid (unknown)", () => {
                    const session = new RobotSession(5, validator)
                    expect(() => session.do("place lkjdghkjdfgh")).toThrowError()
                })

                it("throws an error if the facing is invalid (__length)", () => {
                    const session = new RobotSession(5, validator)
                    expect(() => session.do("place 2 3 __length")).toThrowError()
                })

                it("throws an error if the facing is invalid (number)", () => {
                    const session = new RobotSession(5, validator)
                    expect(() => session.do("place 2 3 2")).toThrowError()
                })
            })
        })
    })

    describe("back", () => {
        it("moves back through the session history", () => {
            const session = new RobotSession(5, validator)

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
            const session = new RobotSession(5, validator)

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

        describe("invalid rotor commands", () => {
            it("throws an error when wrong length", () => {
                const session = new RobotSession(5, validator)

                expect(() => session.do("rotor start NOW!")).toThrowError()
            })

            it("throws an error when unrecognised argument", () => {
                const session = new RobotSession(5, validator)

                expect(() => session.do("rotor stay")).toThrowError()
            })
        })
    })

    describe("obstacles", () => {
        it("creates them", () => {
            const session = new RobotSession(5, validator)

            session.do("obstacle 1 1")
            session.do("obstacle 0 0")
            session.do("obstacle 2 2")
            session.do("obstacle 3 3")

            expect(session.obstacles).toEqual(
                [
                    [1, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0]
                ]
            )
        })

        describe("invalid obstacles", () => {
            it("raises an error when not enough arguments", () => {
                const session = new RobotSession(5, validator)

                expect(() => session.do("obstacle 1")).toThrowError()
            })

            it("raises an error when out of bounds", () => {
                const session = new RobotSession(5, validator)

                expect(() => session.do("obstacle 6 6")).toThrowError()
            })

            it("raises an error when not a number", () => {
                const session = new RobotSession(5, validator)

                expect(() => session.do("obstacle b 1")).toThrowError()
                expect(() => session.do("obstacle 1 b")).toThrowError()
            })
        })
    })
})
