import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { bingoLastBoardWins } from "./bingoLastBoardWins";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), {
  encoding: "utf-8",
});

describe("Calculating points on last winning table", () => {
  test("With examples", () => {
    const input = readInputFileToStringArray(file);
    const result = bingoLastBoardWins(input);
    expect(result).toBe(1924);
  });
});
