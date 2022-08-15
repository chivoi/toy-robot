import { isOnTheBoard } from "../utils/robotUtils";

describe("isOnTheBoard", () => {
  it("correctly detects when the coordinate is on the board", () => {
    expect(isOnTheBoard(2, 5)).toEqual(true);
    expect(isOnTheBoard(0, 5)).toEqual(true);
    expect(isOnTheBoard(4, 5)).toEqual(true);
  });

  it("correctly detects when the coordinate is NOT on the board", () => {
    expect(isOnTheBoard(-1, 5)).toEqual(false);
    expect(isOnTheBoard(-20, 5)).toEqual(false);
    expect(isOnTheBoard(5, 5)).toEqual(false);
    expect(isOnTheBoard(50, 5)).toEqual(false);
  });
});
