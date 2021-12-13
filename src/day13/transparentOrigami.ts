enum FoldType {
  up,
  left,
}

export function countVisibleDots(input: string[]): number {
  let paper = parsePaper(input);
  const foldInstructions = parseFoldInstructions(input);

  foldInstructions.slice(0, 1).forEach((foldInstruction) => {
    if (foldInstruction[0] === FoldType.up) paper = foldUp(paper, foldInstruction[1]);
    else if (foldInstruction[0] === FoldType.left) paper = foldLeft(paper, foldInstruction[1]);

    //printPaper(paper);
  });

  return countDots(paper);
}

function foldUp(input: boolean[][], atYCoordinate: number): boolean[][] {
  // Create a copy of input
  let inputCopy = [...input];
  let upperHalf = inputCopy.splice(0, atYCoordinate);
  let lowerHalf = inputCopy.splice(1);

  const rows = lowerHalf.length;
  const cols = lowerHalf[0].length;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (lowerHalf[rows - 1 - y][x]) upperHalf[y][x] = true;
    }
  }

  return upperHalf;
}

function foldLeft(input: boolean[][], atXCoordinate: number): boolean[][] {
  // Create a copy of input
  let inputCopy = [...input];
  let leftHalf = inputCopy.map((row) => row.splice(0, atXCoordinate));
  let rightHalf = inputCopy.map((row) => row.splice(1));

  const rows = leftHalf.length;
  const cols = leftHalf[0].length;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (rightHalf[y][cols - 1 - x]) leftHalf[y][x] = true;
    }
  }

  return leftHalf;
}

function parsePaper(input: string[]): boolean[][] {
  const dotsCoords: [number, number][] = [];

  // Parse coordinates
  let separator = input.indexOf("");
  for (let line = 0; line < separator; line++) {
    const currentLine = input[line].split(",");
    dotsCoords.push([Number.parseInt(currentLine[0]), Number.parseInt(currentLine[1])]);
  }

  // Get paper lengths
  let maxX = 0;
  let maxY = 0;
  dotsCoords.forEach((coord) => {
    if (coord[0] > maxX) maxX = coord[0];
    if (coord[1] > maxY) maxY = coord[1];
  });

  // Generate paper as array
  let paper: boolean[][] = [];
  for (let i = 0; i < maxY + 1; i++) {
    paper.push(Array<boolean>(maxX + 1));
  }

  // Add values to empty paper
  dotsCoords.forEach((coord) => {
    paper[coord[1]][coord[0]] = true;
  });

  return paper;
}

function parseFoldInstructions(input: string[]): [FoldType, number][] {
  let foldInstructions: [FoldType, number][] = [];
  // Parse fold instructions
  let separator = input.indexOf("");
  for (let line = separator + 1; line < input.length; line++) {
    const currentLine = input[line].split(" ")[2].split("=");
    foldInstructions.push([currentLine[0] === "y" ? FoldType.up : FoldType.left, Number.parseInt(currentLine[1])]);
  }

  return foldInstructions;
}

function printPaper(input: boolean[][]) {
  let paper = "";
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      paper += input[row][col] ? "#" : ".";
    }
    paper += "\n";
  }

  console.log(paper);
}

function countDots(input: boolean[][]): number {
  let numberOfDots = 0;
  input.forEach((row) =>
    row.forEach((col) => {
      if (col) numberOfDots++;
    })
  );

  return numberOfDots;
}
