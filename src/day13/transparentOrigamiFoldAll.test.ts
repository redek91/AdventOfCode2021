import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { countVisibleDots } from "./transparentOrigamiFoldAll";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Count the number of dots after folding", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = countVisibleDots(input);
    expect(result).toBe(16);
  });
});
