export function calculateCheapestHorizontalPositionFuel(
  input: string[]
): number {
  const initialHorizontalPositions = input[0]
    .split(",")
    .map((stringPosition) => Number.parseInt(stringPosition));

  let costs = [];
  for (let i = 0; i < initialHorizontalPositions.length; i++) {
    costs[i] = computeCostToPosition(
      initialHorizontalPositions,
      initialHorizontalPositions[i]
    );
  }

  return costs[findCheapestCostIndex(costs)];
}

function computeCostToPosition(array: number[], position: number) {
  return array.reduce((sum, current) => sum + Math.abs(current - position), 0);
}

function findCheapestCostIndex(array: number[]) {
  let cheapestIndex = 0;
  let currentIndex = 0;
  let minimum = Infinity;

  for (let currentCost of array) {
    if (minimum > currentCost) {
      cheapestIndex = currentIndex;
      minimum = currentCost;
    }
    currentIndex++;
  }
  return cheapestIndex;
}
