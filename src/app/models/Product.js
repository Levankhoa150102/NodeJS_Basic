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

//MALE/FEMALE/CHILDREN PRODUCT AND SEARCH
async function getMenProducts() {
  try {
    await mssql.connect(config);
    const request = new mssql.Request();
    const result = await request.query(
      "SELECT TOP 8 * FROM [dbo].[product] WHERE category = 'Nam'"
    );

    const products = result.recordset;
    return products;
  } catch (error) {
    console.log(error);
  }
}
async function getWomenProducts() {
  try {
    await mssql.connect(config);
    const request = new mssql.Request();
    const result = await request.query(
      "SELECT TOP 8 * FROM [dbo].[product] WHERE category = N'Nữ'"
    );

    const products = result.recordset;
    return products;
  } catch (error) {
    console.log(error);
  }
}
async function getChildrenProducts() {
  try {
    await mssql.connect(config);
    const request = new mssql.Request();
    const result = await request.query(
      "SELECT TOP 8 * FROM [dbo].[product] WHERE category = N'Trẻ em'"
    );

    const products = result.recordset;
    return products;
  } catch (error) {
    console.log(error);
  }
}
async function getProductById(id) {
  try {
    var product_category = id.slice(0, 1);

    await mssql.connect(config);
    const request = new mssql.Request();
    const result_1 = await request.query(
      `SELECT * FROM [dbo].[product] WHERE id = '${id}'`
    );
    const result_2 = await request.query(
      `SELECT TOP 6 * FROM [dbo].[product] WHERE [id] LIKE '${product_category}%' ORDER BY NEWID()`
    );

    const product = result_1.recordset;
    const category_products = result_2.recordset;
    return [product, category_products];
  } catch (error) {
    console.log(error);
  }
}

async function getProductSize(id) {
  try {
    await mssql.connect(config);
    const request = new mssql.Request();
    const result = await request.query(
      `SELECT * FROM [dbo].[product] WHERE id = '${id}'`
    );
    const product = result.recordset;
    console.log(product[0].size);
    return product;
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(product) {
  try {
    await mssql.connect(config);
    const request = new mssql.Request();
    const result = await request.query(
      `INSERT INTO [dbo].[product] (id, name, category, price, amount, description) VALUES ('${product.id}', '${product.name}', '${product.category}', '${product.price}', '${product.amount}', '${product.description}')`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

//CART
async function addProductToCart(id, list_cart) {
  try {
    await mssql.connect(config);
    const request = new mssql.Request();
    const product = await request.query(
      `SELECT * FROM [dbo].[product] WHERE id = '${id}'`
    );
    productItem = product.recordset;
    if (list_cart == undefined) {
      list_cart = [];
      list_cart.push({
        id: productItem[0].id,
        name: productItem[0].name,
        image: productItem[0].img,
        size: productItem[0].size,
        price: productItem[0].price,
        totalprice: productItem[0].price,
        quantity: 1,
      });
    } else {
      var newItem = true;
      for (var i = 0; i < list_cart.length; i++) {
        if (list_cart[i].name == productItem[0].name) {
          list_cart[i].quantity++;
          totalprice = list_cart[i].price * list_cart[i].quantity;
          list_cart[i].totalprice = totalprice;
          newItem = false;
          break;
        }
      }
      if (newItem) {
        list_cart.push({
          id: productItem[0].id,
          name: productItem[0].name,
          image: productItem[0].img,
          size: productItem[0].size,
          price: productItem[0].price,
          totalprice: productItem[0].price,
          quantity: 1,
        });
      }
    }
    var total_order = 0;
    for (var i = 0; i < list_cart.length; i++) {
      total_order += Number(list_cart[i].totalprice);
    }
    return [list_cart, total_order];
  } catch (error) {
    console.log(error);
  }
}
async function SizeAndQuantity(id, size) {
  var oj_size = JSON.parse(list_cart[0].size);
  console.log(oj_size[String(size)]);
}
async function showToCart(cart_products, cart_total) {
  try {
    list_cart = cart_products;
    total_order = cart_total;
    let list_items = [list_cart, total_order];
    return list_items;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getMenProducts,
  getWomenProducts,
  getChildrenProducts,
  getProductById,
  createProduct,
  addProductToCart,
  showToCart,
};
