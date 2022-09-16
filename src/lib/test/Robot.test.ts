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

  describe("rotorStart", () => {
    it("when rotorOn is false it is set to true", () => {
      const robot = new Robot({ x: 0, y: 0, z: 0 }, Facing.East, false).rotorStart()

      expect(robot.rotorOn).toBe(true)
    })

    it("when rotorOn is true it stays true", () => {
      const robot = new Robot({ x: 0, y: 0, z: 0 }, Facing.East, true).rotorStart()

      expect(robot.rotorOn).toBe(true)
    })
  })

  describe("rotorStop", () => {
    it("when rotorOn is false it stays false", () => {
      const robot = new Robot({ x: 0, y: 0, z: 3 }, Facing.East, false).rotorStop()

      expect(robot.rotorOn).toBe(false)
    })

    it("when rotorOn is true it is set to false", () => {
      const robot = new Robot({ x: 0, y: 0, z: 3 }, Facing.East, true).rotorStop()

      expect(robot.rotorOn).toBe(false)
    })
  })

  describe("up", () => {
    it("increases the z-coordinate of the robot", () => {
      const robot = new Robot({ x: 0, y: 0, z: 3 }, Facing.East, true).up()

      expect(robot.position.z).toBe(4)
    })
  })

  describe("down", () => {
    it("decreases the z-coordinate of the robot", () => {
      const robot = new Robot({ x: 0, y: 0, z: 3 }, Facing.East, true).down()

      expect(robot.position.z).toBe(2)
    })
  })

  describe("left", () => {
    it("rotates the robot counter-clockwise", () => {
      let robot = Robot.place(0, 0, Facing.East);

      robot = robot.left();

      expect(robot.f).toBe(Facing.North);

      robot = robot.left();

      expect(robot.f).toBe(Facing.West);

      robot = robot.left();

      expect(robot.f).toBe(Facing.South);

      robot = robot.left();

      expect(robot.f).toBe(Facing.East);
    });
  });

  describe("right", () => {
    it("rotates the robot clockwise", () => {
      let robot = Robot.place(0, 0, Facing.South);

      robot = robot.right();

      expect(robot.f).toBe(Facing.West);

      robot = robot.right();

      expect(robot.f).toBe(Facing.North);

      robot = robot.right();

      expect(robot.f).toBe(Facing.East);

      robot = robot.right();

      expect(robot.f).toBe(Facing.South);
    });
  });

  describe("move", () => {
    it("when the robot is facing west it moves west", () => {
      let robot = Robot.place(3, 3, Facing.West);

      robot = robot.move();

      expect(robot.position).toEqual({ x: 2, y: 3, z: 0 });
    });

    it("when the robot is facing south it moves south", () => {
      let robot = Robot.place(3, 3, Facing.South);

      robot = robot.move();

      expect(robot.position).toEqual({ x: 3, y: 2, z: 0 });
    });

    it("when the robot is facing north it moves north", () => {
      let robot = Robot.place(3, 3, Facing.North);

      robot = robot.move();

      expect(robot.position).toEqual({ x: 3, y: 4, z: 0 });
    });

    it("when the robot is facing east it moves east", () => {
      let robot = Robot.place(3, 3, Facing.East);

      robot = robot.move();

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
