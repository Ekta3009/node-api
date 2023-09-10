const { log } = require("console");
const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

const server = http.createServer((req, res) => {
  let filepath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // console.log(filepath);

  let extname = path.extname(filepath);

  let contentType = "text/html";

  switch (extname) {
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
  }

  fs.readFile(filepath, (err, content) => {
    if (err) {
      if ((err.code = "ENOENT")) {
        //page not found error
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf-8");
          }
        );
      } else {
        //some other sort of error
        res.writeHead(500);
        res.end(`Server error ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
