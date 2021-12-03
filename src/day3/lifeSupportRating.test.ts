import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { calculateLiveSupportRating } from "./liveSupportRating";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Calculating live support ratinig", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = calculateLiveSupportRating(input);
    expect(result).toBe(230);
  });
});
