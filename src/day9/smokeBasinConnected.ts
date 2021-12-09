let pointsAlreadyChecked: [number, number][] = [];

export function multiplyBasinSizes(input: string[]): number {
  let inputGrid: number[][] = [];
  input.forEach((inputRow) => {
    let inputCols = inputRow.split("");
    inputGrid.push(inputCols.map((inputCol) => Number.parseInt(inputCol)));
  });

  let lowerHeights: [number, number][] = getLowestPointsCoordinates(inputGrid);

  let basinSizes: number[] = [];

  lowerHeights.forEach((lowerHeigth) => {
    basinSizes.push(calculateBasinSize(inputGrid, lowerHeigth));
    pointsAlreadyChecked = [];
  });

  // Sort desc
  basinSizes = basinSizes.sort((a, b) => b - a);

  return basinSizes[0] * basinSizes[1] * basinSizes[2];
}

function getLowestPointsCoordinates(inputGrid: number[][]): [number, number][] {
  const rows = inputGrid.length;
  const cols = inputGrid[0].length;

  let lowerCoords: [number, number][] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let isLowest =
        (x !== 0 ? inputGrid[y][x - 1] > inputGrid[y][x] : true) &&
        (x !== cols - 1 ? inputGrid[y][x + 1] > inputGrid[y][x] : true) &&
        (y !== 0 ? inputGrid[y - 1][x] > inputGrid[y][x] : true) &&
        (y !== rows - 1 ? inputGrid[y + 1][x] > inputGrid[y][x] : true);

      if (isLowest) {
        lowerCoords.push([y, x]);
      }
    }
  }

  return lowerCoords;
}

function isPointAlreadyCalculated(
  previousPoints: [number, number][],
  pointToCheck: [number, number]
): boolean {
  for (let point of previousPoints) {
    if (point[0] === pointToCheck[0] && point[1] === pointToCheck[1])
      return true;
  }
  return false;
}

function calculateBasinSize(
  inputGrid: number[][],
  lowestPoint: [number, number]
): number {
  const rows = inputGrid.length;
  const cols = inputGrid[0].length;

  pointsAlreadyChecked.push(lowestPoint);

  let size = 0;
  // lowestPoint[0] -> y, lowestPoint[1] -> x
  let childrenToCheck: [number, number][] = [];

  // If point is not on the left edge, check point on the left
  if (lowestPoint[1] > 0) {
    let coordsToTheLeft: [number, number] = [
      lowestPoint[0],
      lowestPoint[1] - 1,
    ];
    if (!isPointAlreadyCalculated(pointsAlreadyChecked, coordsToTheLeft)) {
      let pointValue = inputGrid[coordsToTheLeft[0]][coordsToTheLeft[1]];
      if (pointValue !== 9) {
        pointsAlreadyChecked.push(coordsToTheLeft);
        childrenToCheck.push([coordsToTheLeft[0], coordsToTheLeft[1]]);
      }
    }
  }

  // If point is not on the right edge, check point on the right
  if (lowestPoint[1] < cols - 1) {
    let coordsToTheRigth: [number, number] = [
      lowestPoint[0],
      lowestPoint[1] + 1,
    ];
    if (!isPointAlreadyCalculated(pointsAlreadyChecked, coordsToTheRigth)) {
      let pointValue = inputGrid[coordsToTheRigth[0]][coordsToTheRigth[1]];
      if (pointValue !== 9) {
        pointsAlreadyChecked.push(coordsToTheRigth);
        childrenToCheck.push([coordsToTheRigth[0], coordsToTheRigth[1]]);
      }
    }
  }

  // If point is not on the top edge, check point on the top
  if (lowestPoint[0] > 0) {
    let coordsToTheTop: [number, number] = [lowestPoint[0] - 1, lowestPoint[1]];
    if (!isPointAlreadyCalculated(pointsAlreadyChecked, coordsToTheTop)) {
      let pointValue = inputGrid[coordsToTheTop[0]][coordsToTheTop[1]];
      if (pointValue !== 9) {
        pointsAlreadyChecked.push(coordsToTheTop);
        childrenToCheck.push([coordsToTheTop[0], coordsToTheTop[1]]);
      }
    }
  }

  // If point is not on the bottom edge, check point on the bottom
  if (lowestPoint[0] < rows - 1) {
    let coordsToTheBottom: [number, number] = [
      lowestPoint[0] + 1,
      lowestPoint[1],
    ];
    if (!isPointAlreadyCalculated(pointsAlreadyChecked, coordsToTheBottom)) {
      let pointValue = inputGrid[coordsToTheBottom[0]][coordsToTheBottom[1]];
      if (pointValue !== 9) {
        pointsAlreadyChecked.push(coordsToTheBottom);
        childrenToCheck.push([coordsToTheBottom[0], coordsToTheBottom[1]]);
      }
    }
  }

  childrenToCheck.forEach((child) => {
    size += calculateBasinSize(inputGrid, child);
  });
  return size + 1;
}
