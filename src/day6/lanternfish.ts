export function lanternfishSimulation(input: string[], days: number): number {
  let initialCondition = input[0].split(",");
  let lanternFish: Lanternfish[] = [];

  initialCondition.forEach((fish) => {
    lanternFish.push(new Lanternfish(Number.parseInt(fish)));
  });

  for (let i = 0; i < days; i++) {
    let newLanternfishes: Lanternfish[] = [];
    lanternFish.forEach((element) => {
      if (element.isCreatingNewFish()) {
        newLanternfishes.push(new Lanternfish(8));
        element.resetCooldown();
      } else {
        element.step();
      }
    });

    lanternFish = lanternFish.concat(newLanternfishes);
  }

  return lanternFish.length;
}

class Lanternfish {
  public cooldown: number;

  constructor(cooldown: number) {
    this.cooldown = cooldown;
  }

  step() {
    this.cooldown--;
  }

  isCreatingNewFish(): boolean {
    if (this.cooldown === 0) {
      return true;
    } else {
      return false;
    }
  }

  resetCooldown(): void {
    this.cooldown = 6;
  }
}
