// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

const JOHN = "john";

const sayHi = (name) => {
  console.log(`Hello there ${name}`);
};

sayHi("RP");
sayHi(JOHN);
