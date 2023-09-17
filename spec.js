// ### Day-09
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const os = require("os");

console.log("Free memory", os.freemem());
// 1KB = 1024 bytes
// 1MB = 1024 KB
// 1GB = 1024 MB

console.log("Free memory", os.freemem() / 1024 / 1024 / 1024);
console.log("Total memory", os.totalmem() / 1024 / 1024 / 1024);
console.log("Version", os.version());
console.log("CPU", os.cpus());