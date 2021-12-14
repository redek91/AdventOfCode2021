export function extPoly(input: string[]): number {
  let pairs = input[0];
  let ruleSet = parseRuleset(input);

  const totalSteps = 10;
  for (let step = 0; step < totalSteps; step++) {
    pairs = polimerize(pairs, ruleSet);
    console.log("current step", step);
  }

  return mostAndLessCommonDifference(pairs);
}

function parsePairs(input: string): string[] {
  const pairsUnparsed = input.split("");
  const pairs: string[] = [];

  for (let element = 0; element < pairsUnparsed.length - 1; element++) {
    pairs.push(pairsUnparsed[element] + pairsUnparsed[element + 1]);
  }

  return pairs;
}

function parseRuleset(input: string[]): Map<string, string> {
  const separator = "";
  const ruleset: Map<string, string> = new Map();

  for (let line = input.indexOf(separator) + 1; line < input.length; line++) {
    let currentLine = input[line].split(" -> ");
    ruleset.set(currentLine[0], currentLine[1]);
  }
  return ruleset;
}

function polimerize(input: string, ruleSet: Map<string, string>): string {
  let output: string = "";
  const pairs: string[] = parsePairs(input);
  output += pairs[0].split("")[0];
  pairs.forEach((pair) => {
    const filler = ruleSet.get(pair);
    if (filler !== undefined) output += filler;
    output += pair.split("")[1];
  });
  return output;
}

function mostAndLessCommonDifference(pairs: string): number {
  let mostCommon = Number.NEGATIVE_INFINITY;
  let lessCommon = Number.POSITIVE_INFINITY;

  let occurences: Map<string, number> = new Map();

  for (const s of pairs) {
    if (occurences.get(s)) {
      occurences.set(s, occurences.get(s)! + 1);
    } else {
      occurences.set(s, 1);
    }
  }

  for (const count of occurences.values()) {
    if (count > mostCommon) mostCommon = count;
    if (count < lessCommon) lessCommon = count;
  }

  return mostCommon - lessCommon;
}
