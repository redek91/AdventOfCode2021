import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { calculateCheapestHorizontalPositionFuelIncremental } from "./treacheryOfWhalesIncremental";

const file = readFileSync(path.join(__dirname, "./", "input.txt"), {
  encoding: "utf-8",
});

const input = readInputFileToStringArray(file);

console.log(calculateCheapestHorizontalPositionFuelIncremental(input));
