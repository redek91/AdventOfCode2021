export function countSlidingWindowsIncreases(input: string[]): number {

    let increaseCounter = 0;
    let slidingWindowSums: number[] = [];

    const windowSize = 3;

    // Creating array of sliding windows
    for (let i = windowSize-1; i < input.length; i++){
        slidingWindowSums.push(
            Number.parseInt(input[i]) +
            Number.parseInt(input[i - 1]) +
            Number.parseInt(input[i - 2])
        );
    }

    // Compare each window's sum with the previous
    // If previous < current : increase count
    for (let i = 1; i < slidingWindowSums.length; i++){
        if (slidingWindowSums[i - 1] < slidingWindowSums[i]) {
            increaseCounter++;
        } 
    }
    return increaseCounter;
}