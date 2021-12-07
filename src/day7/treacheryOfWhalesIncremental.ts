export function calculateCheapestHorizontalPositionFuelIncremental(
  input: string[]
): number {
  const initialHorizontalPositions = input[0]
    .split(",")
    .map((stringPosition) => Number.parseInt(stringPosition));

  let costs = [];

  const hightestNumber =
    initialHorizontalPositions[
      findHighestNumberIndex(initialHorizontalPositions)
    ];
  const lowestNumber =
    initialHorizontalPositions[
      findLowestNumberIndex(initialHorizontalPositions)
    ];

  let allPossiblePositions = generatePossiblePositions(
    lowestNumber,
    hightestNumber
  );

  for (let i = 0; i < allPossiblePositions.length; i++) {
    costs[i] = computeCostToPosition(
      initialHorizontalPositions,
      allPossiblePositions[i]
    );
  }

  return costs[findLowestNumberIndex(costs)];
}

function computeCostToPosition(array: number[], position: number) {
  let cost = 0;

  array.forEach((currentPosition) => {
    let distance = Math.abs(position - currentPosition);
    for (let i = 1; i <= distance; i++) {
      cost += i;
    }
  });
  return cost;
}

function generatePossiblePositions(minimum: number, maximum: number): number[] {
  let possiblePositions: number[] = [];
  for (let i = minimum; i <= maximum; i++) {
    possiblePositions.push(i);
  }
  return possiblePositions;
}

function findLowestNumberIndex(array: number[]) {
  let minimumIndex = 0;
  let currentIndex = 0;
  let minimum = Infinity;

  for (let currentCost of array) {
    if (minimum > currentCost) {
      minimumIndex = currentIndex;
      minimum = currentCost;
    }
    currentIndex++;
  }
  return minimumIndex;
}

function findHighestNumberIndex(array: number[]) {
  let maximumIndex = 0;
  let currentIndex = 0;
  let maximum = 0;

  for (let currentCost of array) {
    if (maximum < currentCost) {
      maximumIndex = currentIndex;
      maximum = currentCost;
    }
    currentIndex++;
  }
  return maximumIndex;
}
