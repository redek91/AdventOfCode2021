import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { syntaxScoring } from "./syntaxScoring";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Calculate syntax scoring", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = syntaxScoring(input);
    expect(result).toBe(26397);
  });
});
