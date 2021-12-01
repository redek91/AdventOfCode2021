import { readFileSync } from "fs";
import path from "path";
import { readInputFileToStringArray } from "./readInputFileToStringArray";

const file = readFileSync(path.join(__dirname, "./", "testInput.txt"), { encoding: 'utf-8' });    

test("Check check utility function for importing inputFiles", () => {
    expect(readInputFileToStringArray(file)).toStrictEqual(["199", "200", "208", "210", "200", "207", "240", "269", "260", "263"]);
});