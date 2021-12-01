import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { countSlidingWindowsIncreases} from "./slidingWindows";

const file = readFileSync(path.join(__dirname, "./", "input.txt"), { encoding: 'utf-8' }); 

const input = readInputFileToStringArray(file);

console.log(countSlidingWindowsIncreases(input));