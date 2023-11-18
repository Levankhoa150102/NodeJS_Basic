const Products = require("../models/Product");
class ProductController {
  //[GET] /home

  index(req, res, next) {
    Products.getAllProducts()
      .then((products) => {
        res.render("product", { products: products });
      })
      .catch(next);
  }
  show(req, res, next) {
    Products.getProductById(req.params.id)
      .then((id_product) => {
        res.render("detailProduct", { id_product: id_product });
      })
      .catch(next);
  }
}
module.exports = new ProductController();
