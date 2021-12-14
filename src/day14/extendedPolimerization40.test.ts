import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { extPoly40 } from "./extendedPolimerization40";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Do extended polimerization and return difference between most common and less common elements (40 steps)", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = extPoly40(input);
    expect(result).toBe(2188189693529);
  });
});
