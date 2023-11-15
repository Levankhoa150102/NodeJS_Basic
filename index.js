const express = require("express");
const myWeb = express();
const port = 3000;

myWeb.get("/", (req, res) => res.send("Hello World!"));
myWeb.listen(port, () =>
  console.log(`Example myWeb listening at http://localhost:${port}!`)
);
