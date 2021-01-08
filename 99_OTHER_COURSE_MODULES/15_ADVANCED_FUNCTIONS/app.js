/*
    Advanced functions
    02/01/2021
*/

const transition = () => {
    console.log("--------------------");
};

/*
    PURE/IMPURE FUNCTIONS
*/

// Pure function -> same input involves same result
const add = (a, b) => a + b;
console.log("Pure function: " + add(5, 12));
transition();

// Impure function -> same input involves different result
const addRandom = (a) => a + Math.round(Math.random() * 100);
console.log("Impure function: " + addRandom(13));
transition();

// Impure function -> function changes something outside of the function scope
// NB: we talk about side effects
let previousResult = 0;
const addMoreNumbers = (num1, num2) => {
    const sum = num1 + num2;
    previousResult = sum;
    return sum;
};
console.log("previousValue = " + previousResult);
console.log("Adding 2 and 7: " + addMoreNumbers(2, 7));
console.log("new previousValue = " + previousResult + " => SIDE EFFECT!!!");
transition();

// Other impure function -> functions which changes referenced types
const myArray = [1, 2, 3];
const extendArray = () => {
    myArray.push(myArray.length + 1);
};
console.log("Original array: " + myArray);
console.log("Executing impure function...");
extendArray();
console.log("New array: " + myArray);
console.log("Executing impure function...");
extendArray();
console.log("New array: " + myArray);
transition();

/*
    In programming, we want to avoid using impure functions.
    Sometimes, we cannot use a pure function (like when we want to send
    data to a server, etc.) but as soon as it is possible to avoid side
    effects, we prefer using pure functions
*/

/* ************************************************************ */
/*
    Factory functions
    Functions which create other functions and return them
*/
// Let's imagine we want to create a function which calculates taxes
const calculateTax = (amount, tax) => amount * tax;
let vatAmount1 = calculateTax(100, 0.19);
let vatAmount2 = calculateTax(2546, 0.19);
let incomeTax = calculateTax(100, 0.25);

// To avoid repeting code and the risk of making mistakes, we use a factory function
const generateTaxCalculator = (tax) => {
    return (amount) => amount * tax;
};
const myVatCalculator = generateTaxCalculator(0.19);
console.log("100€ -> " + myVatCalculator(100) + "€");
console.log("7912€ -> " + myVatCalculator(7912) + "€");
transition();

/* ************************************************************ */
/*
    Closures
    NB: In JS, every function is a closure
    A Closure is composed of two elements: a functions and references to its
    environment (lexical environment). In JS, when a function is created,
    its external environment is "captured" in order to avoid losing reference
    to values the function needs to execute.
*/
// First look at function environment (extValue impact on our function)
let extValue = 1;
const factoryTest = (tx) => {
    return (amount) => {
        console.log(extValue);
        return amount * tx;
    };
};
myTest1 = factoryTest(0.5);
console.log(myTest1(100));
console.log(myTest1(1000));
extValue = 2;
console.log(myTest1(100));
console.log(myTest1(1000));
transition();

// Closures in practice
let userName = "Madi";
function greetUser() {
    console.log("Hi " + userName); // JS will ensure an access to the external userName, but not ensures the value of the variable, only an access to it!
}
function greetUser2() {
    let name = userName; // Same principle than before: an access to the external context is granted but the value of the external var can change
    console.log("Hi " + name);
}
function greetUser3() {
    let name = "Anna"; // Here (because of shadowing) the variable name is a part of the function internal environment and the value of name is not editable from outside the function
    console.log("Hi " + name);
}
let name = "Polo";
userName = "Justi";
greetUser();
greetUser2();
greetUser3();
transition();
// NB: Memory management is not a problem for us beacause JS engines are powerful and track every variable and if no refernce to them are useful they are destroyed and, then, memory is often cleared

/* ************************************************************ */
/*
    Recursion
*/
// First basic example
const powerOf = (val, pow) => {
    return pow === 0 ? 1 : (val * powerOf(val, pow - 1));
}
console.log(powerOf(2, 9));
transition();

// Mode advanced example: sometimes recursion can solve problems that a loop could not solve
// Forex, if we think about folders on our computers, we do not know exactly how deep we could go (folder inside of folder, etc.)
const myself = {
    name: "Mad",
    friends: [
        {
            name: "Clem",
            friends: [
                {
                    name: "Steph"
                },
                {
                    name: "Caro"
                }
            ]
        },
        {
            name: "Vincent"
        }
    ]
};
// -> we do not know how deep the friend relations could go

// Just printing all the way through friendship relations
const printFriendNames = (person) => {
    if (!person.name) {
        return;
    }
    console.log(person.name);
    if (!person.friends) {
        return;
    }
    for (const friend of person.friends) {
        printFriendNames(friend);
    }
}

// Getting an array of all the friend names
const getFriendNames = (person) => {
    const friendNames = [];

    if (!person.friends) {
        return [];
    }
    for (const friend of person.friends) {
        friendNames.push(friend.name);
        friendNames.push(...getFriendNames(friend));
    }
    return friendNames;
}
printFriendNames(myself);
console.log(getFriendNames(myself));