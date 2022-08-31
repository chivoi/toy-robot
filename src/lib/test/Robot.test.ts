import { Robot, Facing } from "../robot/Robot";

describe("Robot", () => {
  describe("commands", () => {
    describe("place", () => {
      it("creates a placed robot", () => {
        const robot = Robot.place(1, 1, Facing.South);

        expect(robot.position).toEqual({ x: 1, y: 1, z: 0 });
        expect(robot.f).toBe(Facing.South);
      });
    });
  });

  describe("left", () => {
    it("rotates the robot counter-clockwise", () => {
      const robot = Robot.place(0, 0, Facing.East);

      robot.left();

      expect(robot.f).toBe(Facing.North);

      robot.left();

      expect(robot.f).toBe(Facing.West);

      robot.left();

      expect(robot.f).toBe(Facing.South);

      robot.left();

      expect(robot.f).toBe(Facing.East);
    });
  });

  describe("right", () => {
    it("rotates the robot clockwise", () => {
      const robot = Robot.place(0, 0, Facing.South);

      robot.right();

      expect(robot.f).toBe(Facing.West);

      robot.right();

      expect(robot.f).toBe(Facing.North);

      robot.right();

      expect(robot.f).toBe(Facing.East);

      robot.right();

      expect(robot.f).toBe(Facing.South);
    });
  });

  describe("move", () => {
    it("when the robot is facing west it moves west", () => {
      const robot = Robot.place(3, 3, Facing.West);

      robot.move();

      expect(robot.position).toEqual({ x: 2, y: 3, z: 0 });
    });

    it("when the robot is facing south it moves south", () => {
      const robot = Robot.place(3, 3, Facing.South);

      robot.move();

      expect(robot.position).toEqual({ x: 3, y: 2, z: 0 });
    });

    it("when the robot is facing north it moves north", () => {
      const robot = Robot.place(3, 3, Facing.North);

      robot.move();

      expect(robot.position).toEqual({ x: 3, y: 4, z: 0 });
    });

    it("when the robot is facing east it moves east", () => {
      const robot = Robot.place(3, 3, Facing.East);

      robot.move();

      expect(robot.position).toEqual({ x: 4, y: 3, z: 0 });
    });
  });

  describe("report", () => {
    it("returns a human readable report of the robot's state", () => {
      const robot = Robot.place(0, 0, Facing.South);
      expect(robot.reportString()).toEqual("X: 0, Y: 0, Z: 0, FACING: South, ROTOR: Off");
    });
  });

  describe("reportData", () => {
    it("returns a machine readable report of the robot's state", () => {
      const robot = Robot.place(0, 0, Facing.South);
      expect(robot.reportData()).toEqual({ x: 0, y: 0, z: 0, f: Facing.South, rotorOn: false });
    })
  })
});
