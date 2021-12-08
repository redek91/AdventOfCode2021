const oneLength = 2;
const twoThreeFiveLength = 5;
const fourLength = 4;
const sixNineZeroLength = 6;
const sevenLength = 3;
const eightLength = 7;

export function decodeAndSumAllOutputs(input: string[]): number {
  let sumOfOutputs = 0;

  let decodedNumbers: [number, string][] = [];

  input.forEach((inputLine) => {
    const splittedInputLine = inputLine.split("|");
    const inputSignal = splittedInputLine[0]
      .split(" ")
      .filter((element) => element != "");
    const outputSignal = splittedInputLine[1]
      .split(" ")
      .filter((element) => element != "");
    decodedNumbers = decodeNumbers(inputSignal);
    sumOfOutputs += decodeOutputAsNumber(decodedNumbers, outputSignal);
  });

  return sumOfOutputs;
}

function decodeNumbers(input: string[]): [number, string][] {
  let decodedNumbers: [number, string][] = [];
  // Sorting inputs
  let itemsRemaining = input.map((element) =>
    element.split("").sort().join("")
  );

  // Check digits that are known (1,4,7,8)
  // 1 has a length of 2
  if (itemsRemaining.filter((element) => element.length === oneLength)) {
    let newDecodedNumber = itemsRemaining.filter(
      (element) => element.length === oneLength
    )[0];
    decodedNumbers.push([1, newDecodedNumber]);
    // Removing element from array
    itemsRemaining = itemsRemaining.filter(
      (element) => element !== newDecodedNumber
    );
  }

  // 4 has a length of 4
  if (itemsRemaining.filter((element) => element.length === fourLength)) {
    let newDecodedNumber = itemsRemaining.filter(
      (element) => element.length === fourLength
    )[0];
    decodedNumbers.push([4, newDecodedNumber]);
    // Removing element from array
    itemsRemaining = itemsRemaining.filter(
      (element) => element !== newDecodedNumber
    );
  }

  // 7 has a length of 3
  if (itemsRemaining.filter((element) => element.length === sevenLength)) {
    let newDecodedNumber = itemsRemaining.filter(
      (element) => element.length === sevenLength
    )[0];
    decodedNumbers.push([7, newDecodedNumber]);
    // Removing element from array
    itemsRemaining = itemsRemaining.filter(
      (element) => element !== newDecodedNumber
    );
  }

  // 8 has a length of 7
  if (itemsRemaining.filter((element) => element.length === eightLength)) {
    let newDecodedNumber = itemsRemaining.filter(
      (element) => element.length === eightLength
    )[0];
    decodedNumbers.push([8, newDecodedNumber]);
  }

  // Decode remaining numbers
  decodedNumbers = decodeAmbiguousNumbers(itemsRemaining, decodedNumbers);

  return decodedNumbers;
}

function decodeAmbiguousNumbers(
  input: string[],
  decodedNumbers: [number, string][]
): [number, string][] {
  //Get numbers that have a length of 6: 6,9,0
  let numbersLength6 = input.filter(
    (element) => element.length === sixNineZeroLength
  );

  // Decoding 9
  let decoded4 = decodedNumbers.filter((element) => element[0] === 4)[0][1];
  let decoded9 = numbersLength6.filter((element) =>
    checkIfDigitsAreContained(element, decoded4)
  )[0];
  decodedNumbers.push([9, decoded9]);
  // removing from input
  numbersLength6 = numbersLength6.filter((element) => element !== decoded9);

  // Decoding 0
  let decoded1 = decodedNumbers.filter((element) => element[0] === 1)[0][1];
  let decoded0 = numbersLength6.filter((element) =>
    checkIfDigitsAreContained(element, decoded1)
  )[0];
  decodedNumbers.push([0, decoded0]);
  // removing from input
  numbersLength6 = numbersLength6.filter((element) => element !== decoded0);

  // Last number remaining is 6
  decodedNumbers.push([6, numbersLength6[0]]);

  //Get numbers that have a length of 5: 2,3,5
  let numbersLength5 = input.filter(
    (element) => element.length === twoThreeFiveLength
  );

  // Decoding 3
  let decoded7 = decodedNumbers.filter((element) => element[0] === 7)[0][1];
  let decoded3 = numbersLength5.filter((element) =>
    checkIfDigitsAreContained(element, decoded7)
  )[0];
  decodedNumbers.push([3, decoded3]);
  // removing from input
  numbersLength5 = numbersLength5.filter((element) => element !== decoded3);
  // 3 if number contains 7

  // Decoding 5
  let decoded6 = decodedNumbers.filter((element) => element[0] === 6)[0][1];
  let decoded5 = numbersLength5.filter((element) =>
    checkIfDigitsAreContained(decoded6, element)
  )[0];
  decodedNumbers.push([5, decoded5]);
  // removing from input
  numbersLength5 = numbersLength5.filter((element) => element !== decoded5);

  // Last remaining number is 2
  decodedNumbers.push([2, numbersLength5[0]]);

  return decodedNumbers;
}

function checkIfDigitsAreContained(str1: string, str2: string): boolean {
  for (let i = 0; i < str2.length; i++) {
    if (str1.indexOf(str2.charAt(i)) == -1) return false;
  }

  return true;
}

function decodeOutputAsNumber(
  cipherSolution: [number, string][],
  outputs: string[]
): number {
  let outputAsString = "";

  outputs = outputs.map((element) => element.split("").sort().join(""));

  outputs.forEach((element) => {
    outputAsString += cipherSolution
      .filter((decodedNumber) => decodedNumber[1] === element)[0][0]
      .toString();
  });
  return Number.parseInt(outputAsString);
}
