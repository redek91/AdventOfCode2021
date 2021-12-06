import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { lanternfishSimulation } from "./lanternfish";

const file = readFileSync(path.join(__dirname, "./", "input.txt"), {
  encoding: "utf-8",
});

const input = readInputFileToStringArray(file);

console.log(lanternfishSimulation(input, 80));
