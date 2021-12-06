export function lanternfishEthernalSimulation(
  input: string[],
  days: number
): number {
  const fishes = new Array(9).fill(0);
  const inputFishes = input[0].split(",");
  inputFishes.forEach((fish) => (fishes[Number.parseInt(fish)] += 1));

  for (let day = 0; day < days; day++) {
    let fishes0 = fishes[1];
    let fishes1 = fishes[2];
    let fishes2 = fishes[3];
    let fishes3 = fishes[4];
    let fishes4 = fishes[5];
    let fishes5 = fishes[6];
    let fishes6 = fishes[7] + fishes[0];
    let fishes7 = fishes[8];
    let fishes8 = fishes[0];
    fishes[0] = fishes0;
    fishes[1] = fishes1;
    fishes[2] = fishes2;
    fishes[3] = fishes3;
    fishes[4] = fishes4;
    fishes[5] = fishes5;
    fishes[6] = fishes6;
    fishes[7] = fishes7;
    fishes[8] = fishes8;
  }
  return fishes.reduce((total: number, i: number) => total + i, 0);
}
