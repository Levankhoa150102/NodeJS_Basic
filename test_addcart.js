const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const products = [
  { id: 1, name: "Product 1", price: 10.99 },
  { id: 2, name: "Product 2", price: 19.99 },
  // Add more products as needed
];

let shoppingCart = [];

// Route to view products
app.get("/products", (req, res) => {
  res.status(200).json({ products });
});

// Route to view the shopping cart
app.get("/cart", (req, res) => {
  res.status(200).json({ cart: shoppingCart });
});

// Route to add a product to the cart
app.post("/add-to-cart", (req, res) => {
  const productId = req.body.productId;
  const product = products.find((p) => p.id === productId);

  if (product) {
    shoppingCart.push(product);
    res
      .status(200)
      .json({ message: "Product added to cart", cart: shoppingCart });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
