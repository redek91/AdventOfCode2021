export function bingoLastBoardWins(input: string[]): number {
  const drawnNumbers = input[0].split(",");

  let bingoTabels: BingoTable[] = getBingotabelsFromInput(input);

  let lastWinningBingoTable = null;
  let lastWinningBingoNumber = "";

  for (let currentNumber of drawnNumbers) {
    for (let currentBingoTable of bingoTabels) {
      // Check if current table already won, if so skip this table
      if (!currentBingoTable.checkIfWin()) {
        currentBingoTable.checkNumberDrawn(currentNumber);

        if (currentBingoTable.checkIfWin()) {
          lastWinningBingoTable = currentBingoTable;
          lastWinningBingoNumber = currentNumber;
        }
      }
    }
  }

  return (
    lastWinningBingoTable?.getUnmarkedNumbersSum()! *
    Number.parseInt(lastWinningBingoNumber)
  );
}

/**
 * Creates bingotabels from the given input
 * @param input
 * @returns bingotables
 */
function getBingotabelsFromInput(input: string[]): BingoTable[] {
  let bingoTabels: BingoTable[] = [];

  for (let i = 2; i <= input.length; i += 6) {
    let singleBingoTableInput: string[] = [];

    // Every bingotable has 5 raws
    singleBingoTableInput.push(input[i]);
    singleBingoTableInput.push(input[i + 1]);
    singleBingoTableInput.push(input[i + 2]);
    singleBingoTableInput.push(input[i + 3]);
    singleBingoTableInput.push(input[i + 4]);

    bingoTabels.push(new BingoTable(singleBingoTableInput));
  }

  return bingoTabels;
}

class BingoTable {
  private bingoNumbers: string[][];
  private drawnNumbers: boolean[][];

  constructor(inputRaws: string[]) {
    this.bingoNumbers = [];
    this.drawnNumbers = [];

    inputRaws.forEach((row) => {
      this.bingoNumbers.push(row.split(" ").filter((element) => element != ""));
    });

    // Initialize drawn numbers
    for (let row = 0; row < 5; row++) {
      let currentRow: boolean[] = [];
      for (let column = 0; column < 5; column++) {
        currentRow.push(false);
      }
      this.drawnNumbers.push(currentRow);
    }
  }

  getRows(): string[][] {
    return this.bingoNumbers;
  }

  getDrawnNumbers(): boolean[][] {
    return this.drawnNumbers;
  }

  /**
   * Checks if the number drawn is on the table and marks it
   * @param number
   */
  checkNumberDrawn(number: string): void {
    for (let row = 0; row < 5; row++) {
      for (let column = 0; column < 5; column++) {
        if (this.bingoNumbers[row][column] == number) {
          this.drawnNumbers[row][column] = true;
          break;
        }
      }
    }
  }

  checkIfWin(): boolean {
    return this.checkColumnWin() || this.checkRowWin();
  }

  getUnmarkedNumbersSum(): number {
    let sum = 0;

    for (let row = 0; row < 5; row++) {
      for (let column = 0; column < 5; column++) {
        if (!this.drawnNumbers[row][column]) {
          sum += Number.parseInt(this.bingoNumbers[row][column]);
        }
      }
    }

    return sum;
  }

  private checkColumnWin(): boolean {
    for (let column = 0; column < 5; column++) {
      if (
        this.drawnNumbers[0][column] &&
        this.drawnNumbers[1][column] &&
        this.drawnNumbers[2][column] &&
        this.drawnNumbers[3][column] &&
        this.drawnNumbers[4][column]
      ) {
        return true;
      }
    }
    return false;
  }

  private checkRowWin(): boolean {
    for (let row = 0; row < 5; row++) {
      if (
        this.drawnNumbers[row][0] &&
        this.drawnNumbers[row][1] &&
        this.drawnNumbers[row][2] &&
        this.drawnNumbers[row][3] &&
        this.drawnNumbers[row][4]
      ) {
        return true;
      }
    }
    return false;
  }
}
