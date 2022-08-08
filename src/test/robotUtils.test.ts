import { facingDirection, isOnTheBoard } from "../utils/robotUtils";

describe("isOnTheBoard", () => {
  it("correctly detects when the coordinate is on the board", () => {
    expect(isOnTheBoard(2)).toEqual(true);
    expect(isOnTheBoard(0)).toEqual(true);
    expect(isOnTheBoard(4)).toEqual(true);
  });

  it("correctly detects when the coordinate is NOT on the board", () => {
    expect(isOnTheBoard(-1)).toEqual(false);
    expect(isOnTheBoard(-20)).toEqual(false);
    expect(isOnTheBoard(5)).toEqual(false);
    expect(isOnTheBoard(50)).toEqual(false);
  });
});

describe("facingDirection", () => {
  it("converts Facing enum to strings", () => {
    expect(facingDirection(0)).toEqual("North");
    expect(facingDirection(1)).toEqual("East");
    expect(facingDirection(2)).toEqual("South");
    expect(facingDirection(3)).toEqual("West");
  });

  it("throws error if Facing value is outside the enum", () => {
    expect(() => facingDirection(5)).toThrow(
      "Can not convert Facing to words, the value 5 is invalid!"
    );
    expect(() => facingDirection(-5)).toThrow(
      "Can not convert Facing to words, the value -5 is invalid!"
    );
  });
});
