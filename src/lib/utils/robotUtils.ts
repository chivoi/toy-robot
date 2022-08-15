export function isOnTheBoard(num: number, boardSize: number): boolean {
  return num >= 0 && num <= (boardSize - 1);
}
