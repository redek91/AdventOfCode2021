import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { countPathsThroughSmallCaves } from "./passagePathing";

const file1 = readFileSync(path.join(__dirname, "./", "testInput-1.txt"), {
  encoding: "utf-8",
});

describe("Count paths that go through small caves", () => {
  test("With example1", () => {
    const input = readInputFileToStringArray(file1);
    const result = countPathsThroughSmallCaves(input);
    expect(result).toBe(10);
  });
});
