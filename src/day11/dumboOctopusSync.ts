export function calculateSync(input: string[]): number {
  let octopi: Octopus[][] = [];

  const rows = input.length;
  const cols = input[0].length;
  const daysMax = 10000;

  // Parse octopi
  for (let y = 0; y < rows; y++) {
    octopi[y] = [];
    const currentRow = input[y].split("").map((stringValue) => Number.parseInt(stringValue));
    for (let x = 0; x < cols; x++) {
      octopi[y][x] = new Octopus(x, y, currentRow[x]);
    }
  }

  let syncFlashDay = 0;
  // Run particle system simulation
  for (let day = 0; day < daysMax; day++) {
    let hasFlashedAccumulator = true;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        octopi[x][y].step(octopi);
      }
    }
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        hasFlashedAccumulator = hasFlashedAccumulator && octopi[x][y].hasFlashed;
        if (octopi[x][y].hasFlashed) {
          octopi[x][y].reset();
        }
      }
    }

    // All octies flashed
    if (hasFlashedAccumulator) {
      syncFlashDay = day + 1;
      break;
    }
  }
  return syncFlashDay === 0 - 1 ? -1 : syncFlashDay;
}

class Octopus {
  public x: number;
  public y: number;
  public energyVal: number;
  public hasFlashed: boolean;

  constructor(x: number, y: number, energiVal: number) {
    this.x = x;
    this.y = y;
    this.energyVal = energiVal;
    this.hasFlashed = false;
  }

  step(environment: Octopus[][]): void {
    if (!this.hasFlashed) {
      this.energyVal++;
      if (this.energyVal == 10) {
        this.flash(environment);
      }
    }
  }

  reset(): void {
    this.hasFlashed = false;
  }

  private flash(environment: Octopus[][]): void {
    this.hasFlashed = true;
    this.energyVal = 0;

    const rows = environment.length;
    const cols = environment[0].length;

    // Check for other octopi
    if (this.x !== 0 && !environment[this.y][this.x - 1].hasFlashed) environment[this.y][this.x - 1].step(environment);
    if (this.x !== cols - 1 && !environment[this.y][this.x + 1].hasFlashed)
      environment[this.y][this.x + 1].step(environment);
    if (this.y !== 0 && !environment[this.y - 1][this.x].hasFlashed) environment[this.y - 1][this.x].step(environment);
    if (this.y !== rows - 1 && !environment[this.y + 1][this.x].hasFlashed)
      environment[this.y + 1][this.x].step(environment);
    if (this.x !== 0 && this.y !== 0 && !environment[this.y - 1][this.x - 1].hasFlashed)
      environment[this.y - 1][this.x - 1].step(environment);
    if (this.x !== cols - 1 && this.y !== rows - 1 && !environment[this.y + 1][this.x + 1].hasFlashed)
      environment[this.y + 1][this.x + 1].step(environment);
    if (this.x !== 0 && this.y !== rows - 1 && !environment[this.y + 1][this.x - 1].hasFlashed)
      environment[this.y + 1][this.x - 1].step(environment);
    if (this.x !== cols - 1 && this.y !== 0 && !environment[this.y - 1][this.x + 1].hasFlashed)
      environment[this.y - 1][this.x + 1].step(environment);
  }
}
