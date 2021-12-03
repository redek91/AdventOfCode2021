export function calculatePowerConsumption(input: string[]): number {
  let gamma = "";
  let epsilon = "";

  const valueLength = input[0].length;

  for (let i = 0; i < valueLength; i++) {
    let oneCount = 0;
    let zeroCount = 0;

    input.forEach((currentValue) => {
      let currentBit = currentValue.charAt(i);

      if (currentBit === "1") {
        oneCount++;
      } else {
        zeroCount++;
      }
    });

    if (oneCount > zeroCount) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }

  const gammaAsNumber = Number.parseInt(gamma, 2);
  const epsilonAsNumber = Number.parseInt(epsilon, 2);

  return gammaAsNumber * epsilonAsNumber;
}
