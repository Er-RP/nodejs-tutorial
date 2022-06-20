/* Import module in file will invoke the functions inside it directly */
const num1 = 5;
const num2 = 10;

function addValues() {
  console.log(`the sum is : ${num1 + num2}`);
}

addValues(); /* It will executed automatically while we import this module in another file*/

module.exports = addValues;
