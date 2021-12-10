import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { syntaxScoringClosing } from "./syntaxScoringClosing";

const file = readFileSync(path.join(__dirname, "./", "testInput-2.txt"), {
  encoding: "utf-8",
});

describe("Calculate middle syntax scoring for closing", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = syntaxScoringClosing(input);
    expect(result).toBe(288957);
  });
});
