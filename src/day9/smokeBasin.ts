export function sumLowestPointsIncremented(input: string[]): number {
  let cols = input[0].split("").length;
  let rows = input.length;

  let lowerHeights: number[] = [];

  let inputGrid: number[][] = [];

  input.forEach((inputRow) => {
    let inputCols = inputRow.split("");
    inputGrid.push(inputCols.map((inputCol) => Number.parseInt(inputCol)));
  });

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let isLowest =
        (x !== 0 ? inputGrid[y][x - 1] > inputGrid[y][x] : true) &&
        (x !== cols - 1 ? inputGrid[y][x + 1] > inputGrid[y][x] : true) &&
        (y !== 0 ? inputGrid[y - 1][x] > inputGrid[y][x] : true) &&
        (y !== rows - 1 ? inputGrid[y + 1][x] > inputGrid[y][x] : true);

      if (isLowest) {
        lowerHeights.push(inputGrid[y][x]);
      }
    }
  }

  // Sum lowest points incremented by 1
  let sum = 0;
  lowerHeights.forEach((heigth) => (sum += heigth + 1));

  return sum;
}
