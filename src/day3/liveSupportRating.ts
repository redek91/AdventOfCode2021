const enum MovementType {
  FORWARD = "forward",
  UP = "up",
  DOWN = "down",
}

export function calculateLiveSupportRating(input: string[]): number {
  let oxigenNumbers = input;

  const valueLength = input[0].length;

  // Looping to each bit of oxigenNumbers
  for (let i = 0; i < valueLength; i++) {
    let oneCount = 0;
    let zeroCount = 0;

    oxigenNumbers.forEach((currentValue) => {
      let currentBit = currentValue.charAt(i);

      if (currentBit === "1") {
        oneCount++;
      } else {
        zeroCount++;
      }
    });

    if (oneCount >= zeroCount) {
      oxigenNumbers = oxigenNumbers.filter(
        (currentNumber) => currentNumber.charAt(i) === "1"
      );
    } else {
      oxigenNumbers = oxigenNumbers.filter(
        (currentNumber) => currentNumber.charAt(i) === "0"
      );
    }

    if (oxigenNumbers.length === 1) {
      break;
    }
  }

  let co2Numbers = input;
  // Looping to each bit of co2Numbers
  for (let i = 0; i < valueLength; i++) {
    let oneCount = 0;
    let zeroCount = 0;

    co2Numbers.forEach((currentValue) => {
      let currentBit = currentValue.charAt(i);

      if (currentBit === "1") {
        oneCount++;
      } else {
        zeroCount++;
      }
    });

    if (oneCount >= zeroCount) {
      co2Numbers = co2Numbers.filter(
        (currentNumber) => currentNumber.charAt(i) === "0"
      );
    } else {
      co2Numbers = co2Numbers.filter(
        (currentNumber) => currentNumber.charAt(i) === "1"
      );
    }

    if (co2Numbers.length === 1) {
      break;
    }
  }

  const oxigenNumberAsNumber = Number.parseInt(oxigenNumbers[0], 2);
  const co2NumberAsNumber = Number.parseInt(co2Numbers[0], 2);

  return oxigenNumberAsNumber * co2NumberAsNumber;
}
