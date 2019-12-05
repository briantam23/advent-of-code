/*
--- Day 4: Secure Container ---
You arrive at the Venus fuel depot only to discover it's protected by a password. 
The Elves had written the password on a sticky note, but someone threw it out.

However, they do remember a few key facts about the password:

It is a six-digit number.
The value is within the range given in your puzzle input.
Two adjacent digits are the same (like 22 in 122345).
Going from left to right, the digits never decrease; 
they only ever increase or stay the same (like 111123 or 135679).
Other than the range rule, the following are true:

111111 meets these criteria (double 11, never decreases).
223450 does not meet these criteria (decreasing pair of digits 50).
123789 does not meet these criteria (no double).
How many different passwords within the range given in your puzzle input meet these criteria?

Your puzzle input is 123257-647015.
*/

const min = 123257;
const max = 647015;


const checkDecrease = numStr => {
    for(let j = 0; j < 5; j++) {
        if(numStr[j + 1] < numStr[j]) {
            let addStr = '';

            while(addStr.length < 5 - j) {
                addStr += numStr[j];
            }
            numStr = numStr.substr(0, j + 1) + addStr;
        }
    }
    return numStr;
}

const checkDuplicate = numStr => {
    for(let k = 0; k < 5; k++) {
        if(numStr[k + 1] === numStr[k]) return true;
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
