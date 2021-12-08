import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { count1478 } from "./broken7SegmentDisplay";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Count how many times 1,4,7,8 signal occur", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = count1478(input);
    expect(result).toBe(26);
  });
});
