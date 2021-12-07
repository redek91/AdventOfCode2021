import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { calculateCheapestHorizontalPositionFuelIncremental } from "./treacheryOfWhalesIncremental";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Calculating cheapest horizontal position fuel usage, with incremental fuel usage", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = calculateCheapestHorizontalPositionFuelIncremental(input);
    expect(result).toBe(168);
  });
});
