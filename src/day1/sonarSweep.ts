export function countMeasurementIncreases(input: string[]): number {

    let increaseCounter = 0;

    for (let i = 1; i < input.length; i++){
        if (Number.parseInt(input[i - 1]) < Number.parseInt(input[i])) {
            increaseCounter++;
        } 
    }

    return increaseCounter;
}