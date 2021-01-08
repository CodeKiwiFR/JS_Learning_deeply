/*
    Advanced Number and Strings
    03/01/2021
*/

const transition = () => {
    console.log("--------------------");
};

/*
    NUMBERS
    In JS, every number is a floating point number.
    Numbers are stored as 64 Bit floating points in JS.
    1 bit for the sign and the rest for representing the number and the dot position.
    There is a limit on number we can store and the precision is limited too.
*/

// LIMITS
console.log(Number.MAX_SAFE_INTEGER); // (2 ** (53) - 1) -> Highest integer we can work with
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.MAX_VALUE); // Here is the largest floating point number we can express
// Calculating with those numbers won't cause mistakes but the results will probably be wrong
transition();

// FP number (im)precision: the imprecision comes from the fact that calculations are performed onto binary numbers and not decimal ones
console.log(0.2 + 0.4);
console.log(0.2 + 0.4 === 0.6);
console.log((254).toString(2)); // Display a number binary representation
console.log((1 / 5).toString(2)); // We see the complexity of such a number
console.log((0.2).toFixed(20)); // Usually, JS rounds numbers in order to make them understandable but toFixed forces JS to show us a certain amount of numbers
console.log((0.2 + 0.4).toFixed(2)); // Good way of showing numbers
// In some cases, we need perfect precision (forex prices on an online shop) and then it could be a good solution to multiply our floating point number in order to get an integer with perfect precision!
console.log(Math.round((40.2 + 30.4) * 100));
transition();

// BigInt type
let myInt = 900855656465456456456456n; // Only works with integers and we cannot mix bigInt and other Numbers
console.log(myInt);
let myInt2 = 6n;
console.log(parseInt(myInt2));
transition();

// The Global Number and Math objects -> most of math functions are already coded and available in Math object
console.log(Number.POSITIVE_INFINITY);
console.log(Number.NEGATIVE_INFINITY);
console.log(Number.isFinite(10));
console.log(isNaN("lol"));
console.log(Math.abs(-5));
console.log(Math.random());
transition();

// Example -> random function
const randomIntBetween = (lowBound, upBound) => {
    return Math.round(lowBound + Math.random() * (upBound - lowBound));
};
console.log(`Random number between 10 and 20: ${randomIntBetween(10, 20)}.`);
console.log(`Random number between 1 and 3: ${randomIntBetween(1, 3)}.`);
console.log(`Random number between 0 and 250: ${randomIntBetween(0, 250)}.`);
transition();

/*
    STRINGS
*/
// Template literals offer a lot of possibility
const name = "Mad";
console.log(`My name is ${name}.`);
transition();

// Here is a special one: the function could contain a certain logic depending on an argument and the call to the function could enable the user to provide a string formatting which would be feeded by the function
const productDescription = (strings, productName, productPrice) => {
    // console.log(strings);
    // console.log(productName);
    // console.log(productPrice);
    let category;
    if (productPrice < 20) {
        category = "cheap";
    } else {
        category = "expensive";
    }
    return strings[0] + productName + strings[1] + category + strings[2];
};
const prodName = "Lego Star Wars";
const prodPrice = 125;

// Our template literal is transmitted as an argument to our function
const productOutput = productDescription`This product ${prodName} is ${prodPrice}.`;
console.log("-> " + productOutput);
// We call it TAGGED TEMPLATE
transition();

// Regular expressions
const userInput = "test@test.com";
const userInput2 = "testtest.com";
const userInput3 = "test@testcom";
console.log(userInput);
console.log(userInput.includes("@")); // Boring...
const regex = /^\S+@\S+\.\S+$/;
console.log(`Is first input correct? ${regex.test(userInput)}`);
console.log(`Is second input correct? ${regex.test(userInput2)}`);
console.log(`Is third input correct? ${regex.test(userInput3)}`);
