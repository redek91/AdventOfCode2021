import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { countVisibleDots } from "./transparentOrigami";

const file1 = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Count the number of dots after folding once", () => {
  test("With example", () => {
    const input = readInputFileToStringArray(file1);
    const result = countVisibleDots(input);
    expect(result).toBe(17);
  });
});
