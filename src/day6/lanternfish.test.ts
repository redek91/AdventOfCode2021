import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { lanternfishSimulation } from "./lanternfish";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Lantenfishsimulation", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = lanternfishSimulation(input, 80);
    expect(result).toBe(5934);
  });
});
