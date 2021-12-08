export function count1478(input: string[]): number {
  const outputs: string[] = [];

  // Getting inputs and outputs
  input.forEach((inputLine) => {
    outputs.push(inputLine.split("|")[1]);
  });

  const oneUniqueLength = 2;
  const fourUniqueLength = 4;
  const sevenUniqueLength = 3;
  const eightUniqueLength = 7;

  let numbersToSearchInOutputCounter = 0;

  outputs.forEach((output) => {
    let splittedOutput = output.split(" ");
    splittedOutput.forEach((signal) => {
      let signalLength = signal.length;
      if (
        signalLength === oneUniqueLength ||
        signalLength === fourUniqueLength ||
        signalLength === sevenUniqueLength ||
        signalLength === eightUniqueLength
      ) {
        numbersToSearchInOutputCounter++;
      }
    });
  });

  return numbersToSearchInOutputCounter;
}
