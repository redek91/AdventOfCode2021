import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { sumLowestPointsIncremented } from "./smokeBasin";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Count how many times 1,4,7,8 signal occur", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = sumLowestPointsIncremented(input);
    expect(result).toBe(15);
  });
});
