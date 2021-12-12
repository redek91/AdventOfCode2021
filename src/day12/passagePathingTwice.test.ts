import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { countPathsThroughSmallCavesTwice } from "./passagePathingTwice";

const file = readFileSync(path.join(__dirname, "./", "testInput-1.txt"), {
  encoding: "utf-8",
});

describe("Count paths that go through small caves, with 1 small cave twice ??....boh", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = countPathsThroughSmallCavesTwice(input);
    expect(result).toBe(36);
  });
});
