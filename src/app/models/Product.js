const mssql = require("mssql");
const config = {
  user: "trenz",
  password: "nhom1_2023",
  server: "trenz.database.windows.net",
  database: "database",
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};
async function getAllProducts() {
  try {
    await mssql.connect(config);
    const request = new mssql.Request();
    const result = await request.query("SELECT TOP 8 * FROM [dbo].[product]");

    const products = result.recordset;
    return products;
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(id) {
  try {
    await mssql.connect(config);
    const request = new mssql.Request();
    const result = await request.query(
      `SELECT * FROM [dbo].[product] WHERE id = '${id}'`
    );
    const product = result.recordset;
    return product;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { getAllProducts, getProductById };
