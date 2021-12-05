import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { countOverlappingLines } from "./hydrothermalVenture";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Calculating overlapping lines", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = countOverlappingLines(input);
    expect(result).toBe(5);
  });
});
