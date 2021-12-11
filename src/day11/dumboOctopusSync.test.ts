import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { calculateSync } from "./dumboOctopusSync";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Check first time all octos flash in sync", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = calculateSync(input);
    expect(result).toBe(195);
  });
});
