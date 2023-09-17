// // Day - 09
// // fs -> file system (write, read)
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// const fs = require("fs");

// const quote = "No beauty shines brighter than that of a good heart!!!...❤❣";
// // write method
// fs.writeFile("./awesome.html", quote, (err) => {
//     console.log("Completed Writing...");
// });

// // Task 1
// // Create the below files with quote2 as the content
// // /backup/
// // text-1.html
// // text-2.html
// // text-3.html
// // ....
// // text-10.html

// const quote2 = "Live more, worry less 😍🤩";
// for(let i=1; i<=10; i++){
//     fs.writeFile(`./backup/text-${i}.html`, quote2, (err) => {
//         console.log("Completed Writing...");
//     });
// };


// // Task 2
// // node file.js 30 -> 30 files to be created | text-1.html ... text-30.html

// // const [, , n] = process.argv;
// const quote3 = "Everyone has a different clock, wait for your time⌚";
// for(let i=1; i<=6; i++){
//     fs.writeFile(`./backup2/text-${i}.html`, quote3, (err) => {
//         if (err) {
//             console.error("Error writing file:", err);
//           } else {
//             console.log("Completed Writing...");
//           } 
//     });
// };

// Day-10

// read method
// const fs = require("fs");

// // for eg if "utf-8" not given // you will get hexa decimal values.
// fs.readFile("./cool.txt", (err,data) => {
//     console.log(data); 
// });

// fs.readFile("./cool.txt", "utf-8", (err,data) => {
//     console.log(data);
// });

// // when will error occur while reading
// // 1. file is not found
// // 2. If you are not having access to that file
// // 3. If file extension miss-matching

// fs.readFile("./cool1.txt", "utf-8",(err,data) => {
//     if(err){
//         console.log("❌");
//     }else {
//         console.log(data);
//     }
// });

// // Append (add) method: 
// // 1. used to add data in existing file 
// // 2. also creates new file if the file is not present.

// const fs = require("fs");

// const quote3 = "Dream without fear, love without limits😍❣";

// // What will happen when you use write here ? -> It will overwrites the entier data in the existing file.
// fs.writeFile("./fun.html", quote3, (err) => {
//     console.log("Completed appending!!!")
// });

// // So we go for append method
// // fs.appendFile("./fun.html", quote3, (err) => {
// //     console.log("Completed appending!!!")
// // });
// // Result : Good morning 🌷🌷🌷Dream without fear, love without limits😍❣

// // when you like to add the data in new line
// fs.appendFile("./fun.html", "\n"+quote3, (err) => {
//     console.log("Completed appending!!!")
// });
// // Result:
// // Good morning 🌷🌷🌷
// // Dream without fear, love without limits😍❣

// // also creates new file
// fs.appendFile("./fun1.html", "\n"+quote3, (err) => {
//     console.log("Completed appending!!!")
// });

// unlink - for deleting
const fs = require("fs");

fs.unlink("./fun1.html",(err) => {
    console.log("Deleted successfully");
});
