import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { extPoly } from "./extendedPolimerization";

const file1 = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Do extended polimerization and return difference between most common and less common elements (10 steps)", () => {
  test("With example", () => {
    const input = readInputFileToStringArray(file1);
    const result = extPoly(input);
    expect(result).toBe(1588);
  });
});
