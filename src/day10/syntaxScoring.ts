const braceScore = [3, 57, 1197, 25137];
const openingBraces: string[] = ["(", "[", "{", "<"];
const closingBraces: string[] = [")", "]", "}", ">"];

export function syntaxScoring(input: string[]): number {
  let score = 0;

  input.forEach((line) => {
    let openedBraces: string[] = [];
    for (let i = 0; i < line.length; i++) {
      let currentCharacter: string = line.charAt(i);

      // Adding opening braces to list
      if (openingBraces.includes(currentCharacter)) {
        openedBraces.push(currentCharacter);
      } else if (closingBraces.includes(currentCharacter)) {
        if (openedBraces.length > 0) {
          let braceType = closingBraces.indexOf(currentCharacter);
          let correspondingOpeningBrace = openingBraces[braceType];
          let lastOpened = openedBraces.pop();
          if (lastOpened !== correspondingOpeningBrace) {
            score += braceScore[braceType];
            break;
          }
        } else {
          // Add to score directly if opening with a closing score
          score += braceScore[closingBraces.indexOf(currentCharacter)];
          break;
        }
      }
    }
  });

  return score;
}
