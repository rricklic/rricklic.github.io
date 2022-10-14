/*
 * var - define variable
 * let - block scoped variable
 * const - constant "variable"
 *
 */

// Arrow function
const func_square = (x) => {
    return x * x;
}

// For-of loop: iterate arrays, strings
const names = ["Megan", "Ryan", "Anna", "William"];
for (let name of names) {
    console.info(name);
}

// Map
const ages = new Map([
    ["Anna", 11],
    ["William", 5]
]);

// Set
const letters = new Set();
letters.add("a");
letters.add("b");
letters.add("c");

// Class
class Cell
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}
const cell = new Cell(0, 0);

// Promise
const promise = new Promise(function(func_success, func_fail) {
    // Producing code
    let isSuccess = true;

    if (isSuccess) {
        func_success();
    } else {
        func_fail();
    }
});
// Consuming code
promise.then(
    function(value) { /* Code was successful */},
    function(error) { /* Code was unsuccessful */}
);

// Symbol - unique identifier for object: Symbol('id') != Symbol('id')
const person = {
    firstName: "John",
    lastName: "Doe",
    age: "42"
};
let id  = Symbol('id');
person[id] = 12345;



function Cell(x, y)
{
    this.x = x;
    this.y = y;
    this.color = white;
    this.value = 0;
}


