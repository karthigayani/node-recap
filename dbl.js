// ### Day-09

// const double = (n) => n*2;
// console.log(double(10));

// present in browser not in node: (document,window)
// console.log(document); // - ❌
// console.log(window); // - ❌

// present in node not in browser: (global, process)
// global is came instead of window object
// process is like running program used to get data from user.
// console.log(global); // - ✅
// console.log(process.argv); // argumentValues

// // method : 1
// const double = (n) => n*2;
// console.log(double(process.argv[2]));
// // node dbl.js 50 -> 100
// // node dbl.js 20 -> 40

// // method : 2
// const [, , num] = process.argv; // array destructuring
// const double = (n) => n * 2;
// console.log(double(num));
// // node dbl.js 5 -> 10
// // node dbl.js 10 -> 20

// Task
const [, , num1,num2] = process.argv; // array destructuring
const sum = (a,b) => a + b;
console.log(sum(+num1,+num2));
// node dbl.js 5 4