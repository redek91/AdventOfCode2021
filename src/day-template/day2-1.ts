import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { dive } from "./dive";

const file = readFileSync(path.join(__dirname, "./", "input.txt"), {
  encoding: "utf-8",
});

const input = readInputFileToStringArray(file);

console.log(dive(input));
