// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

/* require is an Global and we can access it anywhere in the file. it's used to import modules into file. */

const names = require("./4-names");
const sayHi = require("./5-utils");

sayHi("RP");
sayHi(names.JOHN);
sayHi(names.RAJ);
