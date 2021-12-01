import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "../utils/readInputFileToStringArray";
import { countMeasurementIncreases } from "./sonarSweep";

const file = readFileSync(path.join(__dirname, "./", "testInput-1.txt"), { encoding: 'utf-8' }); 

describe("Counting measurement increases", () => {
    test("With examples", () => {
        const measurements = readInputFileToStringArray(file);
        const result = countMeasurementIncreases(measurements);
        expect(result).toBe(7);
    });
});

