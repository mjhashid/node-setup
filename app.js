function greetings(name) {
  console.log("Hello  " + name);
}
greetings("Mr.Hashid");

// All the Global object in Nodejs

// Console.log()
// setTimeout()
// clearTimeout()
// setInterval()
// clearInterval()

// Lesson 2.
const log = require("./logger");

log("Hello who are you looking for ???");

// Lesson 3. on Path
const path = require("path");
let pathObj = path.parse(__filename);
console.log(pathObj);

// Lesson 4. on OS
const os = require("os");
const totalMemory = os.totalmem();
const freeMemory = os.freemem();

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

//  Lesson 5. on FileSystem

const fs = require("fs");
const file = fs.readdirSync("./");
console.log(file);

fs.readdir("./", (err, files) => {
  if (err) console.log("error", err);
  else console.log("Rsult", files);
});

// Lesson 6. on Events Module

const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("messageLogged", function () {
  console.log("You are working on event method");
});

emitter.emit("messageLogged");

// Lesson 7. Event Arguments
const EventEmitter = require("events");
const emitters = new EventEmitter();

emitters.on("logging", (arg) => {
  console.log(arg);
});

emitter.emit("logging", { message: "This is the assignment given by Mosh" });

// Lesson 8. on Http Module
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello world");
    res.end();
  }
  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3], 3));
    res.end();
  }
});

server.listen(3001);
console.log("Listening on port 3001...");
