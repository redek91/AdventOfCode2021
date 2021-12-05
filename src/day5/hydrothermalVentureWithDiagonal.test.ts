import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { countOverlappingLinesWithDiagonal } from "./hydrothermalVentureWithDiagonal";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Calculating overlapping lines with diagonals", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = countOverlappingLinesWithDiagonal(input);
    expect(result).toBe(12);
  });
});
