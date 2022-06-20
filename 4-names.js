//Local
const SECRET = "SECRET";

//sharable to other file

const JOHN = "john";
const RAJ = "raj";

/* module is an Global and we can access it anywhere in the file */
/* We can exports (functions,strings,objects and etc..) from one module and use it an another module.
module.exports is an object ( {} ) */

module.exports = { JOHN, RAJ };
console.log(module);
