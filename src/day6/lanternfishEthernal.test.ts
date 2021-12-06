import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { lanternfishEthernalSimulation } from "./lanternfishEthernal";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Lanternfish simulation 256 days", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = lanternfishEthernalSimulation(input, 256);
    expect(result).toBe(26984457539);
  });
});
