const express = require("express");
const sql = require("mssql");
const path = require("path");
const handlebars = require("express-handlebars");

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
myWeb.set("view engine", "ejs");
myWeb.engine(
  "hbs",
  handlebars.engine({ defaultLayout: "main", extname: ".hbs" })
);
myWeb.set("view engine", "hbs");
myWeb.set("views", path.join(__dirname, "resources/views"));

// Set up the database connection
const config = {
  user: "trenz",
  password: "nhom1_2023",
  server: "trenz.database.windows.net",
  database: "database",
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

// Use async/await for better readability
async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log("Connected to the database.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

connectToDatabase();

// Define a route to retrieve data and render the view
myWeb.get("/", async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.query("SELECT * FROM [dbo].[user]");

    const dataFromDatabase = result.recordset;
    console.log(dataFromDatabase);
    //how to render data to view on website
    res.render("home", { products: dataFromDatabase });
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
myWeb.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
