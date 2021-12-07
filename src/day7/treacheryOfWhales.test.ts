import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { calculateCheapestHorizontalPositionFuel } from "./treacheryOfWhales";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Calculating cheapest horizontal position fuel usage", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = calculateCheapestHorizontalPositionFuel(input);
    expect(result).toBe(37);
  });
});
