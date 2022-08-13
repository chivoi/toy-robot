import { isOnTheBoard } from "../utils/robotUtils";

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
