/*
--- Part Two ---
An Elf just remembered one more important detail: 
the two adjacent matching digits are not part of a larger group of matching digits.

Given this additional criterion, but still ignoring the range rule, the following are now true:

112233 meets these criteria because the digits never decrease and 
all repeated digits are exactly two digits long.
123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).
How many different passwords within the range given in your puzzle input meet all of the criteria?
*/

const checkDecrease = require('./day4Part1');
const min = 123257;
const max = 647015;


const checkDuplicate = numStr => {
    let duplicateCount = 0;

    for(let k = 0; k < 5; k++) {
        // If the next digit isn't a duplicate
        if(numStr[k + 1] !== numStr[k]) {
            // If only 2 repeated digits
            if(duplicateCount === 1) return true;
            else duplicateCount = 0;
        }
        else duplicateCount++;
        
        // If the 2 repeated digits are the last digits
        if(k === 4 && duplicateCount === 1) return true;
    }
    return false;
}

const findValidPasswordCount = (min, max) => {

    let validPasswordCount = 0;

    for(let i = min; i <= max; i++) {
        
        let numStr = i.toString();

        // Checks decrease & replaces digits if necessary
        numStr = checkDecrease(numStr);
        if(numStr > max) break;

        // If invalid password, initializes index to valid password
        if(i != numStr) i = numStr;
        
        // If there's a duplicate, increase count
        if(checkDuplicate(numStr)) validPasswordCount++;
    }
    return validPasswordCount;
}


console.log(findValidPasswordCount(min, max));