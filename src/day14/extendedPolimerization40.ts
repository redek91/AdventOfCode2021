export function extPoly40(input: string[]): number {
  let pairs = parsePairs(input[0]);
  let ruleSet = parseRuleset(input);

  const totalSteps = 40;
  for (let step = 0; step < totalSteps; step++) {
    pairs = polimerize(pairs, ruleSet);
  }

  return mostAndLessCommonDifference(pairs);
}

function parsePairs(input: string): Map<string, number> {
  const pairsUnparsed = input.split("");
  const pairs: Map<string, number> = new Map();

  for (let element = 0; element < pairsUnparsed.length - 1; element++) {
    let polimerPair = pairsUnparsed[element] + pairsUnparsed[element + 1];
    if (pairs.has(polimerPair)) {
      pairs.set(polimerPair, pairs.get(polimerPair)! + 1);
    } else {
      pairs.set(polimerPair, 1);
    }
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

function polimerize(input: Map<string, number>, ruleSet: Map<string, string>): Map<string, number> {
  let output: Map<string, number> = new Map();

  input.forEach((count, pair) => {
    const first = pair[0];
    const second = pair[1];

    if (ruleSet.has(pair)) {
      const filler = ruleSet.get(pair);
      if (output.has(first + filler)) {
        output.set(first + filler, output.get(first + filler)! + count);
      } else {
        output.set(first + filler, count);
      }

      if (output.has(filler + second)) {
        output.set(filler + second, output.get(filler + second)! + count);
      } else {
        output.set(filler + second, count);
      }
    } else {
      if (output.has(pair)) {
        output.set(pair, output.get(pair)! + count);
      } else {
        output.set(pair, count);
      }
    }
  });
  return output;
}

function mostAndLessCommonDifference(pairs: Map<string, number>): number {
  let mostCommon = Number.NEGATIVE_INFINITY;
  let lessCommon = Number.POSITIVE_INFINITY;

  const counts: Map<string, number> = new Map();
  // Count splitted elements
  pairs.forEach((count, pair) =>
    [0, 1].forEach((element) => {
      if (counts.has(pair[element])) {
        counts.set(pair[element], counts.get(pair[element])! + count);
      } else {
        counts.set(pair[element], count);
      }
    })
  );

  counts.forEach((count, _) => {
    if (count < lessCommon) lessCommon = count;
    if (count > mostCommon) mostCommon = count;
  });

  console.log(counts);

  // Divide by 2 to compensate split count(ab) = a/2, b/2
  return Math.ceil(mostCommon / 2) - Math.ceil(lessCommon / 2);
}
