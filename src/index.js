const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const myWeb = express();
const port = 3000;
const route = require("./routes/index");

myWeb.use(express.static(path.join(__dirname, "public"))); //static file
myWeb.use(
  express.urlencoded({
    extended: true,
  })
); //middleware
//template engine
//Sets handlebars configurations
myWeb.engine(
  "hbs",
  handlebars.engine({ defaultLayout: "main", extname: ".hbs" })
);
myWeb.set("view engine", "hbs");
myWeb.set("views", path.join(__dirname, "resources/views"));

//Routes init
route(myWeb);

myWeb.listen(port, () =>
  console.log(`Example myWeb listening at http://localhost:${port}!`)
);
