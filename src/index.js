const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
var session = require("express-session");
const route = require("./routes/index");
const db = require("./config/db");

//Connect to DB
db.Connect();

const myWeb = express();
const port = 3000;
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

//Messages
myWeb.use(require("connect-flash")());
myWeb.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

//session
myWeb.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
//Routes init
route(myWeb);

myWeb.listen(port, () =>
  console.log(`Example myWeb listening at http://localhost:${port}!`)
);
