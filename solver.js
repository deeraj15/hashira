// solver.js (Corrected Version)

/**
 * A more robust function to parse a string in any base into a BigInt.
 * This version uses the built-in parseInt for higher reliability.
 * @param {string} stringValue The number as a string (e.g., "aed70").
 * @param {number} base The base of the number (e.g., 16).
 * @returns {BigInt}
 */
function parseBigInt(stringValue, base) {
    return stringValue.split('').reduce((acc, char) => {
        // Use parseInt to convert each character digit based on the specified base
        const digitValue = parseInt(char, base);
        // Accumulate the result using BigInt arithmetic
        return acc * BigInt(base) + BigInt(digitValue);
    }, 0n); // Start the accumulator with a BigInt zero
}

/**
 * Main function to solve the polynomial problem.
 */
// solver.js

// ... (the parseBigInt function is above this)

function solve() {
    const jsonTestCase = `{
        "keys": {
            "n": 4,
            "k": 3
        },
        "1": {
            "base": "10",
            "value": "4"
        },
        "2": {
            "base": "2",
            "value": "111"
        },
        "3": {
            "base": "10",
            "value": "12"
        },
        "6": {
            "base": "4",
            "value": "213"
        }
    }`;

    // ... (the rest of the code is below this)

    // 1. Parse the JSON and extract the necessary data
    const testCase = JSON.parse(jsonTestCase);
    const k = testCase.keys.k;

    const xCoords = [];
    const yCoords = [];

    console.log(`--- Parsing and Converting First ${k} Points ---`);
    for (let i = 1; i <= k; i++) {
        const key = String(i);
        const pointData = testCase[key];
        const base = parseInt(pointData.base, 10);
        const value = pointData.value;

        xCoords.push(BigInt(i));
        const y = parseBigInt(value, base);
        yCoords.push(y);

        console.log(`Point ${i}: (x=${i}, y=${y})`);
    }

    // 2. The Lagrange Interpolation logic (this part was correct)
    let pAtZero = 0n;
    for (let j = 0; j < k; j++) {
        const y_j = yCoords[j];
        const x_j = xCoords[j];

        let numerator = 1n;
        let denominator = 1n;

        for (let i = 0; i < k; i++) {
            if (i === j) {
                continue;
            }
            const x_i = xCoords[i];
            numerator *= -x_i;
            denominator *= (x_j - x_i);
        }
        
        const term = y_j * numerator / denominator;
        pAtZero += term;
    }

    // 3. Print the final result
    console.log("\n-------------------------------------------");
    console.log(`The constant coefficient (c_0) is: ${pAtZero}`);
    console.log("-------------------------------------------");
}

// Run the solver
solve();