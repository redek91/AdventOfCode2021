import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { diveWithAim } from "./diveWithAim";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Calculating dive with aim", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = diveWithAim(input);
    expect(result).toBe(900);
  });
});
