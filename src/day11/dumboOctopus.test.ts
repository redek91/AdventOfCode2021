import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { countFlashes } from "./dumboOctopus";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Count flashes", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = countFlashes(input);
    expect(result).toBe(1656);
  });
});
