import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { bingo } from "./bingo";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Calculating winning bingo table", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = bingo(input);
    expect(result).toBe(4512);
  });
});
