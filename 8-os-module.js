/* os module used to find the details about the Operating Systems */

const os = require("os");

// info about current user
const user = os.userInfo();
console.log(user);

// method returns the system uptime in seconds
console.log(`The System Uptime is ${os.uptime()} seconds`);

// method returns currentOS details
const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
  platform: os.platform(),
  hostname: os.hostname(),
};
console.log(currentOS);
