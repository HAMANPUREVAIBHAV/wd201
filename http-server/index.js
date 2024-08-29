const http = require("http");
const fs = require("fs");
const args = require("minimist")(process.argv);
const homeContent = fs.readFileSync("home.html", "utf8");
const projectContent = fs.readFileSync("project.html", "utf8");
const registrationContent = fs.readFileSync("registration.html", "utf8");

http.createServer((request, response) => {
  const url = request.url;
  let content = homeContent;

  if (url === "/project") {
    content = projectContent;
  } else if (url === "/registration") {
    content = registrationContent;
  }

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
}).listen(args.port);
