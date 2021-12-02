const enum MovementType {
  FORWARD = "forward",
  UP = "up",
  DOWN = "down",
}

export function dive(input: string[]): number {
  let position = 0;
  let depth = 0;

  input.forEach((step) => {
    const stepSplitted = step.split(" ");

    switch (stepSplitted[0]) {
      case MovementType.UP:
        depth -= Number.parseInt(stepSplitted[1]);
        break;
      case MovementType.DOWN:
        depth += Number.parseInt(stepSplitted[1]);
        break;
      case MovementType.FORWARD:
        position += Number.parseInt(stepSplitted[1]);
    }
  });

  return depth * position;
}
