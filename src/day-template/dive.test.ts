import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { dive } from "./dive";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Calculating dive distance", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = dive(input);
    expect(result).toBe(150);
  });
});
