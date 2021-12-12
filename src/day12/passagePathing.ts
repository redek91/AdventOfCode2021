const allPaths: string[][] = [];

export function countPathsThroughSmallCaves(input: string[]): number {
  const caves = parseCaves(input);

  //printCaves(caves);
  // Run Simulation from start
  if (caves.get("start")) {
    const startingCave = caves.get("start")!;
    explore(0, startingCave);
  }

  return allPaths.length;
}

function explore(depth: number, cave: Cave, prevCave: Cave | undefined = undefined, currentPath: string[] = []) {
  let newPath = currentPath.concat(cave.name);

  if (cave.name === "end") {
    allPaths.push(newPath);
    return;
  }

  cave.linkedCaves.forEach((currLink) => {
    if (prevCave === undefined) explore(depth + 1, currLink, cave, newPath);
    else {
      if (
        (currLink.name !== "start" && currLink.isSmallCave() && !currentPath.includes(currLink.name)) ||
        (currLink.name !== "start" && !currLink.isSmallCave())
      ) {
        explore(depth + 1, currLink, cave, newPath);
      }
    }
  });
}

function parseCaves(input: string[]): Map<string, Cave> {
  const caves = new Map<string, Cave>();

  // Add caves to map
  input.forEach((line) => {
    const lineSplitted = line.split("-");
    const name = lineSplitted[0];
    const connection = lineSplitted[1];

    if (!caves.get(name)) {
      caves.set(name, new Cave(name));
    }
    if (!caves.get(connection)) {
      caves.set(connection, new Cave(connection));
    }
  });

  // Add connections
  input.forEach((line) => {
    const lineSplitted = line.split("-");
    const name = lineSplitted[0];
    const connection = lineSplitted[1];

    // Add links bi-directionally
    caves.get(name)?.linkedCaves.push(caves.get(connection)!);
    caves.get(connection)?.linkedCaves.push(caves.get(name)!);
  });
  return caves;
}

function printCaves(caves: Map<string, Cave>): void {
  caves.forEach((cave) => {
    console.log(cave, "Links: " + cave.getLinksAsString());
  });
}

class Cave {
  public name: string;
  public linkedCaves: Cave[] = [];

  constructor(name: string) {
    this.name = name;
  }

  isSmallCave(): boolean {
    if (this.name !== "start" && this.name !== "end") {
      return this.name === this.name.toLowerCase();
    }
    return false;
  }

  getLinksAsString(): string {
    let linksString = "";
    this.linkedCaves.forEach((link) => (linksString += linksString !== "" ? ", " + link.name : link.name));
    return linksString;
  }
}
