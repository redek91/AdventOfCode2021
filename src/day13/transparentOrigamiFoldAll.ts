enum FoldType {
  up,
  left,
}

export function countVisibleDots(input: string[]): number {
  let paper = parsePaper(input);
  const foldInstructions = parseFoldInstructions(input);

  //printPaper(paper);

  foldInstructions.forEach((foldInstruction) => {
    if (foldInstruction[0] === FoldType.up) paper = foldUp(paper, foldInstruction[1]);
    else if (foldInstruction[0] === FoldType.left) paper = foldLeft(paper, foldInstruction[1]);
    printPaper(paper);
  });

  return countDots(paper);
}

function foldUp(input: string[][], atYCoordinate: number): string[][] {
  // Create a copy of input
  let inputCopy = [...input];
  let upperHalf = inputCopy.splice(0, atYCoordinate);
  let lowerHalf = inputCopy.slice(1);

  let rows = 0;

  if (lowerHalf.length > upperHalf.length) {
    rows = upperHalf.length;
  } else {
    rows = lowerHalf.length;
  }
  const cols = upperHalf[0].length;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (lowerHalf[y][x] === "#") upperHalf[upperHalf.length - 1 - y][x] = "#";
    }
  }
  return upperHalf;
}

function foldLeft(input: string[][], atXCoordinate: number): string[][] {
  // Create a copy of input
  let inputCopy = [...input];
  let leftHalf = inputCopy.map((row) => row.splice(0, atXCoordinate));
  let rightHalf = inputCopy.map((row) => row.splice(1));

  const cols = leftHalf[0].length;
  const rows = leftHalf.length;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (rightHalf[y][x] === "#") leftHalf[y][cols - 1 - x] = "#";
    }
  }

  return leftHalf;
}

function parsePaper(input: string[]): string[][] {
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
  let paper: string[][] = [];
  for (let i = 0; i < maxY + 1; i++) {
    paper.push(Array<string>(maxX + 1).fill("."));
  }

  // Add values to empty paper
  dotsCoords.forEach((coord) => {
    paper[coord[1]][coord[0]] = "#";
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

function printPaper(input: string[][]) {
  let paper = "";
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      paper += input[row][col] === "#" ? "#" : ".";
    }
    paper += "\n";
  }

  console.log(paper);
}

function countDots(input: string[][]): number {
  let numberOfDots = 0;
  input.forEach((row) =>
    row.forEach((col) => {
      if (col === "#") numberOfDots++;
    })
  );

  return numberOfDots;
}
