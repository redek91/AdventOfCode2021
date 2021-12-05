export function countOverlappingLines(input: string[]): number {
  const lines: Line[] = getLinesFromInput(input);
  let pointsOnMap: Point[] = [];

  let horizontalAndVerticalLines = lines.filter((line) =>
    line.isLineVerticalOrHorizontal()
  );

  horizontalAndVerticalLines.forEach((line) => {
    pointsOnMap = pointsOnMap.concat(line.getPointsOnLine());
  });

  let pointsCount: { [point: string]: number } = {};

  pointsOnMap.forEach((point) => {
    if (pointsCount[point.toString()]) {
      pointsCount[point.toString()]++;
    } else {
      pointsCount[point.toString()] = 1;
    }
  });

  let overlappingPoints = Object.keys(pointsCount).filter(
    (point) => pointsCount[point] > 1
  );

  return overlappingPoints.length;
}

function getLinesFromInput(input: string[]): Line[] {
  let lines: Line[] = [];

  input.forEach((line) => {
    let startAndStop = line.split(" -> ");
    let start = startAndStop[0].split(",");
    let stop = startAndStop[1].split(",");
    lines.push(
      new Line(
        new Point(Number.parseInt(start[0]), Number.parseInt(start[1])),
        new Point(Number.parseInt(stop[0]), Number.parseInt(stop[1]))
      )
    );
  });

  return lines;
}

// Line having start and stop vector
class Line {
  private start: Point;
  private end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }

  /**
   * @returns Array of points composing the line
   */
  getPointsOnLine(): Point[] {
    let pointsOnLine: Point[] = [];

    // Assuming line is vertical or horizontal
    // Line is vertical
    if (this.start.x === this.end.x) {
      // Building towards bottom, increment y
      if (this.start.y < this.end.y) {
        for (let y = this.start.y; y <= this.end.y; y++) {
          pointsOnLine.push(new Point(this.start.x, y));
        }
      } else {
        // Building towards top, decrement y
        for (let y = this.start.y; y >= this.end.y; y--) {
          pointsOnLine.push(new Point(this.start.x, y));
        }
      }
    } else if (this.start.y === this.end.y) {
      // Line is horizontal

      // Building towards left, increment x
      if (this.start.x < this.end.x) {
        for (let x = this.start.x; x <= this.end.x; x++) {
          pointsOnLine.push(new Point(x, this.start.y));
        }
      } else {
        // Building towards right, decrement x
        for (let x = this.start.x; x >= this.end.x; x--) {
          pointsOnLine.push(new Point(x, this.start.y));
        }
      }
    }

    return pointsOnLine;
  }

  isLineVerticalOrHorizontal(): boolean {
    return this.start.x === this.end.x || this.start.y === this.end.y;
  }
}
// 2D Vector
class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return this.x + "," + this.y;
  }
}

class PointCount {
  public point: Point;
  public count: number;

  constructor(point: Point) {
    this.point = point;
    this.count = 0;
  }
}
