const enum MovementType {
  FORWARD = "forward",
  UP = "up",
  DOWN = "down",
}

export function diveWithAim(input: string[]): number {
  let position = 0;
  let depth = 0;
  let aim = 0;

  input.forEach((step) => {
    const stepSplitted = step.split(" ");

    switch (stepSplitted[0]) {
      case MovementType.UP:
        aim -= Number.parseInt(stepSplitted[1]);
        break;
      case MovementType.DOWN:
        aim += Number.parseInt(stepSplitted[1]);
        break;
      case MovementType.FORWARD:
        position += Number.parseInt(stepSplitted[1]);
        depth += Number.parseInt(stepSplitted[1]) * aim;
    }
  });

  return depth * position;
}
