import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { decodeAndSumAllOutputs } from "./broken7SegmentDisplayAllDigits";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Decode and sum all outputs", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = decodeAndSumAllOutputs(input);
    expect(result).toBe(61229);
  });
});
