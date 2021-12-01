import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { countSlidingWindowsIncreases} from "./slidingWindows";

const file = readFileSync(path.join(__dirname, "./", "testInput-1.txt"), { encoding: 'utf-8' });

describe("Counting sliding windows increases", () => {
    test("With examples", () => {
        const measurements = readInputFileToStringArray(file);
        const result = countSlidingWindowsIncreases(measurements);
        expect(result).toBe(5);
    });
});