/**
 * Converts String list separated with \n to an array
 * @param input list of strings
 * @returns Array of strings
 */
export function readInputFileToStringArray(file: string): string[]{
    return file.replace(/\r\n/g,'\n').split("\n").filter((line) => line !== "\n");
}