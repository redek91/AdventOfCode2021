const braceScore = [1, 2, 3, 4];
const openingBraces: string[] = ["(", "[", "{", "<"];
const closingBraces: string[] = [")", "]", "}", ">"];

export function syntaxScoringClosing(input: string[]): number {
  let scores: number[] = [];

  input.forEach((line) => {
    let currentLineScore = 0;
    let isIllegalLine = false;
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
            isIllegalLine = true;
            break;
          }
        } else {
          isIllegalLine = true;
          break;
        }
      }
    }
    if (!isIllegalLine) {
      // Close the line
      let stillOpenBracesCount = openedBraces.length;
      for (let i = 0; i < stillOpenBracesCount; i++) {
        let lastOpenedBrace = openedBraces.pop();
        let braceType = openingBraces.indexOf(lastOpenedBrace!);
        currentLineScore = currentLineScore * 5 + braceScore[braceType];
      }
      scores.push(currentLineScore);
    }
  });

  // Sort scores and take middle score
  scores = scores.sort((a, b) => a - b);
  let middle = Math.floor(scores.length / 2);

  return scores[middle];
}
