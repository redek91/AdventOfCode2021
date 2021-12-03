import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { calculatePowerConsumption } from "./binaryDiagnostic";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Calculating power consumption", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = calculatePowerConsumption(input);
    expect(result).toBe(198);
  });
});
