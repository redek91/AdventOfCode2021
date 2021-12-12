let allPaths: string[] = [];
let specialCave: string = "";

export function countPathsThroughSmallCavesTwice(input: string[]): number {
  const caves = parseCaves(input);

  const smallCaves: string[] = [];
  caves.forEach((cave) => {
    if (cave.name !== "start" && cave.name !== "end" && cave.isSmallCave()) {
      smallCaves.push(cave.name);
    }
  });

  const startingCave = caves.get("start")!;

  console.log("number of specials:", smallCaves.length);
  smallCaves.forEach((cave) => {
    console.log("At special: ", cave);
    specialCave = cave;
    explore(0, startingCave);
    console.log("Current paths computed: ", allPaths.length);
  });

  return allPaths.length;
}

function explore(depth: number, cave: Cave, prevCave: Cave | undefined = undefined, currentPath: string = "") {
  let newPath = (currentPath += "," + cave.name);

  if (cave.name === "end") {
    if (!allPaths.includes(newPath)) allPaths.push(newPath);
    return;
  }

  cave.linkedCaves.forEach((currLink) => {
    if (prevCave === undefined) explore(depth + 1, currLink, cave, newPath);
    else {
      if (
        (currLink.name !== "start" && currLink.isSmallCave() && !currentPath.includes(currLink.name)) ||
        (currLink.name !== "start" &&
          currLink.isSmallCave() &&
          currLink.name === specialCave &&
          currentPath.indexOf(specialCave, currentPath.indexOf(specialCave) + 1) == -1) ||
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
